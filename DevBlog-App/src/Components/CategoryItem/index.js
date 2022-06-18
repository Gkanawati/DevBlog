import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function CategoryItem({ data, favorite }) {
    const navigation = useNavigation();

    function handleNavigate() {
        navigation.navigate('CategoryPosts', { id: data.id, title: data?.attributes?.name })
    }
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.9}
            onPress={() => handleNavigate()}
            onLongPress={favorite}
        >

            <Image style={styles.logoCat} source={{ uri: `http://192.168.1.11:1337${data?.attributes?.icon?.data?.attributes?.url}` }}
                resizeMode="contain"
            />

            <Text style={styles.name}>{data?.attributes?.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginLeft: 8,
        marginVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logoCat: {
        width: 40,
        height: 40,
    },
    name: {
        fontSize: 16,
    },
})