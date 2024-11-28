import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch, // Importar el componente Switch
} from "react-native";
import useConfiguracionVentasMayoreo from "@/hooks/useConfiguracionVentasMayoreo";
import { IConfiguracionVentasMayoreo } from "@/dtos/configuracionVentasMayoreo";
import { useRoute, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { router, useLocalSearchParams } from "expo-router";

const FormularioConfiguracionVentasMayoreo: React.FC = () => {
  const route = useRoute();
  const params = useLocalSearchParams();
  const configuracion = params?.configuracionVentasMayoreo
    ? JSON.parse(params.configuracionVentasMayoreo)
    : null;

  const {
    registrarConfiguracionVentasMayoreo,
    actualizarConfiguracionVentasMayoreo,
  } = useConfiguracionVentasMayoreo();

  const [formValues, setFormValues] = useState<IConfiguracionVentasMayoreo>({
    id: configuracion?.id || 0,
    plazoMaximoPago: configuracion?.plazoMaximoPago || 0,
    pagosMensuales: configuracion?.pagosMensuales || false,
    montoMinimoMayorista: configuracion?.montoMinimoMayorista || 0,
    fechaModificacion: new Date(), // Inicializa con la fecha actual
  });

  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    if (configuracion) {
      setFormValues({
        id: configuracion.id,
        plazoMaximoPago: configuracion.plazoMaximoPago,
        pagosMensuales: configuracion.pagosMensuales,
        montoMinimoMayorista: configuracion.montoMinimoMayorista,
        fechaModificacion: configuracion.fechaModificacion || new Date(), // Carga la fecha si existe
      });
      setId(configuracion.id);
    }
  }, []);

  const handleChange = (name: string, value: any) => {
    if (name == "montoMinimoMayorista") {
      const regex = /^(\d*\.?\d*)$/; // Expresión regular que permite 0 o 1 punto decimal
      if (regex.test(value)) {
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value === "" ? "0" : value, // Si está vacío, asignamos "0"
        }));
      }
    } else {
      setFormValues((prevValues) => ({
      ...prevValues,
      [name]:
        name === "promocionesAutomaticas" ||
        name === "notificacionPromocionesWhatsApp" ||
        name === "notificacionPromocionesEmail"
          ? value
          : value === ""
          ? 0
          : parseFloat(value), // Asigna 0 si el campo está vacío
    }));
    }
    
  };

  const formatFechaModificacion = (fecha: Date) => {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0"); // Mes comienza en 0
    const day = String(fecha.getDate()).padStart(2, "0");
    const hours = String(fecha.getHours()).padStart(2, "0");
    const minutes = String(fecha.getMinutes()).padStart(2, "0");
    const seconds = String(fecha.getSeconds()).padStart(2, "0");
    const milliseconds = String(fecha.getMilliseconds()).padStart(3, "0");

    // Formatear como cadena ISO
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  };

  const handleSubmit = async () => {
    // Obtener la fecha de modificación formateada
    const fechaFormatoAPI = formatFechaModificacion(new Date());

    const dataToSend = {
      ...formValues,
      fechaModificacion: fechaFormatoAPI, // Asigna la fecha formateada
      ...(configuracion ? { id } : {}),
    };

    try {
      if (configuracion) {
        await actualizarConfiguracionVentasMayoreo(dataToSend);
        Toast.show({
          text1: "Actualización Exitosa",
          text2: "La configuración de ventas al mayoreo ha sido actualizada.",
          type: "success",
        });
      } else {
        await registrarConfiguracionVentasMayoreo(dataToSend);
        Toast.show({
          text1: "Registro Exitoso",
          text2: "La configuración de ventas al mayoreo ha sido registrada.",
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
        {configuracion ? "Actualizar" : "Registrar"} Configuración de Ventas
        Mayoreo
      </Text>

      <Text style={styles.label}>Plazo Máximo de Pago:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={formValues.plazoMaximoPago.toString()}
        onChangeText={(value) => handleChange("plazoMaximoPago", value)}
      />

      <Text style={styles.label}>Pagos Mensuales:</Text>
      <Switch
        value={formValues.pagosMensuales} // Usar el valor del estado
        onValueChange={(value) => handleChange("pagosMensuales", value)} // Cambiar el valor directamente
      />

      <Text style={styles.label}>Monto Mínimo Mayorista:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={formValues.montoMinimoMayorista.toString()}
        onChangeText={(value) => handleChange("montoMinimoMayorista", value)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {configuracion ? "Actualizar" : "Registrar"} Configuración
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

export default FormularioConfiguracionVentasMayoreo;
