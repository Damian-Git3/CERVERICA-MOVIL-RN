import CustomButton from "@/components/CustomButton";
import AuthContext from "@/context/Auth/AuthContext";
import { Href, router } from "expo-router";
import React, { useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  default as Icon,
  default as Ionicons,
} from "react-native-vector-icons/Ionicons";

const Menu = () => {
  const { onLogout, session } = useContext(AuthContext);

  const handleLogout = async () => {
    const respuestaLogout = await onLogout!();

    Toast.show({
      type: "success",
      text1: "Esperamos vuelvas pronto!",
      text2: "Lamentamos que te tengas que ir:(",
    });

    router.replace("/(auth)/login");
  };

  const userName = session?.nombre;
  const userInitial = userName?.charAt(0).toUpperCase();

  // Lista de módulos, incluyendo restricciones de roles
  const modules: {
    name: string;
    icon: string;
    route: Href;
    roles: string[];
  }[] = [
    {
      name: "Vendedores",
      icon: "people",
      route: "/(admin)/ventas",
      roles: ["Admin"],
    },
    {
      name: "Clientes Mayoristas",
      icon: "people",
      route: "/(admin)/ventas",
      roles: ["Admin"],
    },
    {
      name: "Precios",
      icon: "dollar",
      route: "/(admin)/HistorialPrecios",
      roles: ["Admin"],
    },
    {
      name: "Descuentos",
      icon: "percent",
      route: "/(admin)/ventas",
      roles: ["Mayorista"],
    },
    {
      name: "Pagos",
      icon: "dollar",
      route: "/(mayorista)/pagos",
      roles: ["Mayorista"],
    },
    {
      name: "Dashboard",
      icon: "stats-chart",
      route: "/(admin)/(dashboard)",
      roles: ["Admin"],
    },
    {
      name: "Notificaciones",
      icon: "notifications",
      route: "/(crm)/(notificacion)",
      roles: ["Admin", "Mayorista", "Agente", "Cliente"],
    },
    {
      name: "Ventas",
      icon: "cart",
      route: "/(admin)/ventas",
      roles: ["Admin"],
    },
    {
      name: "Mesa de Ayuda",
      icon: "happy",
      route: "/(crm)/(agente)/solicitud-asistencia",
      roles: ["Admin", "Agente"],
    },
    {
      name: "Mesa de Ayuda",
      icon: "happy",
      route: "/(crm)/(cliente)/solicitud-asistencia",
      roles: ["Cliente", "Mayorista"],
    },
    {
      name: "Solicitud Cambio Agente",
      icon: "swap-horizontal-outline",
      route: "/(admin)/solicitudesCambioAgente",
      roles: ["Admin"],
    },
    {
      name: "Gestión de Configuraciones",
      icon: "settings-outline",
      route: "/(admin)/menuConfiguraciones",
      roles: ["Admin"],
    },
    {
      name: "Solicitudes mayoristas",
      icon: "swap-horizontal-outline",
      route: "/(agente)/(solicitudes-mayoristas)/lista-solicitudes",
      roles: ["Agente"],
    },
    {
      name: "Cupones",
      icon: "tags",
      route: "/(admin)/cupones",
      roles: ["Admin"],
    },
    {
      name: "Mis solicitudes",
      icon: "tags",
      route: "/(mayorista)/(solicitudes-mayoristas)/lista-solicitudes",
      roles: ["Mayorista"],
    },
    {
      name: "Mayoristas Asignados",
      icon: "people",
      route: "/(agente)/mayoristas-asignados",
      roles: ["Agente"],
    },
    {
      name: "Mis pedidos",
      icon: "people",
      route: "/(mayorista)/pedidos",
      roles: ["Mayorista"],
    },
  ];

  const filteredModules = modules.filter((module) =>
    module.roles.includes(session ? session.rol : "")
  );

  return (
    <SafeAreaView className="flex-1">
      <ScrollView style={styles.container} className="mt-[20]">
        {/* Header con título y botones de búsqueda y configuración */}
        <View style={styles.header}>
          <View className="flex flex-row gap-3 items-center justify-center">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="menu" size={30} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Menú</Text>
          </View>

          {/*<View style={styles.headerIcons}>
            <TouchableOpacity>
              <Ionicons name="settings-outline" size={28} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 15 }}>
              <Ionicons name="search" size={28} color="black" />
            </TouchableOpacity>
          </View>*/}
        </View>
        <TouchableOpacity
          onPress={() => router.replace("/(perfil)/(tabs)/profile")}
        >
          <View style={styles.userInfo}>
            <View style={styles.circle}>
              <Text style={styles.initial}>{userInitial}</Text>
            </View>
            <Text style={styles.userName}>{userName}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.modulesGrid}>
          {filteredModules.map((module, index) => (
            <TouchableOpacity
              key={index}
              style={styles.moduleCard}
              onPress={() => router.replace(module.route as any)} // Agrega la navegación aquí
            >
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
          style={styles.customButton}
          onPress={handleLogout}
          title=" Cerrar sesión"
          IconLeft={() => <Icon name="exit-outline" color="white" size={18} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

/* const menuAdmin = () => {
  return (
    <TouchableOpacity onPress={() => router.replace("/(crm)/(admin)/inicio" as any)}>
      <FontAwesome name="dollar" size={16} color="black" />
    </TouchableOpacity>
  );
}; */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
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
    shadowColor: "#ed9224",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
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
    shadowColor: "#ed9224",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
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
  customButton: {
    marginTop: 10,
    marginBottom: 50,
  },
});

export default Menu;
