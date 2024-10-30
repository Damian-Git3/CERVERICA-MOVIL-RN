import { useLocalSearchParams, useNavigation } from "expo-router";
import AuthContext from "@/context/Auth/AuthContext";
import { useContext } from "react";
import { Text, View, Button, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import styles from "./perfilStyle";
import { ScrollView } from "react-native-gesture-handler";

const Agente = () => {
  const navigation = useNavigation();
  navigation.setOptions({ headerShown: false });

  const { onLogout } = useContext(AuthContext);
  const params = useLocalSearchParams();

  const userMayoristaDetails = params?.userMayoristaDetails
    ? JSON.parse(params.userMayoristaDetails)
    : null;

  if (!userMayoristaDetails || !userMayoristaDetails.agenteVenta) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Detalles del agente no disponibles.",
    });
    return null;
  }

  const { agenteVenta } = userMayoristaDetails;

  // Función para manejar la solicitud de cambio de agente
  const handleSolicitarCambio = () => {
    Alert.alert(
      "Confirmar solicitud",
      "¿Está seguro de que desea solicitar el cambio de agente?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sí, estoy seguro",
          onPress: () => {
            Toast.show({
              type: "success",
              text1: "Solicitud enviada",
              text2: "La solicitud ha sido enviada exitosamente.",
            });
          },
        },
      ]
    );
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.profileHeader}>
          <Text style={styles.profileTitle}>Mi Agente de Ventas</Text>
        </View>

        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoLabel}>Nombre:</Text>
          <Text style={styles.userInfoText}>{agenteVenta.fullName}</Text>

          <Text style={styles.userInfoLabel}>Teléfono:</Text>
          <Text style={styles.userInfoText}>{agenteVenta.phoneNumber}</Text>

          <Text style={styles.userInfoLabel}>Email:</Text>
          <Text style={styles.userInfoText}>{agenteVenta.email}</Text>
        </View>

        {/* Botón para solicitar cambio de agente */}
        <View style={styles.buttonContainer}>
          <Button
            title="Solicitar cambio de agente"
            color="#FF5733" // Color del botón
            onPress={handleSolicitarCambio} // Acción al presionar el botón
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Agente;
