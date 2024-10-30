import { icons } from "@/constants";
import AuthContext from "@/context/Auth/AuthContext";
import PerfilContext from "@/context/Perfil/PerfilContext";
import { useRouter } from "expo-router"; // Cambiado a useRouter
import { useContext, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import PerfilState from "@/context/Perfil/PerfilState";
import PerfilLoaded from "@/context/Perfil/PerfilLoaded";

const Perfil = () => {
  const { onLogout, session } = useContext(AuthContext);
  const { userDetails, userMayoristaDetails } = useContext(PerfilContext);
  const router = useRouter();

  const handleLogout = async () => {
    const respuestaLogout = await onLogout!();

    Toast.show({
      type: "success",
      text1: "Esperamos vuelvas pronto!",
      text2: "Lamentamos que te tengas que ir :(",
    });

    if (respuestaLogout.data.isSuccess) {
      router.replace("/(auth)/login");
    }
  };

  const handlePuntosFidelidad = () => {
    router.push("/(perfil)/(tabs)/puntosFidelidad"); // Navega a la pantalla de beneficios
  };

  const handleNavigateToAgente = () => {
    if (userMayoristaDetails) {
      router.push({
        pathname: "/(perfil)/(tabs)/agente",
        params: { userMayoristaDetails: JSON.stringify(userMayoristaDetails) }, // Serialización
      });
    } else {
      Toast.show({
        type: "error",
        text1: "No se puede acceder al agente de ventas",
        text2: "Detalles de usuario mayorista no disponibles.",
      });
    }
  };

  const modules = [
    {
      name: "Mis PistoPoints",
      icon: "beer",
      route: "/(perfil)/(tabs)/puntosFidelidad",
    },
    {
      name: "Mis Cupones",
      icon: "tags",
      route: "/(perfil)/(tabs)/puntosFidelidad",
    },
    {
      name: "Mi Agente",
      icon: "tags",
      action: handleNavigateToAgente,
    },
  ];

  const filteredModules =
    session?.rol === "Mayorista"
      ? modules.filter((module) => module.name === "Mi Agente")
      : modules.filter((module) => module.name !== "Mi Agente");

  return (
    <PerfilState>
      <PerfilLoaded>
        <ScrollView className="px-5 mt-5">
          {userMayoristaDetails ? (
            <>
              <View style={styles.userInfoContainer}>
                <Text style={styles.userInfoLabel}>Nombre completo:</Text>
                <Text style={styles.userInfoText}>
                  {userMayoristaDetails.fullName}
                </Text>

                <Text style={styles.userInfoLabel}>Email:</Text>
                <Text style={styles.userInfoText}>
                  {userMayoristaDetails.email}
                </Text>

                <Text style={styles.userInfoLabel}>Teléfono:</Text>
                <Text style={styles.userInfoText}>
                  {userMayoristaDetails.phoneNumber}
                </Text>

                <Text style={styles.userInfoLabel}>Cargo:</Text>
                <Text style={styles.userInfoText}>
                  {userMayoristaDetails.cargoContacto}
                </Text>
              </View>

              <View style={styles.profileHeader}>
                <Text style={styles.profileTitle}>Mi Empresa</Text>
              </View>

              <View style={styles.userInfoContainer}>
                <Text style={styles.userInfoLabel}>Empresa:</Text>
                <Text style={styles.userInfoText}>
                  {userMayoristaDetails.nombreEmpresa}
                </Text>

                <Text style={styles.userInfoLabel}>Email Empresa:</Text>
                <Text style={styles.userInfoText}>
                  {userMayoristaDetails.emailEmpresa}
                </Text>

                <Text style={styles.userInfoLabel}>Teléfono Empresa:</Text>
                <Text style={styles.userInfoText}>
                  {userMayoristaDetails.telefonoEmpresa}
                </Text>

                <Text style={styles.userInfoLabel}>RFC Empresa:</Text>
                <Text style={styles.userInfoText}>
                  {userMayoristaDetails.rfcEmpresa}
                </Text>
              </View>
            </>
          ) : userDetails ? (
            <View style={styles.userInfoContainer}>
              <Text style={styles.userInfoLabel}>Email:</Text>
              <Text style={styles.userInfoText}>{userDetails.email}</Text>

              <Text style={styles.userInfoLabel}>Nombre completo:</Text>
              <Text style={styles.userInfoText}>{userDetails.fullName}</Text>

              <Text style={styles.userInfoLabel}>Teléfono:</Text>
              <Text style={styles.userInfoText}>{userDetails.phoneNumber}</Text>
            </View>
          ) : (
            <Text>No hay detalles de usuario disponibles</Text>
          )}

          <View style={styles.modulesGrid}>
            {filteredModules.map((module, index) => (
              <TouchableOpacity
                key={index}
                style={styles.moduleCard}
                /* onPress={module.action || (() => router.push(module.route))} */
                onPress={
                  module.action ||
                  (() => router.push("/(agente)/solicitudes-mayoristas"))
                }
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
        </ScrollView>
      </PerfilLoaded>
    </PerfilState>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: "#f5f5f5",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  userInfoContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  userInfoLabel: {
    fontSize: 14,
    color: "#888",
    fontWeight: "600",
    marginTop: 10,
  },
  userInfoText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    marginBottom: 5,
  },
  loadingText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#ff4d4f",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  modulesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 80,
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
});

export default Perfil;
