import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import usePuntosFidelidad from "@/hooks/usePuntosFidelidad";
import { ReglasPuntosDto } from "@/dtos/puntosFidelidad";
import { useRoute, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { router, useLocalSearchParams } from "expo-router";

const FormularioReglasPuntos: React.FC = () => {
  const route = useRoute();
  const params = useLocalSearchParams();
  const reglasPuntos = params?.reglasPuntos
    ? JSON.parse(params.reglasPuntos)
    : null;

  const { registrarReglasPuntos, actualizarReglasPuntos } =
    usePuntosFidelidad();

  const [formValues, setFormValues] = useState<ReglasPuntosDto>({
    valorMXNPunto: reglasPuntos?.valorMXNPunto || 0,
    montoMinimo: reglasPuntos?.montoMinimo || 0,
    porcentajeConversion: reglasPuntos?.porcentajeConversion || 0,
    fechaModificacion: "", // Cambia a cadena para luego formatear
  });

  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (reglasPuntos) {
      setFormValues({
        valorMXNPunto: reglasPuntos.valorMXNPunto,
        montoMinimo: reglasPuntos.montoMinimo,
        porcentajeConversion: reglasPuntos.porcentajeConversion,
        fechaModificacion: reglasPuntos.fechaModificacion || "", // Carga la fecha si existe
      });
      setId(reglasPuntos.id);
    }
  }, []);

  const handleChange = (name: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value === "" ? 0 : parseFloat(value), // Si el valor es vacío, asigna 0
    }));
  };

  const handleSubmit = async () => {
    // Obtener la fecha de modificación formateada
    const fechaSolicitud = new Date();
    const year = fechaSolicitud.getFullYear();
    const month = String(fechaSolicitud.getMonth() + 1).padStart(2, "0"); // Mes comienza en 0
    const day = String(fechaSolicitud.getDate()).padStart(2, "0");
    const hours = String(fechaSolicitud.getHours()).padStart(2, "0");
    const minutes = String(fechaSolicitud.getMinutes()).padStart(2, "0");
    const seconds = String(fechaSolicitud.getSeconds()).padStart(2, "0");
    const milliseconds = String(fechaSolicitud.getMilliseconds()).padStart(
      3,
      "0"
    );

    // Formatear como cadena ISO
    const fechaFormatoAPI = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

    const dataToSend = {
      ...formValues,
      fechaModificacion: fechaFormatoAPI, // Asigna la fecha formateada
      ...(reglasPuntos ? { id } : {}),
    };

    try {
      if (reglasPuntos) {
        console.log(dataToSend);
        await actualizarReglasPuntos(dataToSend);
        Toast.show({
          text1: "Actualización Exitosa",
          text2: "Las reglas de puntos han sido actualizadas.",
          type: "success",
        });
      } else {
        await registrarReglasPuntos(dataToSend);
        Toast.show({
          text1: "Registro Exitoso",
          text2: "Las reglas de puntos han sido registradas.",
          type: "success",
        });
      }
      router.back();
    } catch (error) {
      console.error("Error al registrar o actualizar:", error);
      Toast.show({
        text1: "Error",
        text2: "Hubo un problema al procesar la solicitud.",
        type: "error",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {reglasPuntos ? "Actualizar" : "Registrar"} Reglas de Puntos
      </Text>

      <Text style={styles.label}>Valor MXN por Punto:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={formValues.valorMXNPunto.toString()}
        onChangeText={(value) => handleChange("valorMXNPunto", value)}
      />

      <Text style={styles.label}>Monto Mínimo:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={formValues.montoMinimo.toString()}
        onChangeText={(value) => handleChange("montoMinimo", value)}
      />

      <Text style={styles.label}>Porcentaje de Conversión:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={formValues.porcentajeConversion.toString()}
        onChangeText={(value) => handleChange("porcentajeConversion", value)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {reglasPuntos ? "Actualizar" : "Registrar"} Reglas
        </Text>
      </TouchableOpacity>
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default FormularioReglasPuntos;
