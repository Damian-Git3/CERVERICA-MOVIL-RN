import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
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

  const renderItem = ({ item }: { item: { date: string; monto: number } }) => (
    <Card reporteVenta={item} />
  );

  const showReporteVentas = (reporteVentas: ReporteVentas) => {
    if (reporteVentas) {
      return (
        <View className="flex-1 p-4">
          <FlatList
            data={reporteVentas.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.date.toString()}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        </View>
      );
    }
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-lg mb-4">Total: ${reporteVentas?.total}</Text>
      {reporteVentas && showReporteVentas(reporteVentas)}
    </View>
  );
};

const Card: React.FC<CardProps> = ({ reporteVenta }) => {
  return (
    <View className="flex-row justify-between items-center p-2 bg-white rounded-lg mb-2 shadow-md">
      <Text className="text-sm text-gray-700">{reporteVenta.date}</Text>
      <Text className="text-sm text-gray-700">${reporteVenta.monto}</Text>
    </View>
  );
};
