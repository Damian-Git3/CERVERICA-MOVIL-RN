import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  Dimensions,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import AuthContext from "@/context/Auth/AuthContext";
import Toast from "react-native-toast-message";
import useSolicitudesAsistencias from "@/hooks/solicitudesAsistencias/useSolicitudesAsistencias";

const ValorarSolicitud = () => {
  const { session } = useContext(AuthContext);
  const router = useRouter();
  const { solicitudId } = useLocalSearchParams();

  const { valorarSolicitudAsistencia } = useSolicitudesAsistencias();

  const [mensaje, setMensaje] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [puntaje, setPuntaje] = useState(0);

  const formValido = puntaje > 0 && mensaje.trim().length > 0;

  const handleVolver = () => {
    router.push("/solicitud-asistencia");
  };

  const handleConfirmSubmit = async () => {
    if (formValido) {
      const res = await valorarSolicitudAsistencia({
        IdSolicitudAsistencia: Number(solicitudId),
        Mensaje: mensaje,
        Valoracion: puntaje,
      });

      setModalVisible(false);

      if (res?.status == 200) {
        Toast.show({
          type: "success",
          text1: "Éxito! 🎉",
          text2: "Valoración añadida",
        });
        handleVolver();
      } else {
        Toast.show({
          type: "error",
          text1: "Error ❌",
          text2: "No se pudo valorar",
        });
      }
    } else {
      Toast.show({
        type: "info",
        text1: "Formulario incompleto!",
        text2: "Por favor ingresa un puntaje y un mensaje.",
      });
    }
  };

  // Función para renderizar las estrellas
  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(
        <TouchableOpacity style={[styles.star]}>
          <Text
            key={i}
            onPress={() => {
              setPuntaje(i);
              console.log(i);
            }}
            style={[
              styles.starText,
              i <= puntaje ? styles.filledStar : styles.emptyStar,
            ]}
          >
            ★
          </Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Botón de Volver */}
        <TouchableOpacity onPress={handleVolver} style={styles.backButton}>
          <Text style={styles.backButtonText}>⬅ Volver</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Valoración de Asistencia</Text>

        {/* campo de puntaje */}
        <View style={styles.field}>
          <Text style={styles.label}>Puntaje</Text>
          <View style={styles.starsContainer}>{renderStars()}</View>
        </View>

        {/* Campo de Mensaje */}
        <View style={styles.field}>
          <Text style={styles.label}>Mensaje</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            value={mensaje}
            onChangeText={setMensaje}
            placeholder="Describe tu experiencia"
          />
        </View>

        {/* Botón de Envío */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[
            styles.submitButton,
            !formValido && { backgroundColor: "#d3d3d3" }, // Estilo deshabilitado
          ]}
          disabled={!formValido}
        >
          <Text style={styles.buttonText}>Enviar Valoración</Text>
        </TouchableOpacity>

        {/* Modal de Confirmación */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirmar Envío</Text>
              <Text>¿Estás seguro de que deseas enviar esta valoración?</Text>
              <View style={styles.modalActions}>
                <Button
                  title="Cancelar"
                  onPress={() => setModalVisible(false)}
                />
                <Button
                  title="Confirmar"
                  onPress={handleConfirmSubmit}
                  color="#28a745"
                />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 16,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 15,
  },
  star: {
    marginHorizontal: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStar: {
    color: "#ddd",
  },
  filledStar: {
    color: "#ffcc00",
  },
  starText: {
    fontSize: 40,
  },
  textArea: {
    height: 100,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  backButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "flex-start",
    marginVertical: 10,
  },
  backButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ValorarSolicitud;
