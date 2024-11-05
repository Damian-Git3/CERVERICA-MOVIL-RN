import React, { useCallback } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "expo-router";
import useConfiguracionesGenerales from "@/hooks/useConfiguracionesGenerales";
import { images } from "@/constants";

const ConfiguracionesGenerales = () => {
  const navigation = useNavigation();
  const { cargando, configuracionesGenerales, getConfiguracionesGenerales } =
    useConfiguracionesGenerales();

  useFocusEffect(
    useCallback(() => {
      const fetchConfiguracion = async () => {
        await getConfiguracionesGenerales();
      };

      fetchConfiguracion();
    }, [])
  );

  const handleButtonClick = () => {
    if (configuracionesGenerales) {
      navigation.navigate("formularioConfiguracionesGenerales", {
        configuracionesGenerales,
      });
    } else {
      navigation.navigate("formularioConfiguracionesGenerales");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuraciones Generales</Text>
      {cargando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : configuracionesGenerales ? (
        <View style={styles.details}>
          <Text style={styles.text}>
            <Text style={styles.label}>Mínimo Compra Envío Gratis:</Text>{" "}
            {configuracionesGenerales.minimoCompraEnvioGratis} MXN
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Promociones Automáticas:</Text>{" "}
            {configuracionesGenerales.promocionesAutomaticas ? "Sí" : "No"}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Notificación Promociones WhatsApp:</Text>{" "}
            {configuracionesGenerales.notificacionPromocionesWhatsApp
              ? "Sí"
              : "No"}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Notificación Promociones Email:</Text>{" "}
            {configuracionesGenerales.notificacionPromocionesEmail
              ? "Sí"
              : "No"}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>
              Tiempo Recordatorio Carrito Abandonado:
            </Text>{" "}
            {configuracionesGenerales.tiempoRecordatorioCarritoAbandonado}{" "}
            minutos
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>
              Tiempo Recordatorio Recomendación Última Compra:
            </Text>{" "}
            {
              configuracionesGenerales.tiempoRecordatorioRecomendacionUltimaCompra
            }{" "}
            minutos
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Fecha de Modificación:</Text>{" "}
            {new Date(
              configuracionesGenerales.fechaModificacion
            ).toLocaleDateString()}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>
              Frecuencia Reclasificación Clientes:
            </Text>{" "}
            {configuracionesGenerales.frecuenciaReclasificacionClientes} días
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>
              Frecuencia Mínima Mensual Cliente Frecuente:
            </Text>{" "}
            {configuracionesGenerales.frecuenciaMinimaMensualClienteFrecuente}{" "}
            meses
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>
              Tiempo Sin Compras Cliente Inactivo:
            </Text>{" "}
            {configuracionesGenerales.tiempoSinComprasClienteInactivo} días
          </Text>
          <Button
            title="Actualizar la Configuración"
            onPress={handleButtonClick}
          />
        </View>
      ) : (
        <>
          <View style={styles.containerDatos}>
            <Image
              source={images.noResult}
              className="w-40 h-40"
              alt="No se encontraron datos"
              resizeMode="contain"
            />
            <Text className="text-center">
              No exista la configuración general
            </Text>
          </View>

          <Button title="Registrar Configuración" onPress={handleButtonClick} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerDatos: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  details: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
});

export default ConfiguracionesGenerales;
