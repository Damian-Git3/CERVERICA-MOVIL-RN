import { icons } from "@/constants";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListVentas } from "@/components/admin/ventas/ListVentas";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/Auth/AuthContext";
import VentaState from "@/context/Venta/VentaState";
import TableResumenVentas from "@/components/admin/ventas/TableResumenVentas";
import useVentas from "@/hooks/useVentas";
import { Venta } from "@/models/venta";
import useVentaStore from "@/stores/VentasStore";

const Ventas = () => {
  const { ventas, resumenVentas, getVentas, getResumenVentas } = useVentas();
  const { session } = useContext(AuthContext);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getVentas!();
    getResumenVentas!();
  }, []);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await getVentas!();
    await getResumenVentas!();
    setIsRefreshing(false);
  };

  const handlePressVenta = (venta: Venta) => {
    const setVentaSeleccionada = useVentaStore.getState().setVenta;
    setVentaSeleccionada(venta);
    router.push("/(crm)/(admin)/(ventas)/detalle-venta");
  };

  const navigateToReporte = (param: string) => {
    router.push(`/(crm)/(admin)/(ventas)/reporte-ventas?param=${param}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      <View className="flex-1">
        <Text className="text-lg font-bold mb-2">Lista de ventas</Text>
        <View className="border-b border-gray-300" />
        <ListVentas />
      </View>

      <View className="flex-2 mb-2">
        <Text className="text-lg font-bold mb-2">Resumen de tus ventas</Text>
        <View className="border-b border-gray-300 mb-5" />
        <TableResumenVentas navigateToReporte={navigateToReporte} />
      </View>
    </SafeAreaView>
  );
};

export default Ventas;
