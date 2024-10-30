import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import VentaState from "@/context/Venta/VentaState";
import { ListaReporteVentas } from "@/components/ListaReporteVentas";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons"; // Importa los iconos

const Tab = createBottomTabNavigator();

const ReporteVentasScreen = () => {
  const isFocused = useIsFocused();

  useEffect(() => {
    // Logic to reload data when the tab is focused
  }, [isFocused]);

  return (
    <VentaState>
      <SafeAreaView style={styles.container}>
        <Tab.Navigator>
          <Tab.Screen
            name="Semana"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="calendar-outline" color={color} size={size} />
              ),
            }}
          >
            {() => <ListaReporteVentas param="semana" />}
          </Tab.Screen>
          <Tab.Screen
            name="Mes"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="calendar-sharp" color={color} size={size} />
              ),
            }}
          >
            {() => <ListaReporteVentas param="mes" />}
          </Tab.Screen>
          <Tab.Screen
            name="Año"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="calendar" color={color} size={size} />
              ),
            }}
          >
            {() => <ListaReporteVentas param="anio" />}
          </Tab.Screen>
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
