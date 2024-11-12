import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Modal,
} from "react-native";
import * as Progress from "react-native-progress";
import Ionicons from "react-native-vector-icons/Ionicons";
import RecetaCard from "@/components/Agente/SolicitudesMayoristas/RecetaCard";
import useRecetas from "@/hooks/useRecetas";
import { useCartStore } from "@/stores/CartStore";
import useSolicitudesMayoristasStore from "@/stores/SolicitudesMayoristasStore";
import { router } from "expo-router";
import Cart from "@/components/Agente/SolicitudesMayoristas/Cart";

export default function ProspectoSolicitud() {
  const { solicitudMayorista } = useSolicitudesMayoristasStore();
  const { recetas, cargando, getRecetas } = useRecetas();
  const [isMounted, setIsMounted] = useState(false);
  const { items } = useCartStore();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && solicitudMayorista == null) {
      router.replace("/(agente)/(solicitudes-mayoristas)/lista-solicitudes");
    }
  }, [isMounted, solicitudMayorista]);

  useEffect(() => {
    getRecetas();
  }, []);

  return (
    <View style={styles.container}>
      {cargando && (
        <Progress.Bar
          indeterminate={true}
          width={null}
          color="#ED9224"
          className="mt-5"
        />
      )}

      <FlatList
        data={recetas}
        renderItem={({ item }) => <RecetaCard receta={item} />}
      />

      {/* Botón del carrito */}
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="cart-outline" size={30} color="white" />
        {items.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{items.length}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Modal del carrito */}
      <Cart
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        idSolicitudMayorista={solicitudMayorista!.id}
      />
    </View>
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
    marginBottom: 10,
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
