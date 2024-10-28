import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "next/router";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useVenta } from "@/context/VentaContext";

const Tab = createMaterialTopTabNavigator();

const ReporteVentas = () => {
  const { reporteVentas, getReporteVentas } = useVenta();
  const router = useRouter();
  const { param } = router.query;

  useEffect(() => {
    getReporteVentas(param as string);
    console.log("getReporteVentas");
    console.log("reporteVentas", reporteVentas);
  }, [param]);

  function VentasSemana() {
    return (
      <View>
        <Text>Detalle de Ventas por Semana</Text>
      </View>
    );
  }

  function VentasMes() {
    return (
      <View>
        <Text>Detalle de Ventas por Mes</Text>
      </View>
    );
  }

  function VentasAnual() {
    return (
      <View>
        <Text>Total Ventas (facturadas): $62,620,205</Text>
        {/* Aquí va la tabla con los meses y totales */}
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Semana" component={VentasSemana} />
        <Tab.Screen name="Mes" component={VentasMes} />
        <Tab.Screen name="Año" component={VentasAnual} />
      </Tab.Navigator>
    </NavigationContainer>
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
});

export default ReporteVentas;
