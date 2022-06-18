import React from 'react';
import { StatusBar, View } from 'react-native';
import Routes from './src/routes/routes';
import { NavigationContainer } from '@react-navigation/native';

export default function DevBlog() {
  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' backgroundColor='#121212' />
      <Routes />
    </NavigationContainer>
  );
}