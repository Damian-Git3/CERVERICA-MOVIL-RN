import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import VentaContext from "@/context/Venta/VentaContext";
import { ReporteVentas } from "@/models/venta";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import useVentas from "@/hooks/useVentas";

interface ReporteVentasProps {
  param: string;
}

interface CardProps {
  reporteVenta: {
    date: string;
    monto: number;
  };
}

export const ListaReporteVentas: React.FC<ReporteVentasProps> = ({ param }) => {
  const { reporteVentas, getReporteVentas } = useVentas();

  useFocusEffect(
    React.useCallback(() => {
      console.log("useFocusEffect");
      if (getReporteVentas) {
        console.log("getReporteVentas for period:", param);
        getReporteVentas(param);
      }
      console.log("reporteVentas", reporteVentas);
    }, [param])
  );

  const renderItem = ({ item }: { item: { date: string; monto: number } }) =>
    <Card reporteVenta={item} />

  const showReporteVentas = (reporteVentas: ReporteVentas) => {
    if (reporteVentas) {
      return (
        <View style={styles.container}>
            <FlatList
              data={reporteVentas.data}
              renderItem={renderItem}
              keyExtractor={(item) => item.date.toString()}
              contentContainerStyle={styles.list}
            />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.total}>Total: ${reporteVentas?.total}</Text>
      {reporteVentas && showReporteVentas(reporteVentas)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  description: {
    fontSize: 16,
    color: "#333",
  },
  item: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  total: {
    fontSize: 18,
    marginBottom: 16,
  },
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  list: {
    paddingBottom: 16,
  },
  cardHorizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  date: {
    fontSize: 14,
    color: "#333",
  },
  amount: {
    fontSize: 14,
    color: "#333",
  },
});

const Card: React.FC<CardProps> = ({ reporteVenta }) => {
  return (
    <View style={styles.cardHorizontal}>
      <Text style={styles.date}>{reporteVenta.date}</Text>
      <Text style={styles.amount}>${reporteVenta.monto}</Text>
    </View>
  );
};