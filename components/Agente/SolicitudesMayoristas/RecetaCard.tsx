import CustomButton from "@/components/CustomButton";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import { useCartStore } from "@/stores/CartStore";
import useCarrito from "@/hooks/useCarrito";
import { ProductoCarrito } from "@/models/ProductoCarrito";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Progress from "react-native-progress";

type RecetaCardProps = {
  receta: Receta;
  productosCarrito: ProductoCarrito[] | null;
  onCarritoChange?: () => void;
  configuracionVentasMayoreo: any;
};

export default function RecetaCard({
  receta,
  productosCarrito,
  onCarritoChange,
  configuracionVentasMayoreo,
}: RecetaCardProps) {
  const {
    cargando,
    agregarProductoCarrito,
    actualizarProductoCarrito,
    eliminarProductoCarrito,
  } = useCarrito();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleConfirmacion, setModalVisibleConfirmacion] =
    useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [montoMinimo, setMontoMinimo] = useState<number | null>(null);
  const [productoCarrito, setProductoCarrito] = useState<ProductoCarrito>();

  const handleAbrirModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    if (!configuracionVentasMayoreo) return;
    setMontoMinimo(configuracionVentasMayoreo.montoMinimoMayorista as number);
  }, [configuracionVentasMayoreo]);

  useEffect(() => {
    if (montoMinimo) setCantidad(montoMinimo);
  }, [montoMinimo]);

  useEffect(() => {
    if (productosCarrito && productosCarrito.length > 0) {
      const estaEnCarrito = productosCarrito.find(
        (producto) => producto.idReceta === receta.id
      );

      setProductoCarrito(estaEnCarrito);
      setCantidad(estaEnCarrito?.cantidad || 1);
    } else {
      setProductoCarrito(undefined);
    }
  }, [productosCarrito]);

  const handleAgregarACarrito = async () => {
    await agregarProductoCarrito({
      idReceta: receta.id,
      cantidadLote: 1,
      cantidad,
    });

    setModalVisible(false);

    if (montoMinimo) {
      setCantidad(montoMinimo);
    } else {
      setCantidad(1);
    }

    if (onCarritoChange) {
      onCarritoChange();
    }
  };

  const handleActualizarCarrito = async () => {
    await actualizarProductoCarrito({
      idReceta: receta.id,
      cantidadLote: 1,
      cantidad,
    });

    setModalVisible(false);

    if (montoMinimo) {
      setCantidad(montoMinimo);
    } else {
      setCantidad(1);
    }

    if (onCarritoChange) {
      onCarritoChange();
    }
  };

  const handleEliminarProductoCarrito = async () => {
    if (productoCarrito) {
      await eliminarProductoCarrito({
        idReceta: productoCarrito.idReceta,
        cantidadLote: 1,
      });
    }

    setModalVisibleConfirmacion(false);

    if (onCarritoChange) {
      onCarritoChange();
    }
  };

  const aumentarCantidad = () => {
    setCantidad((prevCantidad) => Math.max(prevCantidad + 1, montoMinimo || 1));
  };

  const disminuirCantidad = () => {
    setCantidad((prevCantidad) => Math.max(prevCantidad - 1, montoMinimo || 1));
  };

  const handleCantidadChange = (text: string) => {
    const nuevaCantidad = parseInt(text) || 1;
    setCantidad(Math.max(nuevaCantidad, montoMinimo || 1));
  };

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <Image source={{ uri: receta.imagen }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{receta.nombre}</Text>
          <Text style={styles.description}>{receta.descripcion}</Text>
          <Text style={styles.priceLabel}>
            Precio:{" "}
            <Text className="text-[#ed9224]">
              ${receta.precioUnitarioBaseMayoreo!.toFixed(2)}
            </Text>
          </Text>
        </View>

        {productoCarrito && (
          <TouchableOpacity
            onPress={() => setModalVisibleConfirmacion(true)}
            style={styles.deleteButton}
          >
            <Ionicons name="trash" size={20} color="red" />
          </TouchableOpacity>
        )}
      </View>

      <View className="mt-3">
        {productoCarrito ? (
          <>
            <View className="flex-row items-center justify-center space-x-2">
              <CustomButton
                title="-"
                className="w-10"
                onPress={() => disminuirCantidad()}
              />
              <TextInput
                className="text-center border border-gray-300 rounded w-16 h-full"
                keyboardType="number-pad"
                value={cantidad.toString()}
                onChangeText={handleCantidadChange}
              />
              <CustomButton
                title="+"
                className="w-10"
                onPress={() => aumentarCantidad()}
              />
            </View>

            <CustomButton
              title="Actualizar"
              onPress={handleActualizarCarrito}
              className="mt-5"
            />
          </>
        ) : (
          <CustomButton title="Agregar a carrito" onPress={handleAbrirModal} />
        )}
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle} className="text-[#ED9224]">
              {receta.nombre}
            </Text>
            <Text style={styles.modalTitle}>Ingresa la cantidad</Text>

            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={cantidad.toString()}
              onChangeText={handleCantidadChange}
            />

            <CustomButton title="Agregar" onPress={handleAgregarACarrito} />

            <CustomButton
              title="Cancelar"
              onPress={() => setModalVisible(false)}
            />

            {cargando && (
              <View className="w-full">
                <Progress.Bar
                  indeterminate={true}
                  width={null}
                  color="#ED9224"
                  className="mt-5"
                />
              </View>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalVisibleConfirmacion}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar eliminación</Text>
            <Text className="text-center">
              ¿Estás seguro de que deseas eliminar este producto de tu carrito?
            </Text>

            {cargando && (
              <View className="w-full">
                <Progress.Bar
                  indeterminate={true}
                  width={null}
                  color="#ED9224"
                  className="mt-5"
                />
              </View>
            )}

            <View style={styles.modalActions}>
              <Button
                title="Cancelar"
                onPress={() => setModalVisibleConfirmacion(false)}
              />
              <Button
                title="Confirmar"
                onPress={handleEliminarProductoCarrito}
                color="#28a745"
              />
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
  priceLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 20,
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
});
