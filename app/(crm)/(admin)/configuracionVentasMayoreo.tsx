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
import useConfiguracionVentasMayoreo from "@/hooks/useConfiguracionVentasMayoreo";
import { images } from "@/constants";

const ConfiguracionVentasMayoreo = () => {
  const navigation = useNavigation();
  const {
    cargando,
    configuracionVentasMayoreo,
    getConfiguracionVentasMayoreo,
  } = useConfiguracionVentasMayoreo();

  useFocusEffect(
    useCallback(() => {
      const fetchConfiguracion = async () => {
        await getConfiguracionVentasMayoreo();
      };

      fetchConfiguracion();
    }, [])
  );

  const handleButtonClick = () => {
    if (configuracionVentasMayoreo) {
      navigation.navigate("formularioConfiguracionVentasMayoreo", {
        configuracionVentasMayoreo,
      });
    } else {
      navigation.navigate("formularioConfiguracionVentasMayoreo");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración de Ventas de Mayoreo</Text>
      {cargando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : configuracionVentasMayoreo ? (
        <View style={styles.details}>
          <Text style={styles.text}>
            <Text style={styles.label}>Plazo Máximo de Pago:</Text>{" "}
            {configuracionVentasMayoreo.plazoMaximoPago} días
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Pagos Mensuales:</Text>{" "}
            {configuracionVentasMayoreo.pagosMensuales ? "Sí" : "No"}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Monto Mínimo Mayorista:</Text>{" "}
            {configuracionVentasMayoreo.montoMinimoMayorista} MXN
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Fecha de Modificación:</Text>{" "}
            {new Date(
              configuracionVentasMayoreo.fechaModificacion
            ).toLocaleDateString()}
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
              alt="No se encontraron solicitudes de mayoristas"
              resizeMode="contain"
            />
            <Text className="text-center">
              No existe la configuración de ventas de mayoreo
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

export default ConfiguracionVentasMayoreo;
