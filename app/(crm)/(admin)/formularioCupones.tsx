import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker"; // Para seleccionar tipo y categoría
import useCupones from "@/hooks/useCupones";
import { router, useLocalSearchParams } from "expo-router";
import { useWatch } from "react-hook-form";

const FormularioCupones: React.FC = () => {
  const route = useRoute();
  const params = useLocalSearchParams();
  const cupon = params?.cupon ? JSON.parse(params.cupon) : null;

  const { registrarCupon, actualizarCupon } = useCupones();

  const [formValues, setFormValues] = useState({
    id: cupon?.id || 0,
    codigo: cupon?.codigo || "",
    fechaCreacion: cupon?.fechaCreacion || new Date().toISOString(),
    fechaExpiracion: cupon?.fechaExpiracion || "",
    tipo: cupon?.tipo || 2,
    paquete: 0,
    cantidad: cupon?.cantidad || 0,
    valor: cupon?.valor || 0,
    usos: cupon?.usos || 0,
    montoMaximo: 0,
    montoMinimo: cupon?.montoMinimo || 0,
    activo: cupon?.activo || true,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const filterTextInput = (text) => {
    return text.replace(/[^a-zA-Z0-9]/g, "");
  };

  const handleChangeValor = (name: string, value: any) => {
    if (name === "valor") {
      if (formValues.tipo === 1) {
        // Limitar valores entre 0 y 100 para el tipo 'Porcentaje'
        const numericValue = parseFloat(value) || 0;
        value = Math.max(0, Math.min(100, numericValue));
      } else if (formValues.tipo === 2) {
        // Validar solo números con un punto decimal permitido
        const regex = /^(\d*\.?\d*)$/;
        if (regex.test(value)) {
          setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value === "" ? "0" : value, // Si está vacío, asignamos "0"
          }));
          return;
        }
      }
    }

    // Para otros casos, actualizamos normalmente con validaciones
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value === "" ? 0 : parseFloat(value), // Si vacío, asigna 0
    }));
  };


  const handleChange = (name: string, value: any) => {
    if (name === "valor") {
      if (formValues.tipo === 1) { // Comparar con número, no cadena
        // Limitar valores entre 0 y 100 para el tipo 'Porcentaje'
        const numericValue = parseFloat(value) || 0;
        value = Math.max(0, Math.min(100, numericValue));
      } else if (formValues.tipo === 2) {
        // Validar número con punto decimal permitido
        const regex = /^\d*\.?\d*$/; // Permite un solo punto decimal
        if (!regex.test(value)) {
          return; // Salir si el valor no es válido
        }
      }
    }

    if (name === "codigo") {
      value = filterTextInput(value); // Filtrar el código según las reglas definidas
    }

    // Actualizar estado para cualquier otro caso o después de la validación
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };


  const handleSubmit = async () => {
    try {
      if (formValues.tipo == "1" && formValues.valor > 100) {
        Toast.show({
          text1: "Error Porcentaje mayor a 100",
          text2: "El valor no puede ser mayor a 100 cuando el tipo es porcentaje.",
          type: "error",
        });
        return; // No continuar con el envío del formulario
      }

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

      const formValuesConFecha = cupon
        ? {
          ...formValues, // Si ya existe un cupón, solo utilizamos los datos actuales del formulario sin modificar la fecha
          tipo: parseInt(formValues.tipo, 10),
        }
        : {
          ...formValues, // Si es un cupón nuevo, incluir la fecha de creación
          tipo: parseInt(formValues.tipo, 10),
          fechaCreacion: fechaFormatoAPI,
        };

      if (cupon) {
        // Si el cupón ya existe, actualizar sin tocar la fechaCreacion
        console.log("formValuesConFecha")
        console.log(formValuesConFecha)
        await actualizarCupon(formValuesConFecha.id, formValuesConFecha);

        Toast.show({
          text1: "Cupón Actualizado",
          text2: "El cupón ha sido actualizado exitosamente.",
          type: "success",
        });
      } else {
        // Si el cupón es nuevo, registrar con la fechaCreacion
        await registrarCupon(formValuesConFecha);
        Toast.show({
          text1: "Cupón Registrado",
          text2: "El cupón ha sido registrado exitosamente.",
          type: "success",
        });
      }
      router.back();
    } catch (error) {
      console.error("Error al registrar o actualizar el cupón:", error);
      Toast.show({
        text1: "Error",
        text2: "Hubo un problema al procesar la solicitud.",
        type: "error",
      });
    }
  };

  const formatDate = (date: string) => {
    if (!date) return "Seleccionar fecha";
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  const opcionesPaquete = [
    { label: "1 cerveza", value: 1 },
    { label: "6 cervezas", value: 6 },
    { label: "12 cervezas", value: 12 },
    { label: "24 cervezas", value: 24 },
  ];

  const opcionesTipoCupon = [
    { label: "Porcentaje", value: 1 },
    { label: "Fijo", value: 2 },
  ];

  const isFormValid = () => {
    return (
      formValues.codigo.trim() !== "" && // Asegura que el código no esté vacío
      formValues.fechaExpiracion !== "" && // Asegura que la fecha de expiración no esté vacía
      formValues.tipo !== 0 && // Asegura que el tipo no sea 0
      formValues.cantidad > 0 && // Asegura que la cantidad sea mayor a 0
      formValues.valor > 0 && // Asegura que el valor sea mayor a 0
      formValues.montoMinimo > 0 // Asegura que el monto máximo sea mayor a 0
    );
  };


  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(value);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>
          {cupon ? "Actualizar" : "Registrar"} Cupón
        </Text>

        <Text style={styles.label}>Código del Cupón:</Text>
        <TextInput
          style={styles.input}
          value={formValues.codigo}
          onChangeText={(value) => handleChange("codigo", value)}
        />

        <Text style={styles.label}>Fecha de Expiración:</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.input}
        >
          <Text>{formatDate(formValues.fechaExpiracion)}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={new Date(formValues.fechaExpiracion || Date.now())}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                handleChange("fechaExpiracion", selectedDate.toISOString());
                setShowDatePicker(false);
              }
            }}
          />
        )}

        <Text style={styles.label}>Tipo de Cupón:</Text>
        <Picker
          selectedValue={formValues.tipo}
          onValueChange={(value) => handleChange("tipo", value)}
          style={styles.input}
        >
          {opcionesTipoCupon.map((opcion) => (
            <Picker.Item key={opcion.value} label={opcion.label} value={opcion.value} />
          ))}
        </Picker>

        <Text style={styles.label}>Cantidad Cupones:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formValues.cantidad.toString()}
          onChangeText={(value) =>
            handleChange("cantidad", parseInt(value) || 0)
          }
        />

        <Text style={styles.label}>{formValues.tipo == "1" ? "Descuento (%)" : "Descuento ($)"}:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formValues.valor.toString()}
          onChangeText={(value) =>
            handleChange("valor", value)
          }
        />

        <Text style={styles.label}>Monto Mínimo:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formatCurrency(formValues.montoMinimo)}
          onChangeText={(value) =>
            handleChange("montoMinimo", parseFloat(value.replace(/[^\d.-]/g, '')) || 0) // Remueve caracteres no numéricos
          }
        />

        <Text style={styles.label}>Activo:</Text>
        <Switch
          value={formValues.activo}
          onValueChange={(value) => handleChange("activo", value)}
        />

        <TouchableOpacity
          style={[styles.button, { opacity: isFormValid() ? 1 : 0.5 }]}
          onPress={handleSubmit}
          disabled={!isFormValid()}
        >
          <Text style={styles.buttonText}>
            {cupon ? "Actualizar" : "Registrar"} Cupón
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default FormularioCupones;
