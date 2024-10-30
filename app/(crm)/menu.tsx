import { icons } from "@/constants";
import AuthContext from "@/context/Auth/AuthContext";
import { router } from "expo-router";
import { useContext, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import Toast from "react-native-toast-message";
import styles from "./menuStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
import PerfilContext from "@/context/Perfil/PerfilContext";

const Menu = () => {
  const { onLogout, session } = useContext(AuthContext);

  const handleLogout = async () => {
    const respuestaLogout = await onLogout!();

    Toast.show({
      type: "success",
      text1: "Esperamos vuelvas pronto!",
      text2: "Lamentamos que te tengas que ir:(",
    });

    if (respuestaLogout.data.isSuccess) {
      router.replace("/(auth)/login");
    }
  };

  const { userDetails } = useContext(PerfilContext);
  console.log("userDetails");
  console.log(userDetails);

  const userName = session?.nombre;
  const userInitial = userName?.charAt(0).toUpperCase();

  const modules = [
    { name: "Vendedores", icon: "people" },
    { name: "Clientes Mayoristas", icon: "people" },
    { name: "Precios", icon: "dollar" },
    { name: "Cupones", icon: "tags" },
    { name: "Descuentos", icon: "percent" },
    { name: "Dashboard", icon: "stats-chart" },
    { name: "Notificaciones", icon: "notifications" },
  ];

  return (
    <>
      <ScrollView style={styles.container}>
        {/* Header con título y botones de búsqueda y configuración */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Menu</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <Ionicons name="settings-outline" size={28} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 15 }}>
              <Ionicons name="search" size={28} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/(perfil)/(tabs)/profile")}
        >
          <View style={styles.userInfo}>
            <View style={styles.circle}>
              <Text style={styles.initial}>{userInitial}</Text>
            </View>
            <Text style={styles.userName}>{userName}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.modulesGrid}>
          {modules.map((module, index) => (
            <TouchableOpacity key={index} style={styles.moduleCard}>
              {/* Decide qué icono usar según el módulo */}
              {module.icon === "percent" ||
              module.icon === "tags" ||
              module.icon === "dollar" ? (
                <FontAwesome name={module.icon} size={30} color="black" />
              ) : (
                <Ionicons name={module.icon} size={30} color="black" />
              )}
              <Text style={styles.moduleName}>{module.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    width: "80%",
  },
  buttonPressed: {
    backgroundColor: "#ed9224", // Color más oscuro para el efecto "hover"
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#ed9224",
    fontSize: 16,
  },
  buttonTextPressed: {
    color: "#fff",
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default Menu;
