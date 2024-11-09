import React, { useState, useContext, useEffect } from "react";
import { Text, View, Button, Modal, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native"; // Importación añadida
import AuthContext from "@/context/Auth/AuthContext";
import { StyleSheet, TextInput } from "react-native";
import useCambioAgente from "@/hooks/useCambioAgente";
import { router, useLocalSearchParams } from "expo-router";
import { ActualizarSolicitudCambioAgenteDTO } from "@/dtos/cambioAgente";
import { Picker } from "@react-native-picker/picker";

const MotivoCambioModal = ({ modalVisible, setModalVisible, onSubmit }) => {
  const [motivo, setMotivo] = useState("");

  const isSubmitDisabled = motivo.trim() === ""; // Verificar si el motivo está vacío

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Motivo de rechazo</Text>
          <TextInput
            placeholder="Escriba el motivo de rechazo de la solicitud aquí"
            style={styles.input}
            value={motivo}
            onChangeText={setMotivo}
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
            <Text style={styles.submitButtonText}>Rechazar</Text>
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

const DetalleSolicitudCambioAgente = () => {
  const { session } = useContext(AuthContext);
  const params = useLocalSearchParams();
  const solicitud = params?.solicitud ? JSON.parse(params.solicitud) : null;

  const { actualizarSolicitudCambioAgente, agentesVentas, getAgentes } =
    useCambioAgente();

  const [selectedAgente, setSelectedAgente] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Definición del estado para el modal

  useEffect(() => {
    const fetchData = async () => {
      await getAgentes();
    };

    fetchData();
  }, []);

  const handleAceptar = async () => {
    if (selectedAgente === solicitud.idAgenteVentaActual) {
      Toast.show({
        type: "error",
        text1: "Error: Mismo agente",
        text2: "El agente nuevo no puede ser el mismo que el agente actual.",
      });
      return; // Detener ejecución si son iguales
    }

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

    const solicitudActualizada: ActualizarSolicitudCambioAgenteDTO = {
      id: solicitud.id,
      idMayorista: solicitud.idMayorista,
      estatus: "Aceptado",
      idAdministrador: session?.idUsuario,
      idAgenteActual: solicitud.idAgenteVentaActual,
      fechaRespuesta: fechaFormatoAPI,
      idAgenteNuevo: selectedAgente,
      motivoRechazo: null,
    };

    try {
      const updatedSolicitud = await actualizarSolicitudCambioAgente(
        solicitud.id,
        solicitudActualizada
      );

      if (updatedSolicitud) {
        Toast.show({
          type: "success",
          text1: "Solicitud aceptada",
          text2: "La solicitud ha sido aceptada con éxito.",
        });
        router.back();
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo aceptar la solicitud.",
      });
    }
  };

  const handleMotivoRechazo = () => {
    setModalVisible(true); // Mostrar el modal al presionar "Rechazar"
  };

  const handleRechazar = async (motivoRechazo: string) => {
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

    const solicitudActualizada: ActualizarSolicitudCambioAgenteDTO = {
      id: solicitud.id,
      idMayorista: solicitud.idMayorista,
      estatus: "Rechazada",
      idAdministrador: session?.idUsuario,
      idAgenteActual: solicitud.idAgenteVentaActual,
      fechaRespuesta: fechaFormatoAPI,
      idAgenteNuevo: selectedAgente,
      motivoRechazo: motivoRechazo,
    };

    try {
      const updatedSolicitud = await actualizarSolicitudCambioAgente(
        solicitud.id,
        solicitudActualizada
      );

      if (updatedSolicitud) {
        Toast.show({
          type: "success",
          text1: "Solicitud rechazada",
          text2: "La solicitud ha sido rechazada.",
        });
        router.back();
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo rechazar la solicitud.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalle de Solicitud</Text>
      <Text>Solicitante: {solicitud.nombreContacto}</Text>
      <Text>Agente Actual: {solicitud.agenteVentaActualNombre}</Text>
      <Text>Motivo: {solicitud.motivo}</Text>
      <Text>Estatus: {solicitud.estatus}</Text>

      <Button
        title={
          showPicker ? "Ocultar Selección" : "Seleccionar Agente (Opcional)"
        }
        onPress={() => setShowPicker(!showPicker)}
        color="#2196F3"
      />

      {showPicker && (
        <Picker
          selectedValue={selectedAgente}
          onValueChange={(itemValue) => setSelectedAgente(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccionar Agente" value={null} />
          {agentesVentas.map((agente) => (
            <Picker.Item
              key={agente.id}
              label={agente.fullName}
              value={agente.id}
            />
          ))}
        </Picker>
      )}

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Aceptar" onPress={handleAceptar} color="#4CAF50" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Rechazar"
            onPress={handleMotivoRechazo}
            color="#F44336"
          />
        </View>
      </View>

      <MotivoCambioModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onSubmit={handleRechazar} // Pasar el motivo al onSubmit
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F8F8",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  picker: {
    height: 50,
    width: "100%",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#2196F3",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#F44336",
    borderColor: "transparent",
    borderRadius: 5,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
  input: {
    height: 100,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    fontSize: 16,
    color: "#333333",
    backgroundColor: "#f9f9f9",
  },
  disabledButton: {
    backgroundColor: "lightgray", // Cambiar color cuando está deshabilitado
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default DetalleSolicitudCambioAgente;
