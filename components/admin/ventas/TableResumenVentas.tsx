import VentaContext from "@/context/Venta/VentaContext";
import useVentas from "@/hooks/useVentas";
import { ResumenVentas } from "@/models/venta";
import React, { useContext, useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";

interface TableResumenVentasProps {
  navigateToReporte: (param: string) => void;
}

interface CardProps {
  resumenVentas: ResumenVentas;
}

const TableResumenVentas: React.FC<TableResumenVentasProps> = ({
  navigateToReporte,
}) => {
  const { resumenVentas, getResumenVentas } = useVentas();

  useEffect(() => {
    if (getResumenVentas) {
      getResumenVentas();
      console.log("getResumenVentas");
      console.log("resumenVentas", resumenVentas);
    }
  }, []);

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="flex-row justify-between py-2 border-b border-gray-300">
        <Text className="flex-1 text-center text-lg font-bold">Semana</Text>
        <Text className="flex-1 text-center text-lg font-bold">Mes</Text>
        <Text className="flex-1 text-center text-lg font-bold">Año</Text>
      </View>
      <FlatList
        data={resumenVentas ? [resumenVentas] : []}
        keyExtractor={(item) =>
          `resumen-${item.semana}-${item.mes}-${item.anio}`
        }
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center py-2 border-b border-gray-300">
            <Text className="flex-1 text-center text-lg">${item.semana}</Text>
            <Text className="flex-1 text-center text-lg">${item.mes}</Text>
            <Text className="flex-1 text-center text-lg">${item.anio}</Text>
          </View>
        )}
      />
      <View className="mt-4">
        <Button
          title="Ver detalle"
          onPress={() => navigateToReporte("semana")}
        />
      </View>
    </View>
  );
};

export const Card: React.FC<CardProps> = ({ resumenVentas }) => {
  return (
    <View className="bg-white p-5 my-2 rounded-lg shadow-md">
      <Text className="text-lg font-bold">Semana: {resumenVentas.semana}</Text>
      <Text className="text-base text-gray-600">Mes: {resumenVentas.mes}</Text>
      <Text className="text-base text-gray-600">Año: {resumenVentas.anio}</Text>
    </View>
  );
};

export default TableResumenVentas;
