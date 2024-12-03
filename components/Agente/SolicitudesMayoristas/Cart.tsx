import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ProductoCarrito } from "@/models/ProductoCarrito";
import useSolicitudesMayoristas from "@/hooks/useSolicitudesMayoristas";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

type CartProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  productosCarrito: ProductoCarrito[] | null;
  onClearCart?: () => void;
};

export default function EnhancedCart({
  modalVisible,
  setModalVisible,
  productosCarrito,
  onClearCart,
}: CartProps) {
  const { crearSolicitudMayorista } = useSolicitudesMayoristas();

  const handleRealizarSolicitud = async () => {
    const response = await crearSolicitudMayorista();

    if (response?.status == 200) {
      Toast.show({
        type: "success",
        text1: "Solicitud realizada!",
        text2: "Tú agente la atendera en breve",
      });

      router.replace("/(mayorista)/(solicitudes-mayoristas)/lista-solicitudes");
    }
  };

  const calculateTotal = () => {
    return (
      productosCarrito?.reduce(
        (total, item) =>
          total + (item.receta.precioUnitarioBaseMayoreo ?? 0) * item.cantidad,
        0
      ) ?? 0
    );
  };

  const renderCartItem = ({ item }: { item: ProductoCarrito }) => (
    <View style={styles.cartItemContainer}>
      <View style={styles.cartItemContent}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.receta.nombre}
        </Text>
        <View style={styles.cartItemDetails}>
          <Text style={styles.productPrice}>
            ${(item.receta.precioUnitarioBaseMayoreo ?? 0).toFixed(2)}
          </Text>
          <View style={styles.quantityBadge}>
            <Text style={styles.quantityText}>{item.cantidad}</Text>
          </View>
        </View>
        <Text style={styles.productTotal}>
          Total: $
          {(
            (item.receta.precioUnitarioBaseMayoreo ?? 0) * item.cantidad
          ).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Carrito de Compras</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {productosCarrito && productosCarrito.length > 0 ? (
            <>
              <FlatList
                data={productosCarrito}
                renderItem={renderCartItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.flatListContent}
              />

              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total:</Text>
                <Text style={styles.totalAmount}>
                  ${calculateTotal().toFixed(2)}
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.emptyCartContainer}>
              <Ionicons name="cart-outline" size={80} color="#ccc" />
              <Text style={styles.emptyCartText}>Tu carrito está vacío</Text>
            </View>
          )}

          <View style={styles.actionButtons}>
            {productosCarrito && productosCarrito.length > 0 && (
              <>
                <TouchableOpacity
                  style={[styles.button, styles.clearButton]}
                  onPress={onClearCart}
                >
                  <Ionicons name="trash-outline" size={20} color="white" />
                  <Text style={styles.buttonText}>Limpiar Carrito</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.requestButton]}
                  onPress={handleRealizarSolicitud}
                >
                  <Ionicons name="send-outline" size={20} color="white" />
                  <Text style={styles.buttonText}>Realizar Solicitud</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 5,
  },
  cartItemContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cartItemContent: {
    flexDirection: "column",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cartItemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 14,
    color: "#666",
  },
  quantityBadge: {
    backgroundColor: "#ED9224",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  quantityText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  productTotal: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ED9224",
    marginTop: 5,
    alignSelf: "flex-end",
  },
  flatListContent: {
    paddingBottom: 15,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ED9224",
  },
  emptyCartContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  emptyCartText: {
    fontSize: 16,
    color: "#666",
    marginTop: 15,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  clearButton: {
    backgroundColor: "#FF6B6B",
  },
  requestButton: {
    backgroundColor: "#4ECDC4",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
});
