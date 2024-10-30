import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import VentasModal from '../../components/ventas/VentasModal'; // Importar el componente de modal de ventas
import VentasTable from '../../components/ventas/VentasTable'; // Importar el componente de tabla de ventas
import ventaService from '../../services/ventaService'; // Importar el servicio de ventas

const ReporteVentasScreen = () => {
  const [reporte, setReporte] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    ventaService.obtenerReporteVentas().then((response) => setReporte(response));
  }, []);

  const renderVenta = ({ item }) => (
    <View style={styles.ventaContainer}>
      <Text>{item.producto}: {item.cantidad} unidades vendidas</Text>
      <Button title="Ver Detalles" onPress={() => setModalVisible(true)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Reporte Detallado de Ventas</Text>
      
      <FlatList
        data={reporte.ventasPorProducto}
        renderItem={renderVenta}
        keyExtractor={(item) => item.producto}
      />

      <VentasModal reload={() => {
        // Lógica para recargar los datos después de cerrar el modal
        ventaService.obtenerReporteVentas().then((response) => setReporte(response));
      }} />

      <VentasTable data={reporte.ventasPorProducto || []} />
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
  ventaContainer: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default ReporteVentasScreen;