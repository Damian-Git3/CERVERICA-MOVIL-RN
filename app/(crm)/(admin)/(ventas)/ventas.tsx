import { icons } from "@/constants";
import { router } from "expo-router";
import {
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  FlatList,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListVentas } from "@/components/admin/ventas/ListVentas";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/Auth/AuthContext";
import VentaState from "@/context/Venta/VentaState";
import TableResumenVentas from "@/components/admin/ventas/TableResumenVentas";
import useVentas from "@/hooks/useVentas";
import { Venta } from "@/models/venta";
import useVentaStore from "@/stores/VentasStore";

const Ventas = () => {
  const { ventas, resumenVentas, getVentas, getResumenVentas } = useVentas();
  const { session } = useContext(AuthContext);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getVentas!();
    getResumenVentas!();
  }, []);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await getVentas!();
    await getResumenVentas!();
    setIsRefreshing(false);
  };

  const handlePressVenta = (venta: Venta) => {
    const setVentaSeleccionada = useVentaStore.getState().setVenta;
    setVentaSeleccionada(venta);
    router.push("/(crm)/(admin)/(ventas)/detalle-venta");
  };

  const navigateToReporte = (param: string) => {
    router.push(`/(crm)/(admin)/(ventas)/reporte-ventas?param=${param}`);
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.listContainer}>
          <Text style={styles.resumenTitle}>Lista de ventas</Text>
          <View style={styles.hr} />
          <ListVentas data={ventas} />
        </View>

        <View style={styles.resumenContainer}>
          <Text style={styles.resumenTitle}>Resumen de tus ventas</Text>
          <View style={styles.hr} />
          <TableResumenVentas navigateToReporte={navigateToReporte} />
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
  hr: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  listContainer: {
    flex: 2, // Ocupa más espacio
    marginBottom: 16,
  },
  resumenContainer: {
    flex: 1, // Ocupa menos espacio
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
