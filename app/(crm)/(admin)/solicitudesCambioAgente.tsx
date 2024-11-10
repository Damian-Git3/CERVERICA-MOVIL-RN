import React, { useEffect, useContext, useState, useCallback } from "react";
import { images } from "@/constants";
import { Text, View, Button, ScrollView, Image } from "react-native";
import Toast from "react-native-toast-message";
import AuthContext from "@/context/Auth/AuthContext";
import { StyleSheet } from "react-native";
import useCambioAgente from "@/hooks/useCambioAgente";
import { router, useFocusEffect } from "expo-router";

const SolicitudesCambioAgente = () => {
  const { session } = useContext(AuthContext);
  const { getSolicitudes, solicitudesCambioAgente, cargando } =
    useCambioAgente();
  const [noSolicitudes, setNoSolicitudes] = useState(false);

  // Usar useFocusEffect para ejecutar la función cuando el componente se enfoque
  useFocusEffect(
    useCallback(() => {
      const fetchSolicitudes = async () => {
        await getSolicitudes();
      };

      fetchSolicitudes();
    }, [])
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
          <View style={styles.containerDatos}>
            <Image
              source={images.noResult}
              className="w-40 h-40"
              alt="No se encontraron solicitudes de mayoristas"
              resizeMode="contain"
            />
            <Text className="text-center">
              No se encontraron solicitudes de cambio de agente
            </Text>
          </View>
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
  containerDatos: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
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
    width: "100%",
  },
});

export default SolicitudesCambioAgente;
