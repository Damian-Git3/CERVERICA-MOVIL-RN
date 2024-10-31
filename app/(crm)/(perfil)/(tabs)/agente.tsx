import { useState, useContext } from "react";
import {
  Text,
  View,
  Button,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import styles from "./perfilStyle";
import { ScrollView } from "react-native-gesture-handler";
import AuthContext from "@/context/Auth/AuthContext";
import { useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";
import { SolicitudCambioAgenteDTO } from "@/dtos/cambioAgente";

const MotivoCambioModal = ({ modalVisible, setModalVisible, onSubmit }) => {
  const [motivo, setMotivo] = useState("");

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Motivo de cambio</Text>
          <TextInput
            placeholder="Escriba el motivo aquí"
            style={styles.input}
            value={motivo}
            onChangeText={setMotivo}
            multiline={true}
            numberOfLines={4}
          />

          <TouchableOpacity
            onPress={() => {
              onSubmit(motivo);
              setModalVisible(false);
            }}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Agente = () => {
  const navigation = useNavigation();
  navigation.setOptions({ headerShown: false });

  const { onLogout, session } = useContext(AuthContext);

  const params = useLocalSearchParams();
  const userMayoristaDetails = params?.userMayoristaDetails
    ? JSON.parse(params.userMayoristaDetails)
    : null;
  const [modalVisible, setModalVisible] = useState(false);

  if (!userMayoristaDetails || !userMayoristaDetails.agenteVenta) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Detalles del agente no disponibles.",
    });
    return null;
  }

  const { agenteVenta } = userMayoristaDetails;

  const handleSolicitarCambio = () => {
    setModalVisible(true);
  };

  const handleMotivoSubmit = async (motivo) => {
    const rolSolicitante =
      session?.rol === "cliente"
        ? 1
        : session?.rol === "agente"
        ? 2
        : session?.rol === "admin"
        ? 3
        : null;

    const solicitudData: SolicitudCambioAgenteDTO = {
      idAgenteVentaActual: agenteVenta.id,
      motivo: motivo,
      solicitante: rolSolicitante,
      idMayorista: userMayoristaDetails.id,
    };

    console.log(solicitudData);
    try {
      const response = await axios.post(
        `/ClienteMayorista/solicitud-cambio-agente`,
        solicitudData
      );
      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: "Solicitud enviada",
          text2: `Motivo: ${motivo}`,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "No se pudo enviar la solicitud.",
        });
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Ocurrió un error al enviar la solicitud.",
      });
    }
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

        <View style={styles.buttonContainer}>
          <Button
            title="Solicitar cambio de agente"
            color="#2196F3"
            onPress={handleSolicitarCambio}
          />
        </View>

        <MotivoCambioModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onSubmit={handleMotivoSubmit}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Agente;
