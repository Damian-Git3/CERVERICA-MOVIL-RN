import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

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
    justifyContent: "space-between",
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

export default MenuScreen;
