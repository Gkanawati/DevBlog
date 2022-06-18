import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function PostItem({ data }) {
    const navigation = useNavigation();

    function handleDetails() {
        navigation.navigate('Detail', { id: data?.id })
    }


    return (
        <TouchableOpacity style={styles.Contpost} onPress={() => handleDetails()} activeOpacity={0.8}>
            <View style={styles.header}>
                <Image style={styles.cover} source={{ uri: `http://192.168.1.11:1337${data?.attributes?.cover?.data?.attributes?.url}` }} />
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>{data?.attributes?.title}</Text>
                <Text style={styles.desc} numberOfLines={2}>{data?.attributes?.description}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    Contpost: {
        borderWidth: 1,
        borderColor: '#efefef',
        borderRadius: 4,
        marginBottom: 14,
        paddingHorizontal: 12,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    header: {
        marginHorizontal: 8,
    },
    cover: {
        width: 100,
        height: 100,
        borderRadius: 4,
    },
    body: {
        width: '70%',
        paddingLeft: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 4,
    },
    desc: {
        fontSize: 13,
        lineHeight: 16,
    },
})