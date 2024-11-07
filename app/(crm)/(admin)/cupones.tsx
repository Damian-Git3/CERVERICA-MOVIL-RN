import React, { useCallback } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "expo-router";
import useCupones from "@/hooks/useCupones";
import { images } from "@/constants";

const Cupones = () => {
  const navigation = useNavigation();
  const { cargando, cupones, getCupones } = useCupones();

  useFocusEffect(
    useCallback(() => {
      const fetchCupones = async () => {
        await getCupones();
      };

      fetchCupones();
    }, [])
  );

  // Función para navegar a la pantalla de formulario
  const handleAddCoupon = () => {
    navigation.navigate("formularioCupones");
  };

  const renderCouponCard = ({ item }: { item: any }) => {
    const discountText =
      item.tipo === 1 ? `${item.valor}%` : `$${item.valor.toFixed(2)}`;

    const categoriaComprador = {
      1: "Todos",
      2: "Frecuente",
      3: "Minorista",
      4: "Mayorista",
      5: "Inactivo",
    };

    // Función para manejar el clic en la tarjeta
    const handleCardPress = () => {
      navigation.navigate("formularioCupones", { cupon: item });
    };

    return (
      <TouchableOpacity onPress={handleCardPress} style={styles.card}>
        <View style={styles.yellowSection}>
          <Text style={styles.discountText}>{discountText}</Text>
        </View>
        <View style={styles.whiteSection}>
          <Text style={styles.couponTitle}>Código: {item.codigo}</Text>
          <Text style={styles.couponText}>
            Monto maximo: {item.montoMaximo} MXN
          </Text>
          <Text style={styles.couponText}>Paquete: {item.paquete}</Text>
          <Text style={styles.couponText}>Usos: {item.usos}</Text>
          <Text style={styles.couponText}>
            Categoría comprador:{" "}
            {categoriaComprador[item.categoriaComprador] || "Desconocido"}
          </Text>
          <Text style={styles.couponText}>
            Expira el:{" "}
            {isNaN(new Date(item.fechaExpiracion))
              ? "Fecha inválida"
              : new Date(item.fechaExpiracion).toLocaleDateString()}
          </Text>

          <Text style={styles.couponText}>
            Estatus: {item.activo ? "Activo" : "Inactivo"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Agregar Cupon" onPress={handleAddCoupon} />

      <Text style={styles.title}>Cupones Disponibles</Text>

      {cargando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : cupones && cupones.length > 0 ? (
        <FlatList
          data={cupones}
          renderItem={renderCouponCard}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View style={styles.noCouponsContainer}>
          <Image
            source={images.noResult}
            className="w-40 h-40"
            alt="No se encontraron cupones"
            resizeMode="contain"
          />
          <Text className="text-center">No hay cupones disponibles.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginVertical: 10,
  },
  yellowSection: {
    backgroundColor: "#ffb307",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  discountText: {
    fontSize: 22,
    fontWeight: "800",
    color: "black",
  },
  whiteSection: {
    backgroundColor: "#fff",
    width: "70%",
    padding: 10,
  },
  couponTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  couponText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  noCouponsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Cupones;
