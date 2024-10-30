import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import AuthContext from "@/context/Auth/AuthContext";
import PerfilContext from "@/context/Perfil/PerfilContext";
import { router } from "expo-router";
import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Ionicons";
import Ionicons from "react-native-vector-icons/Ionicons";

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
    { name: "Vendedores", icon: "people", route: "" },
    { name: "Clientes Mayoristas", icon: "people", route: "" },
    { name: "Precios", icon: "dollar", route: "/(crm)/(HistorialPrecios)" },
    { name: "Cupones", icon: "tags", route: "" },
    { name: "Descuentos", icon: "percent", route: "" },
    { name: "Dashboard", icon: "stats-chart", route: "" },
    { name: "Notificaciones", icon: "notifications", route: "" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header con título y botones de búsqueda y configuración */}
      <View style={styles.header}>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 15 }}>
            <Ionicons name="search" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => router.push("/(perfil)/(tabs)/profile")}>
        <View style={styles.userInfo}>
          <View style={styles.circle}>
            <Text style={styles.initial}>{userInitial}</Text>
          </View>
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.modulesGrid}>
        {modules.map((module, index) => (
          <TouchableOpacity
            key={module.name}
            style={styles.moduleCard}
            onPress={() => router.push(module.route)}
          >
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

      <CustomButton
        onPress={handleLogout}
        title=" Cerrar sesión"
        IconLeft={() => <Icon name="exit-outline" color="white" size={18} />}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  userInfo: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
    marginVertical: 20,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007bff", // Cambia este color según tu diseño
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  initial: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modulesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  moduleCard: {
    backgroundColor: "#fff",
    width: "48%", // Dos columnas
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  moduleName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#212121", // Color rojo para el botón
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 60,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Menu;
