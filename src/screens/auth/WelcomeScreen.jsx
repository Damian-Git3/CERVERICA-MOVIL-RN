import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from './../../../assets/logo-completo.png';

const WelcomeScreen = ({ navigation }) => {

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 3000);
    };

    return (
        <View style={styles.container}>
            <View style={styles.circulo1}></View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.containerItems}>

                    <View style={styles.containerImagen}>
                        <Image
                            source={logo}
                            style={styles.imagen}
                        />
                        </View>

                    <View style={styles.containerButtons}>
                        <Text style={styles.welcomeText}>¡Hey! Bienvenido de nuevo</Text>

                        <TouchableOpacity style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>Ingresar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.signButton}>
                            <Text style={styles.signButtonText}>Registrarse</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    circulo1: {
        backgroundColor: '#4b4c51',
        position: 'absolute',
        width: 600,
        height: 600,
        top: -270,
        borderRadius: 1000,
    },
    imagen: {
        textAlign: 'center',
        width: 150,
        height: 150,
        top: 50
    },
    scrollContainer: {
        height: '100%'
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    containerImagen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerButtons: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerItems: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        position: 'absolute',
        bottom: 30
    },
    loginButton: {
        width: '80%',
        height: 50,
        backgroundColor: '#E1A500',
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
    },
    signButton: {
        width: '80%',
        height: 50,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#E1A500',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signButtonText: {
        color: '#E1A500',
        fontSize: 16,
        fontWeight: 'bold',
    },
    progressBar: {
        marginTop: 20,
    },
    welcomeText: {
        textAlign: 'center',
        color: '#E1A500',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;
