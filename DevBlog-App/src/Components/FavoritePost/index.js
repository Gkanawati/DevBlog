import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Dimensions
} from 'react-native';
// pega a dimensao da largura da tela do dispositivo
const { width: WIDTH } = Dimensions.get('window');
//navigation
import { useNavigation } from '@react-navigation/native';

export default function FavoritePost({ data }) {
    const navigation = useNavigation();

    function handleNavigate() {
        // navegando para a tela e enviando parametros para ela ao navegar
        navigation.navigate('Detail', { id: data.id });
    }
    return (
        <TouchableOpacity
            onPress={() => handleNavigate()}
            style={styles.container}
            activeOpacity={0.7}
        >
            <ImageBackground
                source={{ uri: `http://192.168.1.11:1337${data?.attributes?.cover?.data?.attributes?.url}` }}
                style={styles.cover}
                resizeMode='cover'
                blurRadius={3}
                imageStyle={{ borderRadius: 6, opacity: 0.4 }}
            >
                <Text style={styles.title} numberOfLines={2}>
                    {data?.attributes?.title}
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginRight: 8,
    },
    cover: {
        width: WIDTH - 60,
        height: 130,
        borderRadius: 10,
        justifyContent: 'flex-end',
        backgroundColor: '#232630',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        textShadowColor: '#121212',
        textShadowOffset: { width: 2, height: 1 },
        textShadowRadius: 8,
    },
})