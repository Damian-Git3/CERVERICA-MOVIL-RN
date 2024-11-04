import React, { useCallback } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "expo-router";
import useConfiguracionVentasMayoreo from "@/hooks/useConfiguracionVentasMayoreo";

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
          <Text style={styles.text}>
            No se encontró la configuración de ventas de mayoreo
          </Text>
          <Button title="Registrar Configuración" onPress={handleButtonClick} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
