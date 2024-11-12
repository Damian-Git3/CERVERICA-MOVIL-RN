import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import { Image, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import Slider from "@react-native-community/slider";
import { useCartStore } from "@/stores/CartStore";

type RecetaCardProps = {
  receta: Receta;
};

export default function RecetaCard({ receta }: RecetaCardProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const addToCart = useCartStore((state) => state.addItem);

  const handleAgregarPedido = () => {
    setModalVisible(true);
  };

  const handleAddToCart = () => {
    addToCart({
      id: receta.id,
      nombre: receta.nombre,
      precio: receta.precioUnitarioBaseMayoreo,
      cantidad,
    });
    setModalVisible(false);
    setCantidad(1);
  };

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <Image source={{ uri: receta.imagen }} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.name}>{receta.nombre}</Text>
          <Text style={styles.description}>{receta.descripcion}</Text>
          <Text style={styles.priceLabel}>
            Precio: ${receta.precioUnitarioBaseMayoreo!.toFixed(2)}
          </Text>
        </View>
      </View>

      <View className="mt-3">
        <CustomButton title="Agregar a pedido" onPress={handleAgregarPedido} />
      </View>

      {/* Modal para seleccionar cantidad */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle} className="text-[#ED9224]">
              {receta.nombre}
            </Text>
            <Text style={styles.modalTitle}>Seleccionar cantidad</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={cantidad.toString()}
              onChangeText={(text) => setCantidad(parseInt(text) || 1)}
            />
            <CustomButton title="Agregar" onPress={handleAddToCart} />
            <CustomButton
              title="Cancelar"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
