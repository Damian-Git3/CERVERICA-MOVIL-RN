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
import useCarrito from "@/hooks/useCarrito";

export default function NuevaSolicitud() {
  const {
    productosCarrito,
    cargando: cargandoCarrito,
    obtenerProductosCarrito,
  } = useCarrito();
  const { recetas, cargando: cargandoRecetas, getRecetas } = useRecetas();

  const [modalVisible, setModalVisible] = useState(false);

  const onCarritoChange = () => {
    obtenerProductosCarrito();
  };

  useEffect(() => {
    getRecetas();
    obtenerProductosCarrito();
    console.log("recetas", recetas);
    console.log("productosCarrito", productosCarrito);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={recetas}
        renderItem={({ item }) => (
          <RecetaCard
            receta={item}
            onCarritoChange={onCarritoChange}
            productosCarrito={productosCarrito}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <Text style={styles.welcomeText}>Nueva solicitud</Text>

            {(cargandoCarrito || cargandoRecetas) && (
              <Progress.Bar
                indeterminate={true}
                width={null}
                color="#ED9224"
                className="mt-5"
              />
            )}
          </>
        )}
      />

      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="cart-outline" size={30} color="white" />
        {productosCarrito && productosCarrito.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{productosCarrito.length}</Text>
          </View>
        )}
      </TouchableOpacity>

      {productosCarrito && (
        <Cart
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          productosCarrito={productosCarrito}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeText: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
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
