import AuthContext from "@/context/Auth/AuthContext";
import { useRouter } from "expo-router"; // Cambiado a useRouter
import { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "./perfilStyle";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import usePerfil from "@/hooks/usePerfil";

const Profile = () => {
  const navigation = useNavigation();
  navigation.setOptions({ headerShown: false });

  const { onLogout, session } = useContext(AuthContext);

  const {
    getUserMayoristaDetails,
    getUserDetails,
    userMayoristaDetails,
    userDetails,
    cargando,
  } = usePerfil();

  useEffect(() => {
    if (session?.rol === "Mayorista") {
      getUserMayoristaDetails();
    } else {
      getUserDetails();
    }
  }, [session?.rol]);

  const router = useRouter(); // Inicializa el router aquí

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

  // Filtrar módulos según el rol
  const filteredModules =
    session?.rol === "Mayorista"
      ? modules.filter((module) => module.name === "Mi Agente")
      : modules.filter((module) => module.name !== "Mi Agente");

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.profileHeader}>
          <Text style={styles.profileTitle}>Perfil de Usuario</Text>
        </View>

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
              onPress={
                module.action ||
                (() => module.route && router.push(module.route as any))
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
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;
