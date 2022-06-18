import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// pages
import Home from '../Pages/Home/index';
import CategoryPosts from '../Pages/CategoryPosts';
import Detail from '../Pages/Detail';
import Search from '../Pages/Search';

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={Home}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='Detail'
                component={Detail}
                options={{
                    title: 'Detalhes',
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: "#121212"
                    }
                }}
            />
            <Stack.Screen
                name='CategoryPosts'
                component={CategoryPosts}
                options={{
                    title: 'Categorias',
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: "#121212"
                    }
                }}
            />
            <Stack.Screen
                name='Search'
                component={Search}
                options={{
                    title: 'Procurando Algo?',
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: "#121212"
                    }
                }}
            />
        </Stack.Navigator>
    )
}