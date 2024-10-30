import { icons } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../(crm)/menuStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React from "react";

const Inicio = () => {
  const { onLogout } = useAuth();

  const handleLogout = async () => {
    const respuestaLogout = await onLogout!();

    //TODO: Generar toast para notificar salida

    if (respuestaLogout.data.isSuccess) {
      router.replace("/(auth)/login");
    }

    //TODO: Mostrar porque no se pudo hacer logout
  };

  const userName = "Nombre del Usuario";
  const userInitial = userName.charAt(0).toUpperCase();

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
      <SafeAreaView>
        <Text>Desde inicio</Text>

        <TouchableOpacity
          onPress={handleLogout}
          className="justify-center items-center w-10 h-10 rounded-full bg-white"
        >
          <Image source={icons.out} className="w-4 h-4" />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.container}>
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

        <View style={styles.userInfo}>
          <View style={styles.circle}>
            <Text style={styles.initial}>{userInitial}</Text>
          </View>
          <Text style={styles.userName}>{userName}</Text>
        </View>

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

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Inicio;
