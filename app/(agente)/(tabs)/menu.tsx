import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "./menuStyle";

const MenuScreen = () => {
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
    </ScrollView>
  );
};

export default MenuScreen;
