import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  Button,
  Alert,
} from "react-native";
import { CartItem, useCartStore } from "@/stores/CartStore"; // Asegúrate de importar el store correctamente
import useVentas from "@/hooks/useVentas";
import { CrearVentaDto } from "@/dtos/CrearVentaDTO";
import useSolicitudesMayoristas from "@/hooks/useSolicitudesMayoristas";
import { router } from "expo-router";
import useCarrito from "@/hooks/useCarrito";
import { ProductoCarrito } from "@/models/ProductoCarrito";
import CustomButton from "@/components/CustomButton";
import Toast from "react-native-toast-message";

type CartProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  productosCarrito: ProductoCarrito[] | null;
};

export default function Cart({
  modalVisible,
  setModalVisible,
  productosCarrito,
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

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Carrito de Compras</Text>
          {productosCarrito!.length > 0 ? (
            <FlatList
              data={productosCarrito}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Text style={styles.productName}>{item.receta.nombre}</Text>
                  <Text style={styles.productPrice}>
                    ${(item.receta.precioUnitarioBaseMayoreo ?? 0).toFixed(2)}
                  </Text>
                  <Text style={styles.productQuantity}>
                    Cantidad: {item.cantidad}
                  </Text>
                  <Text style={styles.productTotal}>
                    Total: $
                    {(
                      (item.receta.precioUnitarioBaseMayoreo ?? 0) *
                      item.cantidad
                    ).toFixed(2)}
                  </Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text style={styles.emptyCart}>El carrito está vacío</Text>
          )}
          <View style={styles.modalButtons} className="flex flex-col gap-2">
            <CustomButton
              title="Realizar solicitud"
              onPress={handleRealizarSolicitud}
            />
            <CustomButton
              title="Cerrar"
              bgVariant="secondary"
              onPress={() => setModalVisible(false)}
            />
            {productosCarrito!.length > 0 && (
              <CustomButton
                title="Limpiar Carrito"
                bgVariant="danger"
                /* onPress={clearCart} */
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cartButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#ED9224",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  cartItem: {
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#666",
  },
  productQuantity: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  productTotal: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ED9224",
    marginTop: 5,
  },
  emptyCart: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  modalButtons: {
    marginTop: 20,
  },
});
