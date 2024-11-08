import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Button,
  TextInput,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import useSolicitudesAsistencias from "@/hooks/solicitudesAsistencias/useSolicitudesAsistencias";
import Toast from "react-native-toast-message";

const SolicitudAsistencia = () => {
  const {
    cambiarAgente,
    cancelarSolicitud,
    cancelarSolicitudAsistencia,
    solicitudAsistencia,
    getSolicitudAsistencia,
  } = useSolicitudesAsistencias();

  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const { solicitudId } = useLocalSearchParams();
  const [modalChangeAgentVisible, setModalChangeAgentVisible] = useState(false);

  const handleCambiarAgente = () => {
    // Lógica para manejar el motivo
    setModalChangeAgentVisible(true);
  };
  const confirmCambiarAgente = async (reason: string) => {
    const id = solicitudId;
    // Lógica para manejar el motivo
    setModalChangeAgentVisible(false);
    const res = await cambiarAgente({
      IdSolicitudAsistencia: Number(id),
      Mensaje: reason,
      Valoracion: 0,
    });

    if (res?.status == 200) {
      Toast.show({
        type: "success",
        text1: "Éxito! 🎉",
        text2: "Cambio de agente exitoso",
      });
      handleVolver();
    } else {
      Toast.show({
        type: "error",
        text1: "Error ❌",
        text2: "No se pudo valorar",
      });
    }
  };
  useEffect(() => {
    getSolicitudAsistencia(Number(solicitudId));
  }, []);

  const handleEliminarSolicitud = () => setModalVisible(true);

  const confirmEliminarSolicitud = async (descripcion: string) => {
    // Aquí iría la lógica para eliminar la solicitud
    await cancelarSolicitudAsistencia(Number(solicitudId), descripcion);
    setModalVisible(false);
    router.push("/solicitud-asistencia");
    Toast.show({
      type: "success",
      text1: "Éxito! 🎉",
      text2: "Solicitud de asistencia eliminada",
    });
  };

  const handleVolver = () => router.replace("/solicitud-asistencia");

  return (
    <ScrollView style={styles.card}>
      <ChangeAgentModal
        visible={modalChangeAgentVisible}
        onClose={() => setModalChangeAgentVisible(false)}
        onSubmit={confirmCambiarAgente}
      />
      <TouchableOpacity onPress={handleVolver} style={styles.backButton}>
        <Text style={styles.backButtonText}>⬅ Volver</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <Text style={styles.cardTitle}>Detalles de la Solicitud</Text>
      <View style={styles.separator} />
      {/* Información de la Solicitud */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos de la Asistencia</Text>
        <Text style={styles.cardText}>
          <Text>Descripción:</Text>{" "}
          {solicitudAsistencia?.solicitud.descripcion}
        </Text>
        <Text style={styles.cardText}>
          <Text>Fecha de Solicitud:</Text>{" "}
          {new Date(
            solicitudAsistencia?.solicitud.fechaSolicitud
          ).toLocaleString()}
        </Text>
        <Text style={styles.cardText}>
          <Text>Estatus:</Text>{" "}
          {solicitudAsistencia?.solicitud.estatus === 3 ? "Cerrada" : "Activa"}
        </Text>
      </View>

      {/* Información del Agente */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos del Agente</Text>
        <Text style={styles.cardText}>
          <Text>Nombre del Agente:</Text>{" "}
          {solicitudAsistencia?.solicitud.agenteVenta?.fullName}
        </Text>
        <Text style={styles.cardText}>
          <Text>Email del Agente:</Text>{" "}
          {solicitudAsistencia?.solicitud.agenteVenta?.email}
        </Text>
        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.changeAgentButton}
          onPress={handleCambiarAgente}
        >
          <Text style={styles.buttonText}>Cambiar de Agente</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      {/* Información de la Categoría */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos de la Categoría</Text>
        <Text style={styles.cardText}>
          <Text>Nombre de la Categoría:</Text>{" "}
          {solicitudAsistencia?.solicitud.categoriaAsistencia?.nombre}
        </Text>
        <Text style={styles.cardText}>
          <Text>Estatus:</Text>{" "}
          {solicitudAsistencia?.solicitud.categoriaAsistencia?.estatus
            ? "Activa"
            : "Inactiva"}
        </Text>
      </View>
      <View style={styles.separator} />
      {/* Seguimientos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Seguimientos</Text>
        <FlatList
          data={solicitudAsistencia?.solicitud.seguimientosSolicitudAsistencia}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>
                <Text>Descripción:</Text> {item.descripcion}
              </Text>
              <Text style={styles.cardText}>
                <Text>Fecha de Seguimiento:</Text>{" "}
                {new Date(item.fechaSeguimiento).toLocaleString()}
              </Text>
              <Text style={styles.cardText}>
                <Text>Mensaje:</Text> {item.mensaje}
              </Text>
            </View>
          )}
        />
      </View>
      <View style={styles.separator} />
      {/* Botón de eliminación */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleEliminarSolicitud}
      >
        <Text style={styles.buttonText}>Eliminar Solicitud</Text>
      </TouchableOpacity>

      <EliminarSolicitudModal
        modalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        onConfirmDelete={confirmEliminarSolicitud}
        solicitudId={Number(solicitudId)}
      />
    </ScrollView>
  );
};

const ChangeAgentModal = ({ visible, onClose, onSubmit }) => {
  const [reason, setReason] = useState("");

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Motivo para cambiar de agente</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe el motivo aquí"
            value={reason}
            onChangeText={setReason}
          />
          <View style={styles.buttonContainer}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={[
                styles.confirmButton,
                reason === "" && styles.disabledButton, // Aplica estilo de deshabilitado
              ]}
              onPress={() => onSubmit(reason)}
              disabled={reason == ""}
            >
              <Text style={styles.buttonTextModal}>Cambiar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Otros componentes (EliminarSolicitudModal)
interface EliminarSolicitudModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onConfirmDelete: (descripcion: string) => void;
  solicitudId: number;
}

const EliminarSolicitudModal: React.FC<EliminarSolicitudModalProps> = ({
  modalVisible,
  setModalVisible,
  onConfirmDelete,
  solicitudId,
}) => {
  const [motivo, setMotivo] = React.useState("");

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Eliminar Solicitud</Text>
          <Text style={styles.modalText}>
            ¿Estás seguro de que deseas eliminar la solicitud con ID:{" "}
            {solicitudId}?
          </Text>
          <Text style={styles.modalText}>
            Esta acción no se puede deshacer.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Motivo de eliminación"
            value={motivo}
            onChangeText={setMotivo}
          />
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={[
                styles.confirmButton,
                motivo === "" && styles.disabledButton, // Aplica estilo de deshabilitado
              ]}
              onPress={() => {
                onConfirmDelete(motivo); // Llama a la función con el motivo
                setModalVisible(false);
              }}
              disabled={motivo == ""}
            >
              <Text style={styles.buttonTextModal}>Eliminar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff", // Fondo blanco para la tarjeta
    borderRadius: 10, // Bordes redondeados
    padding: 15, // Espaciado interno
    marginVertical: 10, // Espaciado vertical con otros elementos
    marginHorizontal: 20, // Espaciado lateral
    shadowColor: "#000", // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.25, // Opacidad de la sombra
    shadowRadius: 4, // Difuminado de la sombra
    elevation: 5, // Elevación para sombra en Android
    borderWidth: 1, // Borde visible
    borderColor: "#ddd", // Color del borde
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    marginVertical: 5,
  },
  section: {
    marginVertical: 10,
  },
  deleteButton: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  changeAgentButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },

  backButton: {
    backgroundColor: "#f0f0f0", // Fondo claro para un aspecto suave
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "flex-start", // Alineación opcional a la izquierda
    marginVertical: 10,
  },
  backButtonText: {
    color: "#333", // Color de texto oscuro para buen contraste
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  separator: {
    height: 1, // Altura de la línea
    backgroundColor: "#ccc", // Color de la línea
    marginVertical: 10, // Espaciado vertical
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#6c757d", // Color gris para cancelar
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  confirmButton: {
    backgroundColor: "#d9534f", // Color rojo para eliminar
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonTextModal: {
    color: "#fff",
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc", // Color gris claro para indicar deshabilitado
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
});

export default SolicitudAsistencia;
