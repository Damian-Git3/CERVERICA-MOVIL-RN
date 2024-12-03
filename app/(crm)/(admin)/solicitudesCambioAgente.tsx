import React, { useEffect, useContext, useState, useCallback } from "react";
import { images } from "@/constants";
import { Text, View, Button, ScrollView, Image, TextInput } from "react-native";
import Toast from "react-native-toast-message";
import AuthContext from "@/context/Auth/AuthContext";
import { StyleSheet } from "react-native";
import useCambioAgente from "@/hooks/useCambioAgente";
import { router, useFocusEffect } from "expo-router";

const SolicitudesCambioAgente = () => {
  const { session } = useContext(AuthContext);
  const { getSolicitudes, solicitudesCambioAgente, cargando } = useCambioAgente();
  const [noSolicitudes, setNoSolicitudes] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredSolicitudes, setFilteredSolicitudes] = useState(solicitudesCambioAgente);

  // Usar useFocusEffect para ejecutar la función cuando el componente se enfoque
  useFocusEffect(
    useCallback(() => {
      const fetchSolicitudes = async () => {
        await getSolicitudes();
      };

      fetchSolicitudes();
    }, [])
  );

  // Filtrar solicitudes en función del término de búsqueda
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredSolicitudes(solicitudesCambioAgente);
    } else {
      const filtered = solicitudesCambioAgente.filter((solicitud) =>
        solicitud.nombreContacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        solicitud.agenteVentaActualNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        solicitud.motivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        solicitud.estatus.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSolicitudes(filtered);
    }
  }, [searchTerm, solicitudesCambioAgente]);

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

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Solicitudes de Cambio de Agente</Text>
        
        {/* Campo de búsqueda */}
        <TextInput
          style={styles.input}
          placeholder="Buscar"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />

        {cargando && <Text>Cargando solicitudes...</Text>}
        {noSolicitudes ? (
          <View style={styles.containerDatos}>
            <Image
              source={images.noResult}
              style={{ width: 160, height: 160 }}
              resizeMode="contain"
            />
            <Text>No se encontraron solicitudes de cambio de agente</Text>
          </View>
        ) : (
          filteredSolicitudes.length > 0 ? (
            filteredSolicitudes.map((solicitud) => (
              <View key={solicitud.id} style={styles.solicitudContainer}>
                <Text>Solicitante: {solicitud.nombreContacto}</Text>
                <Text>Agente a cambiar: {solicitud.agenteVentaActualNombre}</Text>
                <Text>Motivo: {solicitud.motivo}</Text>
                <Text>Fecha solicitud: {convertAndFormatDate(solicitud.fechaSolicitud)}</Text>
                <Text>Estatus: {solicitud.estatus}</Text>

                <Button
                  title="Ver Solicitud"
                  onPress={() => handleVerSolicitudes(solicitud)}
                  color="#2196F3"
                />
              </View>
            ))
          ) : (
            <View style={styles.containerDatos}>
              <Text>No se encontraron resultados para tu búsqueda.</Text>
            </View>
          )
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
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#fff"
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
