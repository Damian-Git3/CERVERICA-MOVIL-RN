import React, { useEffect, useContext, useState, useCallback } from "react";
import { Text, View, Button, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import AuthContext from "@/context/Auth/AuthContext";
import { StyleSheet } from "react-native";
import useCambioAgente from "@/hooks/useCambioAgente";
import { router, useFocusEffect } from "expo-router";

const SolicitudesCambioAgente = () => {
  const { session } = useContext(AuthContext);
  const { getSolicitudes, solicitudesCambioAgente, cargando } =
    useCambioAgente();

  // Para manejar el mensaje de no coincidencias
  const [noSolicitudes, setNoSolicitudes] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await getSolicitudes();

        // Verifica si hay solicitudes
        console.log(solicitudesCambioAgente);
        if (solicitudesCambioAgente.length === 0) {
          setNoSolicitudes(true); // Cambia el estado si no hay solicitudes
        } else {
          setNoSolicitudes(false); // Resetea el estado si hay solicitudes
        }
      };
      fetchData();
    }, [solicitudesCambioAgente]) // Dependencia de solicitudesCambioAgente
  );

  const handleVerSolicitudes = (solicitud) => {
    if (solicitud) {
      router.push({
        pathname: "/(admin)/detalleSolicitudCambioAgente",
        params: { solicitud: JSON.stringify(solicitud) },
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error al acceder a los detalles",
        text2: "No se pudo acceder a la información del usuario.",
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Solicitudes de Cambio de Agente</Text>
        {cargando && <Text>Cargando solicitudes...</Text>}
        {noSolicitudes ? (
          <Text>No se encontraron solicitudes de cambio de agente.</Text> // Mensaje cuando no hay solicitudes
        ) : (
          solicitudesCambioAgente.map((solicitud) => (
            <View key={solicitud.id} style={styles.solicitudContainer}>
              <Text>Solicitante: {solicitud.nombreContacto}</Text>
              <Text>Agente a cambiar: {solicitud.agenteVentaActualNombre}</Text>
              <Text>Motivo: {solicitud.motivo}</Text>
              <Text>Estatus: {solicitud.estatus}</Text>

              <Button
                title="Ver Solicitud"
                onPress={() => handleVerSolicitudes(solicitud)}
                color="#2196F3"
              />
            </View>
          ))
        )}
      </View>
    </ScrollView>
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
  solicitudContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default SolicitudesCambioAgente;
