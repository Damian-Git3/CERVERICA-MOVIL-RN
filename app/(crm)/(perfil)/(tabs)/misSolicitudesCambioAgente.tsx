import { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  Button,
  ActivityIndicator, // Indicador de carga
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import styles from "./perfilStyle";
import AuthContext from "@/context/Auth/AuthContext";
import { useLocalSearchParams, useNavigation } from "expo-router";
import useCambioAgente from "@/hooks/useCambioAgente";
import Timeline from "react-native-timeline-flatlist";

const MisSolicitudesCambioAgente = () => {
  const navigation = useNavigation();
  navigation.setOptions({ headerShown: false });
  const { onLogout, session } = useContext(AuthContext);

  const { getSolicitudesCliente, solicitudesClienteCambioAgente } =
    useCambioAgente();

  const params = useLocalSearchParams();
  const userMayoristaDetails = params?.userMayoristaDetails
    ? JSON.parse(params.userMayoristaDetails)
    : null;

  const [modalVisible, setModalVisible] = useState(false);
  const [timelineData, setTimelineData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para el indicador de carga

  useEffect(() => {
    const fetchSolicitudes = async () => {
      if (userMayoristaDetails) {
        try {
          await getSolicitudesCliente(userMayoristaDetails.idMayorista);

          console.log("ASMFASMFP");
          if (solicitudesClienteCambioAgente) {
            const formattedData = solicitudesClienteCambioAgente.map(
              (solicitud) => ({
                title: "Solicitud de cambio de agente",
                description: solicitud.motivo,
                lineColor: "#009688",
                status: solicitud.estatus,
                fechaSolicitud: new Date(
                  solicitud.fechaSolicitud
                ).toLocaleString(),
                fechaRespuesta: new Date(
                  solicitud.fechaRespuesta
                ).toLocaleString(),
                agenteVenta: solicitud.agenteVentaActualNombre,
                nuevoAgente: solicitud.agenteVentaNuevoNombre,
                motivoRechazo: solicitud.motivoRechazo,
              })
            );

            setTimelineData(formattedData);
          }
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "No se pudieron cargar las solicitudes.",
          });
        } finally {
          setIsLoading(false); // Termina la carga
        }
      }
    };

    fetchSolicitudes();
  }, [userMayoristaDetails, getSolicitudesCliente]);
  //}, [userMayoristaDetails, getSolicitudesCliente]);

  if (isLoading) {
    // Muestra un indicador de carga mientras se obtienen los datos
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

  const convertAndFormatDate = (dateString) => {
    // Dividir la fecha y la hora
    const [datePart, timePart] = dateString.split(", ");

    // Dividir la fecha en componentes
    const [day, month, year] = datePart.split("/").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);

    // Crear un nuevo objeto Date
    const date = new Date(year, month - 1, day, hour, minute, second); // month - 1 porque los meses son indexados desde 0

    // Verificar si la fecha es válida
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
      hour12: true, // Cambiar a true para A.M./P.M.
    };

    const formattedDate = date.toLocaleString("es-ES", options);
    const [dateFormatted, timeFormatted] = formattedDate.split(", ");

    // Reemplazar el formato de hora para incluir A.M. o P.M.
    const [time, period] = timeFormatted.split(" ");
    return `${dateFormatted} a las ${time} ${period}`;
  };

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
            Fecha de solicitud: {convertAndFormatDate(item.fechaSolicitud)}
          </Text>

          {item.status === "Aceptado" && (
            <>
              <Text style={{ color: "#4CAF50" }}>Estado: Aceptada</Text>
              <Text>Nuevo Agente: {item.nuevoAgente}</Text>
              <Text>
                Fecha de respuesta: {convertAndFormatDate(item.fechaRespuesta)}
              </Text>
            </>
          )}

          {item.status === "Rechazada" && (
            <>
              <Text style={{ color: "#F44336" }}>Estado: Rechazada</Text>
              <Text>
                Fecha de respuesta: {convertAndFormatDate(item.fechaRespuesta)}
              </Text>
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
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.profileHeader}>
          <Text style={styles.profileTitle}>
            Mi Solicitudes de Cambio de Agente de Ventas
          </Text>
        </View>

        {/* Renderizar el Timeline con los datos formateados */}
        <Timeline data={timelineData} renderDetail={renderTimelineItem} />
      </SafeAreaView>
    </ScrollView>
  );
};

export default MisSolicitudesCambioAgente;
