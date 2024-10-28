import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Button, ActivityIndicator } from 'react-native';
import { useVenta } from '@/context/VentaContext';
import { Venta } from '@/app/model/venta';

interface ListVentasProps {
    data: Venta[];
}

interface CardProps {
    venta: Venta;
}

export const ListVentas: React.FC<ListVentasProps> = () => {
    const { ventas, getVentas, cargandoVentas } = useVenta();

    useEffect(() => {
        getVentas();
        console.log("getVentas");
        console.log("ventas", ventas);
    }, []);

    const renderItem = ({ item }: { item: Venta }) => <Card venta={item} />;

    return (
        <View style={styles.container}>
            <Button title="Recargar" onPress={getVentas} />
            <FlatList
                data={ventas}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
            />
            {cargandoVentas && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    position: "relative", // Ensure the container is positioned relatively
  },
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject, // This will cover the entire screen
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    top: 10,
    backgroundColor: "transparent",
  },
});

const Card: React.FC<CardProps> = ({ venta }) => {
    const formattedDate = new Date(venta.fechaVenta).toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Venta ID: {venta.id}</Text>
            <Text style={styles.description}>Fecha: {formattedDate}</Text>
            <Text style={styles.description}>Total Cervezas: {venta.totalCervezas}</Text>
            <Text style={styles.description}>Método de Envío: {venta.metodoEnvio}</Text>
            <Text style={styles.description}>Método de Pago: {venta.metodoPago}</Text>
            <Text style={styles.description}>Número de Tarjeta: {venta.numeroTarjeta}</Text>
            <Text style={styles.description}>Estatus: {venta.estatusVenta}</Text>
            <Text style={styles.description}>Monto: ${venta.montoVenta}</Text>
            {/* Puedes agregar más detalles de ProductosPedido si es necesario */}
        </View>
    );
};
