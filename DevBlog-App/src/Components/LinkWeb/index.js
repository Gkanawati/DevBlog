import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

export default function LinkWeb({ link, title, closeModal }) {
    return (
        <View style={{ flex: 1, marginTop: '-13%' }}>
            <TouchableOpacity onPress={closeModal} style={styles.button}>
                <Feather name='x' size={25} color="#FFF" />
                <Text style={styles.name}>{title}</Text>
            </TouchableOpacity>
            <WebView
                source={{ uri: link }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    containerModal: {
        backgroundColor: '#fff',
    },
    button: {
        padding: 10,
        backgroundColor: '#232630',
        marginTop: 60,
        flexDirection: 'row',
        alignItems: 'center',

    },
    name: {
        color: '#ffff',
        marginLeft: 8,
        fontSize: 18,
        fontWeight: 'bold',
    }
})