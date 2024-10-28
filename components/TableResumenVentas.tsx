import { ResumenVentas } from '@/app/model/venta';
import { useVenta } from '@/context/VentaContext';
import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';


interface VentasProps {
    data: ResumenVentas;
}

interface CardProps {
  resumenVentas: ResumenVentas;
}

const TableResumenVentas = ({ navigateToReporte }) => {
    const { resumenVentas, getResumenVentas } = useVenta();

    useEffect(() => {
        getResumenVentas();
        console.log("getResumenVentas");
        console.log("resumenVentas", resumenVentas);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Día</Text>
                <Text style={styles.headerText}>Mes</Text>
                <Text style={styles.headerText}>Año</Text>
                <Text style={styles.headerText}>Total</Text>
            </View>
            <FlatList
                data={resumenVentas || []}
                keyExtractor={(item) => `${item.dia}-${item.mes}-${item.anio}`}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.dia}>{item.dia}</Text>
                        <Text style={styles.mes}>{item.mes}</Text>
                        <Text style={styles.anio}>{item.anio}</Text>
                        <Text style={styles.total}>{item.total}</Text>
                        <Button
                            title="Ver detalle"
                            onPress={() => navigateToReporte(item.mes)}
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dia: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
  mes: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
  anio: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
  total: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
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
  description: {
    fontSize: 14,
    color: "#666",
  },
});

export default TableResumenVentas;

export const Card: React.FC<CardProps> = ({ resumenVentas }) => {


  return (
    <View style={styles.card}>
        <Text style={styles.title}>Día: {resumenVentas.dia}</Text>
        <Text style={styles.description}>Mes: {resumenVentas.mes}</Text>
        <Text style={styles.description}>Año: {resumenVentas.anio}</Text>
        <Text style={styles.description}>Total: {resumenVentas.total}</Text>
      
    </View>
  );
};