import { useState, useContext, useEffect } from "react";
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
import { router, useLocalSearchParams } from "expo-router";
import useCambioAgente from "@/hooks/useCambioAgente";
import { SolicitudCambioAgenteDTO } from "../../../../dtos/cambioAgente";

const MotivoCambioModal = ({ modalVisible, setModalVisible, onSubmit }) => {
  const [motivo, setMotivo] = useState("");

  const isSubmitDisabled = motivo.trim() === ""; // Verificar si el motivo está vacío

  const handleTextChange = (text) => {
    const filteredText = text.replace(/[^a-zA-ZÀ-ÿ0-9.,\s]/g, '');
    setMotivo(filteredText);
  };

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
            onChangeText={handleTextChange}
            multiline={true}
            numberOfLines={4}
          />

          {isSubmitDisabled && (
            <Text style={styles.errorText}>Este campo es obligatorio.</Text> // Mensaje de error opcional
          )}

          <TouchableOpacity
            onPress={() => {
              onSubmit(motivo);
              setModalVisible(false);
            }}
            style={[
              styles.submitButton,
              isSubmitDisabled && styles.disabledButton,
            ]} // Estilo para el botón deshabilitado
            disabled={isSubmitDisabled} // Deshabilitar el botón si motivo está vacío
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
  const { onLogout, session } = useContext(AuthContext);

  const {
    solicitarCambioAgente,
    getUltimaSolicitud,
    ultimaSolicitudClienteCambioAgente,
    getSolicitudesCliente,
    solicitudesClienteCambioAgente,
  } = useCambioAgente();

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
    const fechaSolicitud = new Date();

    // Obtener componentes de la fecha
    const year = fechaSolicitud.getFullYear();
    const month = String(fechaSolicitud.getMonth() + 1).padStart(2, "0"); // Mes comienza en 0
    const day = String(fechaSolicitud.getDate()).padStart(2, "0");
    const hours = String(fechaSolicitud.getHours()).padStart(2, "0");
    const minutes = String(fechaSolicitud.getMinutes()).padStart(2, "0");
    const seconds = String(fechaSolicitud.getSeconds()).padStart(2, "0");
    const milliseconds = String(fechaSolicitud.getMilliseconds()).padStart(
      3,
      "0"
    );

    // Formatear como cadena ISO
    const fechaFormatoAPI = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

    const solicitudData: SolicitudCambioAgenteDTO = {
      idAgenteVentaActual: agenteVenta.id,
      motivo: motivo,
      solicitante: 1,
      idMayorista: userMayoristaDetails.idMayorista,
      fechaSolicitud: fechaFormatoAPI,
    };

    const response = await solicitarCambioAgente(solicitudData);
    if (response) {
      Toast.show({
        type: "success",
        text1: "Solicitud enviada",
        text2: `Motivo: ${motivo}`,
      });

      await getSolicitudesCliente(userMayoristaDetails.idMayorista);
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo enviar la solicitud.",
      });
    }
  };

  useEffect(() => {
    const fetchSolicitudes = async () => {
      if (userMayoristaDetails) {
        try {
          await getSolicitudesCliente(userMayoristaDetails.idMayorista);
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "No se pudieron cargar las solicitud.",
          });
        }
      }
    };

    fetchSolicitudes();
  }, []);

  const handleVerSolicitudes = () => {
    if (userMayoristaDetails) {
      router.push({
        pathname: "/(perfil)/(tabs)/misSolicitudesCambioAgente",
        params: { userMayoristaDetails: JSON.stringify(userMayoristaDetails) },
      });
    } else {
      Toast.show({
        type: "error",
        text1: "No se puede acceder al agente de ventas",
        text2: "Detalles de usuario mayorista no disponibles.",
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
          {(solicitudesClienteCambioAgente.length === 0 ||
            solicitudesClienteCambioAgente[
              solicitudesClienteCambioAgente.length - 1
            ].estatus !== "Pendiente") && (
            <Button
              title="Solicitar cambio de agente"
              color="#2196F3"
              onPress={handleSolicitarCambio}
            />
          )}
        </View>

        <View style={[styles.buttonContainer, { marginTop: 10 }]}>
          <Button
            title="Mis Solicitudes"
            color="#2196F3"
            onPress={handleVerSolicitudes}
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
