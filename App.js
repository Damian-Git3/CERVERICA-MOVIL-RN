import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/auth/WelcomeScreen';
import ProductosScreen from './src/screens/productos/ProductosScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Pantalla de login */}
        <Stack.Screen 
          name="Login" 
          component={ProductosScreen} 
          options={{ headerShown: false }}  // Si no quieres mostrar el encabezado
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
