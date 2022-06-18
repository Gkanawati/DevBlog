import React, { useLayoutEffect, useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
// navigation e routes
import { useNavigation, useRoute } from '@react-navigation/native';
// services api
import api from '../../services/api';
// components
import PostItem from '../../Components/PostItem';


export default function CategoryPosts() {

    const navigation = useNavigation();
    const route = useRoute();

    const [posts, setPosts] = useState([]);

    // o useLayoutEffect controla o Header da pagina
    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params.title === '' ? 'Categorias' : route.params.title
        })

    }, [navigation])

    useEffect(() => {
        async function loadPosts() {
            const response = await api.get(`api/categories/${route.params?.id}?fields=name&populate=posts,posts.cover`)
            setPosts(response.data?.data?.attributes?.posts?.data)
        }

        loadPosts();

    }, [])

    function handleBackHome() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            {posts.length === 0 ? (
                <View style={styles.warningContainer}>
                    <Text style={styles.warningText}>Essa categoria ainda nao possui nenhum post!</Text>

                    <TouchableOpacity style={styles.backBtn} onPress={() => handleBackHome()}>
                        <Text style={styles.textBtn}>Encontrar Posts</Text>
                    </TouchableOpacity>

                </View>
            ) :
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                    data={posts}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={(({ item }) => <PostItem data={item} />)}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 18,
        backgroundColor: '#FFF'
    },
    warningContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    warningText: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    backBtn: {
        backgroundColor: '#162133',
        paddingVertical: 8,
        paddingHorizontal: 14,
        marginTop: 12,
        borderRadius: 4,
    },
    textBtn: {
        color: '#fff',
        fontSize: 16,
    },
})