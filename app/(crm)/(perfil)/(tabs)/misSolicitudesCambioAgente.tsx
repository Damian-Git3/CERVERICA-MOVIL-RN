import { useState, useContext, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import styles from "./perfilStyle";
import AuthContext from "@/context/Auth/AuthContext";
import { useLocalSearchParams } from "expo-router";
import useCambioAgente from "@/hooks/useCambioAgente";
import Timeline from "react-native-timeline-flatlist";

const MisSolicitudesCambioAgente = () => {
  const { onLogout, session } = useContext(AuthContext);

  const { getSolicitudesCliente, solicitudesClienteCambioAgente } =
    useCambioAgente();

  const params = useLocalSearchParams();
  const userMayoristaDetails = params?.userMayoristaDetails
    ? JSON.parse(params.userMayoristaDetails)
    : null;

  const [modalVisible, setModalVisible] = useState(false);
  const [timelineData, setTimelineData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let formattedData = null;

  // Define the convertAndFormatDate function before using it
  const convertAndFormatDate = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      console.error("Fecha inválida:", dateString);
      return "Fecha inválida";
    }

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return date.toLocaleString("es-ES", options);
  };

  useEffect(() => {
    formattedData = solicitudesClienteCambioAgente.map((solicitud) => ({
      title: "Solicitud de cambio de agente",
      description: solicitud.motivo,
      lineColor: "#009688",
      status: solicitud.estatus,
      fechaSolicitud: solicitud.fechaSolicitud
        ? convertAndFormatDate(solicitud.fechaSolicitud)
        : "Fecha no disponible",
      fechaRespuesta: solicitud.fechaRespuesta
        ? convertAndFormatDate(solicitud.fechaRespuesta)
        : "Fecha no disponible",
      agenteVenta: solicitud.agenteVentaActualNombre,
      nuevoAgente: solicitud.agenteVentaNuevoNombre,
      motivoRechazo: solicitud.motivoRechazo,
    }));

    setTimelineData(formattedData);
  }, [solicitudesClienteCambioAgente]);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      if (userMayoristaDetails) {
        try {
          await getSolicitudesCliente(userMayoristaDetails.idMayorista);
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "No se pudieron cargar las solicitudes.",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchSolicitudes();
  }, []);

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#2196F3" />
        <Text>Cargando solicitudes...</Text>
      </View>
    );
  }

  if (!userMayoristaDetails || !userMayoristaDetails.agenteVenta) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Detalles del agente no disponibles.",
    });
    return null;
  }

  const renderTimelineItem = (item) => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          backgroundColor: "white",
          borderRadius: 10,
          padding: 10,
          borderColor:
            item.status === "Aceptado"
              ? "#4CAF50"
              : item.status === "Rechazado"
              ? "#F44336"
              : item.status === "Pendiente"
              ? "#ed9224"
              : "#000",
          borderWidth: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
          <Text>Agente a cambiar: {item.agenteVenta}</Text>
          <Text>Motivo del cambio: {item.description}</Text>
          <Text style={{ fontStyle: "italic" }}>
            Fecha de solicitud: {item.fechaSolicitud}
          </Text>

          {item.status === "Aceptado" && (
            <>
              <Text style={{ color: "#4CAF50" }}>Estado: Aceptada</Text>
              <Text>Nuevo Agente: {item.nuevoAgente}</Text>
              <Text>Fecha de respuesta: {item.fechaRespuesta}</Text>
            </>
          )}

          {item.status === "Rechazada" && (
            <>
              <Text style={{ color: "#F44336" }}>Estado: Rechazada</Text>
              <Text>Fecha de respuesta: {item.fechaRespuesta}</Text>
              <Text>Motivo del rechazo: {item?.motivoRechazo}</Text>
            </>
          )}

          {item.status === "Pendiente" && (
            <Text style={{ color: "#ed9224" }}>Estado: Pendiente</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileTitle}>
          Mis Solicitudes de Cambio de Agente de Ventas
        </Text>
      </View>

      <Timeline data={timelineData} renderDetail={renderTimelineItem} />
    </SafeAreaView>
  );
};

export default MisSolicitudesCambioAgente;
