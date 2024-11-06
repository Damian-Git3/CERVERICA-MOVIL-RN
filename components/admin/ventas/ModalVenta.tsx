import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
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
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
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
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {empaquetandoPedidos
              ? "Empaquetando venta"
              : "Empezar empaquetar venta"}
          </Text>

          {empaquetandoPedidos && (
            <FlatList
              data={productosDisponibles}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.list}
              ListEmptyComponent={() => (
                <Text style={styles.emptyText}>
                  No hay productos disponibles
                </Text>
              )}
            />
          )}

          <View style={styles.buttonContainer}>
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
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
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
    <View style={styles.productItem}>
      <CheckBox
        checked={isSelected}
        onPress={() => toggleProductSelection(item)}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.stock.receta.nombre}</Text>
        <Text style={styles.productDetail}>{item.cantidad} paquetes</Text>
        <Text style={styles.productDetail}>Paquete de {item.pack}</Text>
      </View>
    </View>
  )
);

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    height: "75%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  list: {
    width: "100%",
    flexGrow: 1,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productDetail: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#2196F3",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
});

export default ModalVenta;
