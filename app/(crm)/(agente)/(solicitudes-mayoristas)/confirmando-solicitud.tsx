import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Image, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "@/components/CustomButton";
import useSolicitudesMayoristasStore from "@/stores/SolicitudesMayoristasStore";
import useSolicitudesMayoristas from "@/hooks/useSolicitudesMayoristas";
import { router } from "expo-router";
import { ProductoCarrito } from "@/models/ProductoCarrito";
import { PedidoMayoristaInsertDTO } from "@/dtos/PedidosMayoristas/PedidoMayoristaInsertDTO";
import usePedidosMayoristas from "@/hooks/usePedidosMayoristas";
import Toast from "react-native-toast-message";
import useConfiguracionVentasMayoreo from "@/hooks/useConfiguracionVentasMayoreo";
import RechazarSolicitud from "./rechazar-solicitud";
import { Ionicons } from "@expo/vector-icons";

const ProductoCarritoCard = ({
  productoCarrito,
}: {
  productoCarrito: ProductoCarrito;
}) => {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <Image
          source={{ uri: productoCarrito.receta.imagen }}
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{productoCarrito.receta.nombre}</Text>
          <Text style={styles.description}>
            {productoCarrito.receta.descripcion}
          </Text>
          <Text style={styles.priceLabel}>
            Cantidad:{" "}
            <Text className="text-[#ed9224]">{productoCarrito.cantidad}</Text>
          </Text>
          <Text style={styles.priceLabel}>
            Precio:{" "}
            <Text className="text-[#ed9224]">
              ${productoCarrito.receta.precioUnitarioBaseMayoreo!.toFixed(2)}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default function ConfirmandoSolicitud() {
  const { solicitudMayorista } = useSolicitudesMayoristasStore();
  const { obtenerCarritoSolicitud, carritoSolicitud } =
    useSolicitudesMayoristas();
  const { crearPedidoMayorista } = usePedidosMayoristas();
  const [isMounted, setIsMounted] = useState(false);
  const { getConfiguracionVentasMayoreo, configuracionVentasMayoreo } =
    useConfiguracionVentasMayoreo();

  // New state for modal and form
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [selectedPaymentTerm, setSelectedPaymentTerm] = useState(1);
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    getConfiguracionVentasMayoreo();
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && solicitudMayorista == null) {
      router.replace("/(agente)/(solicitudes-mayoristas)/lista-solicitudes");
    }
  }, [isMounted, solicitudMayorista]);

  useEffect(() => {
    obtenerCarritoSolicitud(solicitudMayorista!.id);
  }, []);

  const handleConfirmarSolicitud = async () => {
    const nuevoPedidoMayorista: PedidoMayoristaInsertDTO = {
      idMayorista: solicitudMayorista!.idMayorista,
      idSolicitudMayorista: solicitudMayorista!.id,
      plazoMeses: selectedPaymentTerm,
      observaciones: observaciones,
      listaCervezas: carritoSolicitud.map(
        (productoCarrito: ProductoCarrito) => ({
          idReceta: productoCarrito.receta.id,
          cantidad: productoCarrito.cantidad,
        })
      ),
    };

    const result = await crearPedidoMayorista(nuevoPedidoMayorista);

    if (result?.status == 200) {
      Toast.show({
        type: "success",
        text1: "Pedido confirmado!",
        text2: "Manos a la obra en la producción!",
      });

      router.replace("/(agente)/(solicitudes-mayoristas)/lista-solicitudes");
    }
  };

  const openConfirmModal = () => {
    setIsConfirmModalVisible(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalVisible(false);
  };

  const confirmOrder = () => {
    closeConfirmModal();
    handleConfirmarSolicitud();
  };

  return (
    <View className="p-5">
      <FlatList
        data={carritoSolicitud}
        renderItem={({ item }) => (
          <ProductoCarritoCard productoCarrito={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <CustomButton title="Confirmar solicitud" onPress={openConfirmModal} />

      <RechazarSolicitud solicitudMayorista={solicitudMayorista} />

      {/* Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isConfirmModalVisible}
        onRequestClose={closeConfirmModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeConfirmModal}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Detalles de la Solicitud</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Plazo de Pago (Meses)</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedPaymentTerm}
                  onValueChange={(itemValue) =>
                    setSelectedPaymentTerm(itemValue)
                  }
                  style={styles.picker}
                >
                  {Array.from(
                    { length: configuracionVentasMayoreo?.plazoMaximoPago },
                    (_, index) => (
                      <Picker.Item
                        key={index + 1}
                        label={`${index + 1} mes(es)`}
                        value={index + 1}
                      />
                    )
                  )}
                </Picker>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Observaciones (Opcional)</Text>
              <TextInput
                style={styles.textArea}
                multiline={true}
                numberOfLines={4}
                placeholder="Escribe tus observaciones aquí..."
                value={observaciones}
                onChangeText={setObservaciones}
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={closeConfirmModal}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={confirmOrder}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  card: {
    flexDirection: "column",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: 40,
    height: 150,
    marginRight: 10,
    borderRadius: 5,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 20,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    gap: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    width: "100%",
    padding: 8,
    marginBottom: 10,
    textAlign: "center",
  },
  deleteButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  formGroup: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#FF6B6B",
  },
  confirmButton: {
    backgroundColor: "#4ECDC4",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
