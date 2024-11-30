import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";

//@ts-ignore
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { DetalleVenta, Venta } from "@/models/venta";
import useVentas from "@/hooks/useVentas";
import * as Progress from "react-native-progress";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

interface PedidoCardProps {
  pedido: Venta;
}

export default function PedidoCard({ pedido }: PedidoCardProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const pasos = ["Recibido", "Empaquetando", "Listo"];
  const { getPedido, pedido: detallesPedido, cargando } = useVentas();

  const getActiveStep = () => {
    switch (pedido.estatusVenta) {
      case 1:
        return 0; // Recibido
      case 2:
        return 1; // Empaquetando
      case 3:
        return 2; // Listo
      default:
        return 0;
    }
  };

  const getActiveStepName = () => {
    switch (pedido.estatusVenta) {
      case 1:
        return "Recibido"; // Recibido
      case 2:
        return "Empaquetando"; // Empaquetando
      case 3:
        return "Listo"; // Listo
      default:
        return 0;
    }
  };

  const handleTouchPedido = (idPedido: number) => {
    getPedido(idPedido);
    setModalVisible(true);
  };

  const renderCartItem = ({ item }: { item: DetalleVenta }) => (
    <View style={styles.cartItemContainer}>
      <View style={styles.cartItemContent}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.stock.receta.nombre}
        </Text>
        <View style={styles.cartItemDetails}>
          <Text style={styles.productPrice}>
            ${(item.stock.receta.precioUnitarioBaseMayoreo ?? 0).toFixed(2)}
          </Text>
          <View style={styles.quantityBadge}>
            <Text style={styles.quantityText}>{item.cantidad}</Text>
          </View>
        </View>
        <Text style={styles.productTotal}>
          Total: $
          {(
            (item.stock.receta.precioUnitarioBaseMayoreo ?? 0) * item.cantidad
          ).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <TouchableOpacity onPress={() => handleTouchPedido(pedido.id)}>
        <View style={styles.container}>
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Detalles del Pedido</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>No. Pedido:</Text>
              <Text style={styles.infoValue}>{pedido.id}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Total:</Text>
              <Text style={styles.infoValue}>${pedido.total.toFixed(2)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Método de Pago:</Text>
              <Text style={styles.infoValue}>{pedido.metodoPago}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Método de Envío:</Text>
              <Text style={styles.infoValue}>{pedido.metodoEnvio}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Fecha del Pedido:</Text>
              <Text style={styles.infoValue}>
                {new Date(pedido.fechaVenta).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Cantidad de Cervezas:</Text>
              <Text style={styles.infoValue}>{pedido.totalCervezas}</Text>
            </View>

            <View style={styles.progressContainer}>
              <ProgressSteps
                activeStep={getActiveStep()}
                activeStepIconBorderColor="#ed9224"
                progressBarColor="#ed9224"
                completedProgressBarColor="#ed9224"
                completedStepIconColor="#ed9224"
                labelColor="#ed9224"
                activeLabelColor="#ed9224"
                isComplete={pedido.estatusVenta === 3}
              >
                {pasos.map((stepLabel, index) => (
                  <ProgressStep key={index} label={stepLabel} removeBtnRow />
                ))}
              </ProgressSteps>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {cargando && (
              <Progress.Bar
                indeterminate={true}
                width={null}
                color="#ED9224"
                className="mt-5"
              />
            )}

            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Detalles del Pedido</Text>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Estatus:</Text>
                <Text style={styles.infoValue}>{getActiveStepName()}</Text>
              </View>
            </View>

            {detallesPedido ? (
              <>
                <FlatList
                  data={detallesPedido.productosPedido}
                  renderItem={renderCartItem}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={styles.flatListContent}
                />

                <View style={styles.totalContainer}>
                  <Text style={styles.totalText}>Total:</Text>
                  <Text style={styles.totalAmount}>
                    ${pedido.total.toFixed(2)}
                  </Text>
                </View>
              </>
            ) : (
              <View style={styles.emptyCartContainer}>
                <Ionicons name="cart-outline" size={80} color="#ccc" />
                <Text style={styles.emptyCartText}>Tu carrito está vacío</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
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
  container: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    maxHeight: "80%",
  },
  infoSection: {
    marginBottom: 15,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  infoLabel: {
    color: "#666",
    fontWeight: "500",
  },
  infoValue: {
    color: "#333",
    fontWeight: "600",
  },
  progressContainer: {
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: "#ed9224",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
