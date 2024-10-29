import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VentaContext from "@/context/Venta/VentaContext";
import { ReporteVentas } from "@/models/venta";
import { SafeAreaView } from "react-native-safe-area-context";
import VentaState from "@/context/Venta/VentaState";

const Tab = createBottomTabNavigator();

const ReporteVentasScreen = () => {
  const { reporteVentas, getReporteVentas } = useContext(VentaContext);

  const fetchReporteVentas = (period: string) => {
    if (getReporteVentas) {
      getReporteVentas(period);
    }
    console.log("getReporteVentas for period:", period);
  };

  useEffect(() => {
    fetchReporteVentas("semana"); // Default tab
  }, []);

  const showReporteVentas = (reporteVentas: ReporteVentas) => {
    if (reporteVentas) {
      return (
        <View style={styles.container}>
          {reporteVentas?.data.map((item) => (
            <View key={item.date} style={styles.item}>
              <Text>{item.date}</Text>
              <Text>Monto: {item.monto}</Text>
            </View>
          ))}
        </View>
      );
    }
  };

  function Ventas({ period }: { period: string }) {
    useEffect(() => {
      fetchReporteVentas(period);
    }, [period]);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Detalle de Ventas por {period}</Text>
        <Text style={styles.total}>Total: {reporteVentas?.total}</Text>
        {reporteVentas && showReporteVentas(reporteVentas)}
      </View>
    );
  }

  return (
    <VentaState>
      <SafeAreaView style={styles.container}>
        <Tab.Navigator>
          <Tab.Screen name="Semana">
            {() => <Ventas period="semana" />}
          </Tab.Screen>
          <Tab.Screen name="Mes">{() => <Ventas period="mes" />}</Tab.Screen>
          <Tab.Screen name="Año">{() => <Ventas period="anio" />}</Tab.Screen>
        </Tab.Navigator>
      </SafeAreaView>
    </VentaState>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 8,
    borderRadius: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default ReporteVentasScreen;
