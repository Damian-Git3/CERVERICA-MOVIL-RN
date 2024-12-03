import PedidoCard from "@/components/Agente/PedidoCard";
import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import useVentas from "@/hooks/useVentas";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const pedidos = () => {
  const { getPedidosUsuario, pedidos, cargando } = useVentas();

  useEffect(() => {
    getPedidosUsuario();
  }, []);

  return (
    <SafeAreaView className="p-5">
      <FlatList
        data={pedidos}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.id}>
            <PedidoCard pedido={item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            {cargando ? (
              <ActivityIndicator size="small" color="#ed9224" />
            ) : (
              <>
                <Image
                  source={images.noResult}
                  style={styles.noResultImage}
                  alt="No se encontraron solicitudes de mayoristas"
                  resizeMode="contain"
                />

                <Text style={styles.noResultText}>
                  No se encontraron tus solicitudes {":("}
                </Text>
              </>
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}>Mis pedidos</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 12 },
  emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  noResultImage: { width: 160, height: 160 },
  noResultText: { fontSize: 14, color: "#333" },
  headerContainer: { marginVertical: 20 },
  welcomeText: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  filtersContainer: { flexDirection: "row", gap: 8 },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
});

export default pedidos;
