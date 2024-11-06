import React from "react";
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

type CartProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  idSolicitudMayorista: number;
};

export default function Cart({
  modalVisible,
  setModalVisible,
  idSolicitudMayorista,
}: CartProps) {
  const { items, clearCart } = useCartStore();
  const { avanzarSiguienteEstatus, getSolicitudesMayoristas } =
    useSolicitudesMayoristas();

  const { crearVenta } = useVentas();

  const handleGenerarVenta = async () => {
    const nuevaVenta: CrearVentaDto = {
      detalles: items.map((item) => ({
        idReceta: item.id,
        cantidad: item.cantidad,
        pack: 1,
        montoVenta: 0,
        medidaEnvase: 355,
        tipoEnvase: "Botella",
      })),
      metodoEnvio: 1,
      metodoPago: 3,
      AnioExpiracion: undefined,
      Ciudad: undefined,
      CVV: undefined,
      calle: undefined,
      codigoPostal: undefined,
      Estado: undefined,
      MesExpiracion: undefined,
      nombrePersonaRecibe: undefined,
      NombrePersonaTarjeta: undefined,
      NumeroTarjeta: undefined,
      numeroCasa: undefined,
    };

    //const result = await crearVenta(nuevaVenta);

    clearCart();

    await avanzarSiguienteEstatus({
      idSolicitud: idSolicitudMayorista,
      nuevoEstatus: 4,
    });

    Alert.alert("Éxito", "Venta generada correctamente.");

    //await getSolicitudesMayoristas();

    //router.replace("/(agente)/(solicitudes-mayoristas)/lista-solicitudes");
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
          {items.length > 0 ? (
            <FlatList
              data={items}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Text style={styles.productName}>{item.nombre}</Text>
                  <Text style={styles.productPrice}>
                    ${(item.precio ?? 0).toFixed(2)}
                  </Text>
                  <Text style={styles.productQuantity}>
                    Cantidad: {item.cantidad}
                  </Text>
                  <Text style={styles.productTotal}>
                    Total: ${((item.precio ?? 0) * item.cantidad).toFixed(2)}
                  </Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text style={styles.emptyCart}>El carrito está vacío</Text>
          )}
          <View style={styles.modalButtons}>
            <Button
              title="Generar venta"
              onPress={handleGenerarVenta}
              color="#ED9224"
            />
            <Button
              title="Cerrar"
              onPress={() => setModalVisible(false)}
              color="#ED9224"
            />
            {items.length > 0 && (
              <Button title="Limpiar Carrito" onPress={clearCart} color="red" />
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
