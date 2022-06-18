import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    Share,
    Modal
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import { Feather, Entypo } from '@expo/vector-icons';

// components
import LinkWeb from '../../Components/LinkWeb';

export default function Detail() {
    // Pegar os parametros da navegacao 
    const route = useRoute();
    const navigation = useNavigation();

    const [post, setPost] = useState({});
    const [links, setLinks] = useState([]);
    const [modalVisible, setModalvisible] = useState(false);
    const [openLink, setOpenLink] = useState({});

    useEffect(() => {
        async function getPost() {
            const response = await api.get(`api/posts/${route.params?.id}?populate=cover,category,Opcoes`);
            setPost(response.data.data);
            setLinks(response.data?.data?.attributes?.Opcoes);
        }

        getPost();
    }, [])

    function handleOpenLink(link) {
        setModalvisible(true);
        setOpenLink(link);
    }

    // o useLayoutEffect é como o useEffect, no entanto ele bloqueia as mudanças da tela enquanto nao for executado
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => handleShare()}>
                    <Entypo name='share' size={25} color="#fff" />
                </TouchableOpacity>
            )
        })

    }, [navigation])

    async function handleShare() {
        try {
            const result = await Share.share({
                message: `
                Confere esse Post: ${post?.attributes?.title}

                ${post?.attributes?.description}

                Vi lá no App DevBlog! 🤩😎
                `
            })

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("ACTVITY TYPE");
                }
                else {
                    console.log("COMPARTILHADO COM SUCESSO");
                }
            }
            else if (result.action === Share.dismissedAction) {
                console.log("CONSOLE FECHADO");
            }
        }
        catch {
            console.log('erro no compoartilhamento');
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    //  
                    source={{ uri: `http://192.168.1.11:1337${post?.attributes?.cover?.data?.attributes?.url}` }}
                    style={styles.image}
                    resizeMode='cover'
                />
                <View style={styles.content}>
                    <Text style={styles.title}>{post?.attributes?.title}</Text>
                    <Text style={styles.desc}>{post?.attributes?.description}</Text>


                    {links.length > 0 && (
                        <Text style={styles.subtitle}>Links</Text>
                    )}

                    {links.map(link => (
                        <TouchableOpacity
                            key={link.id}
                            style={styles.linkButton}
                            onPress={() => handleOpenLink(link)}
                        >
                            <Feather name='link' color='#1e4687' size={14} />
                            <Text style={styles.linkText}>
                                {link.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <Modal animationType='slide' visible={modalVisible} transparent={true}>
                <LinkWeb
                    link={openLink?.url}
                    title={openLink?.name}
                    closeModal={() => setModalvisible(false)} />
            </Modal>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 230,
    },
    content: {
        paddingHorizontal: 12,
        paddingBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 14,
        marginTop: 15,
        paddingBottom: 12
    },
    desc: {
        fontSize: 14,
        lineHeight: 19,
    },
    subtitle: {
        fontWeight: 'bold',
        marginTop: 14,
        marginBottom: 6,
        fontSize: 18,
    },
    linkButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    linkText: {
        color: '#1e4687',
        fontSize: 16,
        marginLeft: 6
    },
})