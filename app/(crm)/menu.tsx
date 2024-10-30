import AuthContext from "@/context/Auth/AuthContext";
import PerfilContext from "@/context/Perfil/PerfilContext";
import { router } from "expo-router";
import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./menuStyle";

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

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Menu;
