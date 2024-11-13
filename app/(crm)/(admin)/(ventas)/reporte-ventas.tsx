import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListaReporteVentas } from "@/components/admin/ventas/ListaReporteVentas";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons"; // Importa los iconos

const Tab = createBottomTabNavigator();

const ReporteVentasScreen = () => {
  const isFocused = useIsFocused();

  useEffect(() => {}, [isFocused]);

  return (
    <SafeAreaView className="flex-1 p-4 bg-gray-100">
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
  );
};

export default ReporteVentasScreen;
