import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList
} from 'react-native';
// services
import api from '../../services/api';
// navigation
import { useNavigation } from '@react-navigation/native';
// icons
import { Feather } from '@expo/vector-icons';

// components
import CategoryItem from '../../Components/CategoryItem';

// functions favorites
import { getFavorite, setFavorite } from '../../services/favorite';
import FavoritePost from '../../Components/FavoritePost';
import PostItem from '../../Components/PostItem';

// animation
import * as Animatable from 'react-native-animatable';

const FlatListAnimated = Animatable.createAnimatableComponent(FlatList);;

export default function Home() {
    const navigation = useNavigation();

    const [categories, setCategories] = useState([]);
    const [favCategory, setFavCategory] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loadingRefresh, setLoadingRefresh] = useState(false);

    useEffect(() => {
        // buscas todas as categroias
        async function loadData() {
            await getLinkPosts();
            const category = await api.get("/api/categories?populate=icon");
            setCategories(category.data.data);
        }

        loadData();

        // buscar as categorias favoritadas
        async function favorite() {
            const response = await getFavorite();
            setFavCategory(response);
        }

        favorite();
    }, [])

    // favoritando uma categoria
    async function handleFavorite(id) {
        const response = await setFavorite(id);

        setFavCategory(response);
        console.log(response);
    }

    async function getLinkPosts() {
        setLoadingRefresh(true);
        const response = await api.get('api/posts?populate=cover&sort=createdAt:desc');

        setPosts(response.data.data);
        setLoadingRefresh(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>

                <Animatable.Text style={styles.name} animation='fadeInLeft' >DevBlog</Animatable.Text>

                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <Feather name='search' size={27} color='#fff' />
                </TouchableOpacity>
            </View>

            <FlatListAnimated
                animation='flipInX'
                delay={500}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 12 }}
                style={styles.categories}
                data={categories}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <CategoryItem data={item} favorite={() => handleFavorite(item.id)} />}
            />

            <View style={styles.main}>
                {favCategory.length !== 0 && (
                    <FlatListAnimated
                        animation='fadeInRight'
                        delay={600}
                        style={{ marginTop: 50, maxHeight: 130, paddingStart: 18, }}
                        contentContainerStyle={{ paddingEnd: 18, }}
                        horizontal={true}
                        data={favCategory}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => <FavoritePost data={item} />}
                        showsHorizontalScrollIndicator={false}
                    />
                )}

                <Text style={[styles.title, { marginTop: favCategory.length > 0 ? 15 : 30 }]}>
                    Conteúdos em Alta: </Text>
                <FlatList
                    style={{ flex: 1, paddingHorizontal: 18 }}
                    showsVerticalScrollIndicator={false}
                    data={posts}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => <PostItem data={item} />}
                    refreshing={loadingRefresh}
                    onRefresh={() => getLinkPosts()}
                />

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212"
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 18,
        marginHorizontal: 18,
        marginBottom: 24
    },
    name: {
        fontSize: 27,
        color: '#fff',
        fontWeight: 'bold',
    },
    categories: {
        maxHeight: 115,
        backgroundColor: '#efefef',
        marginHorizontal: 18,
        borderRadius: 8,
        zIndex: 9,
    },
    main: {
        backgroundColor: '#fff',
        flex: 1,
        marginTop: -20,
    },
    title: {
        fontSize: 21,
        fontWeight: 'bold',
        paddingHorizontal: 18,
        marginBottom: 14,
        color: '#162133',
    },

})