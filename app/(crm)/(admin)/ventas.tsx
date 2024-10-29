import { icons } from "@/constants";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, StyleSheet, View, FlatList, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListVentas } from "@/components/ListVentas";
import { useContext } from "react";
import AuthContext from "@/context/Auth/AuthContext";
import VentaState from "@/context/Venta/VentaState";
import TableResumenVentas from "@/components/TableResumenVentas";
import VentaLoaded from "@/context/Venta/VentaLoaded";

const Ventas = () => {
  const { onLogout } = useContext(AuthContext);

  const handleLogout = async () => {
    const respuestaLogout = await onLogout!();
    router.replace("/(auth)/login");
  };

  const navigateToReporte = (param: string) => {
    router.push(`/(crm)/(admin)/reporteVentas?param=${param}`);
  };

  const ventas = [
    { mes: 'Enero', total: 1000 },
    { mes: 'Febrero', total: 2000 },
    // Agrega más datos según sea necesario
  ];

  return (
    <SafeAreaView style={styles.container}>
      <VentaState>
          <Text>Desde ventas</Text>
          <ListVentas data={[]} />
          <TableResumenVentas navigateToReporte={navigateToReporte} />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              <Image source={icons.out} style={styles.logoutIcon} />
            </TouchableOpacity>
          </View>
      </VentaState>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  resumenContainer: {
    marginTop: 20,
  },
  resumenTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  table: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  resumenButton: {
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
  listItem: {
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
  },
  mes: {
    fontSize: 16,
    fontWeight: "bold",
  },
  total: {
    fontSize: 14,
    color: "#888",
  },
});



export default Ventas;
