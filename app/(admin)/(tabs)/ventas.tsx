import { icons } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomList } from "../../../components/CustomList"; // Asegúrate de que la ruta sea correcta
import { useContext, useEffect } from "react";
import { VentaContext } from "@/context/venta/VentaContext";
import { listHeaders } from "@/constants"; // Asegúrate de que los encabezados sean correctos para CustomList

const Ventas = () => {
  const { ventas, getVentas } = useContext(VentaContext);

  useEffect(() => {
    getVentas();
  }, []);

  const { onLogout } = useAuth();

  const handleLogout = async () => {
    const respuestaLogout = await onLogout!();
    router.replace("/(auth)/login");
  };

  const handleReload = () => {
    getVentas();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Desde ventas</Text>
      {ventas && ventas.length > 0 ? (
        <CustomList data={ventas} />
      ) : (
        <Text>No hay ventas por mostrar...</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleReload} style={styles.reloadButton}>
          <Text style={styles.buttonText}>Recargar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Image source={icons.out} style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  reloadButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#ed9224",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  logoutButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  logoutIcon: {
    width: 16,
    height: 16,
  },
});

export default Ventas;
