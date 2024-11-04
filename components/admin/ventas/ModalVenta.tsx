import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";
import { CheckBox } from "react-native-elements";
import CustomButton from "@/components/CustomButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Producto } from "@/models/Producto";
import { DetalleVenta } from "@/models/venta";

interface ModalVentaProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  venta: any;
  empaquetandoPedidos: boolean;
  productosDisponibles: DetalleVenta[];
  productosEmpaquetados: DetalleVenta[];
  cargando: boolean;
  habilitarMarcarListo: boolean;
  empezarEmpaquetar: () => void;
  finalizarVenta: () => void;
  verificarProductosEmpaquetados: () => void;
}

const ModalVenta: React.FC<ModalVentaProps> = ({
  modalVisible,
  setModalVisible,
  empaquetandoPedidos,
  productosDisponibles,
  productosEmpaquetados,
  cargando,
  habilitarMarcarListo,
  empezarEmpaquetar,
  finalizarVenta,
  verificarProductosEmpaquetados,
}) => {
  const [source, setSource] = useState<DetalleVenta[]>([]);
  const [target, setTarget] = useState<DetalleVenta[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    console.log("Productos disponibles", productosDisponibles);
    setSource(productosDisponibles);
    console.log("Productos empaquetados", productosEmpaquetados);
    setTarget(productosEmpaquetados);
  }, [productosDisponibles, productosEmpaquetados]);

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
            <>
              <FlatList
                data={source}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                ListEmptyComponent={() => (
                  <Text style={styles.emptyText}>
                    No hay productos disponibles
                  </Text>
                )}
              />
              <FlatList
                data={target}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                ListEmptyComponent={() => (
                  <Text style={styles.emptyText}>
                    No hay productos empaquetados
                  </Text>
                )}
              />
            </>
          )}

          <View style={styles.buttonContainer}>
            {empaquetandoPedidos ? (
              <CustomButton
                title="Finalizar venta"
                onPress={finalizarVenta}
                disabled={selectedProducts.size !== source.length}
                IconRight={() => (
                  <Ionicons name="checkmark" size={24} color="white" />
                )}
              />
            ) : (
              <CustomButton
                title="Empezar empaquetar"
                onPress={empezarEmpaquetar}
                IconRight={() => (
                  <Ionicons name="cube" size={24} color="white" />
                )}
              />
            )}
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
      <Image
        source={{ uri: item.stock.receta.imagen }}
        style={styles.productImage}
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
    width: "90%", // Ajusta el ancho del modal
    height: "75%", // Ajusta la altura máxima del modal
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
    height: "100%" // Ajusta el tamaño máximo de la lista
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  productImage: {
    width: 100,
    height: 100,
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
