import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env'; // Importar la URL de la API desde el archivo .env
import { VictoryPie } from 'victory-native'; // Para gráficos

const ReporteVentas = () => {
  const [reporte, setReporte] = useState([]);
  const [productosExpirar, setProductosExpirar] = useState([]);

  useEffect(() => {
    // Obtener estadísticas de ventas y productos cercanos a expirar
    axios.get(`${API_URL}/Ventas`)
      .then(response => setReporte(response.data))
      .catch(error => console.error(error));

    axios.get(`${API_URL}/productos/cercanos-a-expirar`)
      .then(response => setProductosExpirar(response.data))
      .catch(error => console.error(error));
  }, []);

  const generarDescuentosAutomaticos = () => {
    axios.post(`${API_URL}/productos/descuentos-automaticos`)
      .then(response => alert('Descuentos aplicados exitosamente'))
      .catch(error => console.error(error));
  };

  const renderProductoExpirar = ({ item }) => (
    <View style={styles.productoContainer}>
      <Text>{item.nombre} - Expira en: {item.fechaExpiracion}</Text>
      <Text>Descuento Sugerido: {item.descuento}%</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Reporte Detallado de Ventas</Text>
      
      <VictoryPie
        data={reporte.ventasPorProducto}
        x="producto"
        y="cantidad"
        colorScale="cool"
      />

      <Text style={styles.subtitulo}>Productos Cercanos a Expirar</Text>
      <FlatList
        data={productosExpirar}
        renderItem={renderProductoExpirar}
        keyExtractor={(item) => item.id.toString()}
      />

      <Button title="Aplicar Descuentos Automáticos" onPress={generarDescuentosAutomaticos} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  productoContainer: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default ReporteVentas;
