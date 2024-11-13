import CustomButton from "@/components/CustomButton";
import useSolicitudesMayoristas from "@/hooks/useSolicitudesMayoristas";
import useSolicitudesMayoristasStore from "@/stores/SolicitudesMayoristasStore";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Image, Text, TextInput, View } from "react-native";
import RechazarSolicitud from "./rechazar-solicitud";
import { ProductoCarrito } from "@/models/ProductoCarrito";
import { PedidoMayoristaInsertDTO } from "@/dtos/PedidosMayoristas/PedidoMayoristaInsertDTO";
import usePedidosMayoristas from "@/hooks/usePedidosMayoristas";
import Toast from "react-native-toast-message";

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
  const { crearPedidoMayorista, cargando } = usePedidosMayoristas();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
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
      plazoMeses: 1,
      observaciones: "",
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
        text2: "Manos a la obra en la producción!"
      });

      router.replace("/(agente)/(solicitudes-mayoristas)/lista-solicitudes");
    }
  };

  return (
    <View className="p-5">
      <FlatList
        data={carritoSolicitud}
        renderItem={({ item }) => (
          <ProductoCarritoCard productoCarrito={item} />
        )}
      />

      <CustomButton
        title="Confirmar solicitud"
        onPress={handleConfirmarSolicitud}
      />

      <RechazarSolicitud solicitudMayorista={solicitudMayorista} />
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
});
