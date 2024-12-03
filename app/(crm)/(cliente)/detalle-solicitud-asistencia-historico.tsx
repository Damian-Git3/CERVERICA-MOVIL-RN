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
  TextInput,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import useSolicitudesAsistencias from "@/hooks/solicitudesAsistencias/useSolicitudesAsistencias";

const DetalleSolicitudAsistenciaHistorico = () => {
  const { solicitudAsistencia, getSolicitudAsistencia, cargando } =
    useSolicitudesAsistencias();

  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const { solicitudId } = useLocalSearchParams();

  useEffect(() => {
    getSolicitudAsistencia(Number(solicitudId));
  }, []);

  const handleVolver = () => {
    console.log(solicitudAsistencia);
    router.push({
      pathname: "/solicitud-asistencia",
      params: { solicitudId: solicitudId },
    });
  };

  const handleEvaluar = () => {
    router.push({
      pathname: "/valorar-solicitud",
      params: { solicitudId: solicitudId },
    });
  };

  return (
    <ScrollView style={styles.card}>
      <TouchableOpacity onPress={handleVolver} style={styles.backButton}>
        <Text style={styles.backButtonText}>⬅ Volver</Text>
      </TouchableOpacity>
      <Text style={styles.cardTitle}>Detalles de la Asistencia</Text>

      {/* Información de la Solicitud */}
      <View style={styles.section}>
        <Text style={styles.cardText}>
          <Text>Descripción:</Text> {solicitudAsistencia?.solicitud.descripcion}
        </Text>
        <Text style={styles.cardText}>
          <Text>Fecha de Solicitud:</Text>{" "}
          {new Date(
            solicitudAsistencia?.solicitud.fechaSolicitud
          ).toLocaleString()}
        </Text>
        <Text style={styles.cardText}>
          <Text>Estatus:</Text> Cerrada
        </Text>
      </View>

      {/* Calificación o botón de evaluación */}
      <View style={styles.section}>
        {solicitudAsistencia?.solicitud.valoracion != null ? (
          <View>
            <Text style={styles.cardText}>
              <Text>Calificación:</Text>{" "}
              {"★".repeat(solicitudAsistencia?.solicitud.valoracion) +
                "☆".repeat(10 - solicitudAsistencia?.solicitud.valoracion)}
            </Text>
            <Text>
              <Text>Motivo:</Text>{" "}
              {solicitudAsistencia?.solicitud.mensajeValoracion}
            </Text>
          </View>
        ) : (
          <TouchableOpacity onPress={handleEvaluar} style={styles.evalButton}>
            <Text style={styles.buttonText}>Evaluar Solicitud</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Detalles de la Categoría */}
      <View style={styles.section}>
        <Text style={styles.cardTitle}>Categoría</Text>
        <Text style={styles.cardText}>
          <Text>Categoría:</Text>{" "}
          {solicitudAsistencia?.solicitud.categoriaAsistencia?.nombre}
        </Text>
        <Text style={styles.cardText}>
          <Text>Estatus de Categoría:</Text>{" "}
          {solicitudAsistencia?.solicitud.categoriaAsistencia?.estatus
            ? "Activa"
            : "Inactiva"}
        </Text>
      </View>

      {/* Información del Agente de Venta */}
      <View style={styles.section}>
        <Text style={styles.cardTitle}>Agente</Text>
        <Text style={styles.cardText}>
          <Text>Agente:</Text>{" "}
          {solicitudAsistencia?.solicitud.agenteVenta?.fullName}
        </Text>
        <Text style={styles.cardText}>
          <Text>Email:</Text>{" "}
          {solicitudAsistencia?.solicitud.agenteVenta?.email}
        </Text>
        <Text style={styles.cardText}>
          <Text>Activo:</Text>{" "}
          {solicitudAsistencia?.solicitud.agenteVenta?.activo ? "Sí" : "No"}
        </Text>
        <Text style={styles.cardText}>
          <Text>Fecha de Registro:</Text>{" "}
          {new Date(
            solicitudAsistencia?.solicitud.agenteVenta?.fechaRegistro
          ).toLocaleString()}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  evalButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
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
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  separator: {
    height: 1, // Altura de la línea
    backgroundColor: "#ccc", // Color de la línea
    marginVertical: 10, // Espaciado vertical
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
});

export default DetalleSolicitudAsistenciaHistorico;
