import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import { CheckBox } from "react-native-elements";
import CustomButton from "@/components/CustomButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DetalleVenta } from "@/models/venta";
import useVentas from "@/hooks/useVentas";
import Toast from "react-native-toast-message";

interface ModalVentaProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  venta: any;
  empaquetandoPedidos: boolean;
  productosDisponibles: DetalleVenta[];
  cargando: boolean;
  id: number;
}

const ModalVenta: React.FC<ModalVentaProps> = ({
  modalVisible,
  setModalVisible,
  empaquetandoPedidos,
  productosDisponibles,
  cargando,
  id,
}) => {
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(
    new Set()
  );
  const { empaquetar, getVentas, getVenta } = useVentas();

  useEffect(() => {
    console.log("Productos disponibles", productosDisponibles);
  }, [productosDisponibles]);

  const toggleProductSelection = useCallback((item: DetalleVenta) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(item.id)) {
        newSelected.delete(item.id);
      } else {
        newSelected.add(item.id);
      }
      return newSelected;
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: DetalleVenta }) => (
      <ProductItem
        item={item}
        isSelected={selectedProducts.has(item.id)}
        toggleProductSelection={toggleProductSelection}
      />
    ),
    [selectedProducts, toggleProductSelection]
  );

  const finalizarVenta = async (idVenta: number) => {
    console.log("Finalizar venta", idVenta);
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de finalizar esta venta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              await empaquetar(idVenta);
              Toast.show({
                type: "success",
                text1: "Éxito",
                text2: "Venta finalizada con éxito!",
              });
              await getVenta(idVenta);
              setModalVisible(false);
            } catch (error) {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "Error al finalizar la venta, intenta nuevamente",
              });
              console.error(error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="w-11/12 h-3/4 bg-white rounded-lg p-5 items-center shadow-lg">
          <Text className="text-xl font-bold mb-5">
            {empaquetandoPedidos
              ? "Empaquetando venta"
              : "Empezar empaquetar venta"}
          </Text>

          {empaquetandoPedidos && (
            <FlatList
              data={productosDisponibles}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ flexGrow: 1 }}
              ListEmptyComponent={() => (
                <Text className="text-center text-gray-600 mt-5">
                  No hay productos disponibles
                </Text>
              )}
            />
          )}

          <View className="mt-5 w-full">
            <CustomButton
              title="Finalizar venta"
              onPress={() => finalizarVenta(id)}
              disabled={selectedProducts.size !== productosDisponibles.length}
              IconRight={() => (
                <Ionicons name="checkmark" size={24} color="white" />
              )}
            />
          </View>

          {cargando && <ActivityIndicator size="large" color="#0000ff" />}

          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            className="mt-5 py-2 px-4 bg-blue-500 rounded-lg"
          >
            <Text className="text-white text-lg">Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const ProductItem = React.memo(
  ({
    item,
    isSelected,
    toggleProductSelection,
  }: {
    item: DetalleVenta;
    isSelected: boolean;
    toggleProductSelection: (item: DetalleVenta) => void;
  }) => (
    <View className="flex-row items-center p-2 border-b border-gray-300">
      <CheckBox
        checked={isSelected}
        onPress={() => toggleProductSelection(item)}
      />
      <View className="flex-1">
        <Text className="text-lg font-bold">{item.stock.receta.nombre}</Text>
        <Text className="text-base text-gray-600">
          {item.cantidad} paquetes
        </Text>
        <Text className="text-base text-gray-600">Paquete de {item.pack}</Text>
      </View>
    </View>
  )
);

export default ModalVenta;
