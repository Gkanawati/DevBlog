import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';
import PostItem from '../../Components/PostItem';

export default function Search() {

    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);
    const [empty, setEmpty] = useState(false);

    async function handleSearchPost() {
        if (input === '') {
            alert('Digite algum item válido!')
            return;
        }

        const response = await api.get(`api/posts?filters[title][$containsi]=${input}&populate=cover`)

        setEmpty(false);
        if (response?.data.data.length === 0) {
            setEmpty(true);
            setPosts([]);
            return;
        }

        setPosts(response.data.data);

        setInput('');
        Keyboard.dismiss();


    }

    return (
        <View style={styles.container}>
            <View style={styles.containerInput}>
                <TextInput
                    placeholder='O que está procurando?'
                    style={styles.input}
                    value={input}
                    onChangeText={(text) => setInput(text)}
                />

                <TouchableOpacity
                    onPress={handleSearchPost}
                    style={styles.searchButton}
                    activeOpacity={0.6}>
                    <Feather name='search' color='#222' size={25} />
                </TouchableOpacity>
            </View>

            {empty ? (
                <View>
                    <Text style={styles.emptyText}> Ops nao encontramos nenhum post! 😥</Text>
                </View>
            )
                :
                <FlatList
                    data={posts}
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => <PostItem data={item} />}
                />}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 18,
    },
    containerInput: {
        flexDirection: 'row',
        width: '100%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    input: {
        width: '85%',
        backgroundColor: '#c4c4c4',
        height: 45,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        padding: 8,
        fontSize: 16,
    },
    searchButton: {
        height: 45,
        backgroundColor: '#c4c4c4',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        width: '15%',
        marginLeft: -2,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
})