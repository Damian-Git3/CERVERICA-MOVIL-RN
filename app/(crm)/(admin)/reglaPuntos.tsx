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
import usePuntosFidelidad from "@/hooks/usePuntosFidelidad";
import { useFocusEffect } from "expo-router";
import { images } from "@/constants";

const ReglaPuntos = () => {
  const navigation = useNavigation();
  const { cargando, reglasPuntos, getReglasPuntos } = usePuntosFidelidad();

  useFocusEffect(
    useCallback(() => {
      const fetchReglasPuntos = async () => {
        await getReglasPuntos();
      };

      fetchReglasPuntos();
    }, [])
  );

  const handleButtonClick = () => {
    // Verifica si hay reglas de puntos y navega a la ruta con o sin parámetros
    if (reglasPuntos) {
      navigation.navigate("formularioReglasPuntos", { reglasPuntos });
    } else {
      navigation.navigate("formularioReglasPuntos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reglas de Puntos de Fidelidad</Text>
      {cargando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : reglasPuntos ? (
        <View style={styles.details}>
          <Text style={styles.text}>
            <Text style={styles.label}>Valor MXN por Punto:</Text>{" "}
            {reglasPuntos.valorMXNPunto}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Monto Mínimo:</Text>{" "}
            {reglasPuntos.montoMinimo}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Porcentaje de Conversión:</Text>{" "}
            {reglasPuntos.porcentajeConversion}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Fecha de Modificación:</Text>{" "}
            {new Date(reglasPuntos.fechaModificacion).toLocaleDateString()}
          </Text>
          <Button
            title="Actualizar Reglas de Puntos"
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
            <Text className="text-center">No existen reglas de puntos</Text>
          </View>

          <Button
            title="Registrar Reglas de Puntos"
            onPress={handleButtonClick}
          />
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

export default ReglaPuntos;
