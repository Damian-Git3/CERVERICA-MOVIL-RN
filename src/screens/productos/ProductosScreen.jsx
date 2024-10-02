import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from './../../../assets/logo-completo.png';
import { Picker } from '@react-native-picker/picker';
import cerveza1 from './../../../assets/botellas/botella_ayipa_mx.png';
import fondo1 from './../../../assets/fondos/fondo_ay.jpg';
import { obtenerRecetasLanding } from '../../services/recetaService';

const ProductosScreen = ({ navigation }) => {
    const [isFavoriteFilter, setIsFavoriteFilter] = useState(false);
    const [selectedOption, setSelectedOption] = useState('todo');
    const [recetas, setRecetas] = useState([]);

    useEffect(() => {
        const cargarRecetas = async () => {
            try {
                const data = await obtenerRecetasLanding();
                setRecetas(data);
                console.log(data);
            } catch (err) {
                setError(err.message);
            }
        };

        cargarRecetas();
    }, []);

    // Suponiendo que tienes un arreglo de cervezas
    const cervezas = [
        { id: 1, nombre: 'Cerveza Rubia', precio: 10.99, img: cerveza1, fondo: fondo1, isFavorite: false },
        { id: 2, nombre: 'Cerveza Oscura', precio: 12.50, img: cerveza1, fondo: fondo1, isFavorite: false },
        { id: 3, nombre: 'Cerveza Oscura', precio: 12.50, img: cerveza1, fondo: fondo1, isFavorite: false },
        { id: 4, nombre: 'Cerveza Oscura', precio: 12.50, img: cerveza1, fondo: fondo1, isFavorite: false },
        { id: 5, nombre: 'Cerveza Oscura', precio: 12.50, img: cerveza1, fondo: fondo1, isFavorite: false },
        { id: 6, nombre: 'Cerveza Oscura', precio: 12.50, img: cerveza1, fondo: fondo1, isFavorite: false },
    ];

    // Cambia el estado de favorito al presionar
    const toggleFavorite = (id) => {
        const updatedCervezas = cervezas.map(cerveza =>
            cerveza.id === id ? { ...cerveza, isFavorite: !cerveza.isFavorite } : cerveza
        );
        setCervezas(updatedCervezas);
    };

    // Filtrar cervezas según el estado de favoritos
    const filteredCervezas = isFavoriteFilter
        ? cervezas.filter(cerveza => cerveza.isFavorite)
        : cervezas;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.containerItems}>

                    <View style={styles.inputContainer}>
                        <Icon name="search" size={20} color="#000" style={styles.icon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Busqueda..."
                        />
                    </View>

                    <Text style={styles.titleText}>NUESTROS PRODUCTOS 🍺</Text>

                    <View style={styles.containerButtons}>

                        <TouchableOpacity style={styles.favoriteButton} onPress={() => setIsFavoriteFilter(!isFavoriteFilter)}>
                            <Icon
                                name={isFavoriteFilter ? "heart" : "heart-outline"} // Muestra corazón lleno o vacío
                                size={24}
                                color={isFavoriteFilter ? "#E1A500" : "#000"} // Rojo si está seleccionado, negro si no
                            />
                        </TouchableOpacity>

                        <Picker
                            selectedValue={selectedOption}
                            style={styles.picker}
                            onValueChange={(itemValue) => setSelectedOption(itemValue)}>
                            <Picker.Item label="Todo" value="todo" />
                            <Picker.Item label="Lo más nuevo" value="nuevo" />
                            <Picker.Item label="Por precio (mayor a menor)" value="mayorMenor" />
                            <Picker.Item label="Por precio (menor a mayor)" value="menorMayor" />
                        </Picker>
                    </View>

                    <View style={styles.containerCard}>
                        {filteredCervezas.map((cerveza) => (
                            <ImageBackground
                                key={cerveza.id}
                                source={cerveza.rutaFondo}
                                style={styles.card}
                                imageStyle={styles.backgroundImage}
                            >
                                <View style={styles.header}>
                                    <Text style={styles.precio}>${cerveza.precio.toFixed(2)}</Text>
                                    <TouchableOpacity onPress={() => toggleFavorite(cerveza.id)}>
                                        <Icon
                                            name={cerveza.isFavorite ? 'heart' : 'heart-outline'}
                                            size={24}
                                            color={cerveza.isFavorite ? 'red' : '#000'}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <Image
                                    source={cerveza.imagen}
                                    style={styles.imagen}
                                    resizeMode="contain"
                                />


                                <Text style={styles.stock}>¡AGOTADO!</Text>

                                {/* Aquí añadimos el footer */}
                                <View style={styles.footer}>
                                    <Text style={styles.nombre}>{cerveza.nombre}</Text>
                                    <TouchableOpacity
                                        style={styles.addButton}
                                        onPress={() => addToCart(cerveza.id)}
                                    >
                                        <Text style={styles.addButtonText}>Agregar al carrito</Text>
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                        ))}
                    </View>


                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    containerCard: {
        width: '95%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 16,
        width: '48%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 2,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagen: {
        marginTop: 10,
        width: '100%',
        height: 200,
    },
    header: {
        backgroundColor: '#eae7e6',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
    },
    addButton: {
        backgroundColor: '#e0e0e0',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#b9b9b9',
        fontSize: 14,
        fontWeight: 'bold',
    },
    footer: {
        width: '100%',
        justifyContent: 'space-between', // Espacio entre el nombre y el botón
        alignItems: 'center',
        paddingBottom: 10,
        backgroundColor: '#eae9e8',
    },
    precio: {
        color: '#E1A500',
        fontWeight: 'bold',
    },
    stock: {
        position: 'absolute',
        width: 80,
        textAlign: 'center',
        backgroundColor: '#e72929',
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        padding: 4,
        transform: [{ rotate: '-35deg' }],
        top: 50,
        left: 10
    },
    nombre: {
        color: '#E1A500',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 8,
    },
    scrollContainer: {
        paddingBottom: 16
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerButtons: {
        marginTop: 10,
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    containerItems: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        position: 'absolute',
        bottom: 30,
        backgroundColor: 'red'
    },
    picker: {
        textAlign: 'center',
        height: 50,
        width: '78%',
        borderWidth: 2,
        borderColor: '#E1A500',
        borderRadius: 10,
        backgroundColor: 'transparent',
    },
    inputContainer: {
        width: '100%',
        marginTop: 30,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        position: 'absolute',
        left: 20,
    },
    searchInput: {
        textAlign: 'center',
        height: 50,
        width: '100%',
        borderWidth: 2,
        borderColor: '#E1A500',
        borderRadius: 10,
    },
    favoriteButton: {
        width: '20%',
        height: 50,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#E1A500',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    favoriteButtonText: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        color: '#E1A500',
        fontWeight: '800',
    },
    titleText: {
        marginTop: 20,
        textAlign: 'center',
        color: '#000',
        fontSize: 22,
        fontWeight: 'bold',
    },
});

export default ProductosScreen;
