import VentaContext from "@/context/Venta/VentaContext";
import { ResumenVentas } from "@/models/venta";
import React, { useContext, useEffect } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";

interface TableResumenVentasProps {
  navigateToReporte: (param: string) => void;
}

interface CardProps {
  resumenVentas: ResumenVentas;
}

const TableResumenVentas: React.FC<TableResumenVentasProps> = ({
  navigateToReporte,
}) => {
  const { resumenVentas, getResumenVentas } = useContext(VentaContext);

  useEffect(() => {
    if (getResumenVentas) {
      getResumenVentas();
      console.log("getResumenVentas");
      console.log("resumenVentas", resumenVentas);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Semana</Text>
        <Text style={styles.headerText}>Mes</Text>
        <Text style={styles.headerText}>Año</Text>
      </View>
      <FlatList
        data={resumenVentas ? [resumenVentas] : []}
        keyExtractor={(item) =>
          `resumen-${item.semana}-${item.mes}-${item.anio}`
        }
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.semana}>{item.semana}</Text>
            <Text style={styles.mes}>{item.mes}</Text>
            <Text style={styles.anio}>{item.anio}</Text>
            <Button
              title="Ver detalle"
              onPress={() => navigateToReporte("semana")}
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
  semana: {
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
      <Text style={styles.title}>Semana: {resumenVentas.semana}</Text>
      <Text style={styles.description}>Mes: {resumenVentas.mes}</Text>
      <Text style={styles.description}>Año: {resumenVentas.anio}</Text>
    </View>
  );
};
