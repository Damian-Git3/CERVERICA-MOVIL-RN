import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker"; // Para seleccionar tipo y categoría
import useCupones from "@/hooks/useCupones";
import { router, useLocalSearchParams } from "expo-router";

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
    tipo: cupon?.tipo || 0, // Cambié a 0 para el tipo "Porcentaje"
    paquete: cupon?.paquete || 0,
    cantidad: cupon?.cantidad || 0,
    valor: cupon?.valor || 0,
    usos: cupon?.usos || 0,
    montoMaximo: cupon?.montoMaximo || 0,
    categoriaComprador: cupon?.categoriaComprador || 1,
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

      const fecha = new Date();
      const fechaFormatoAPI = fecha.toISOString();

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

  // Validación del formulario
  const isFormValid = () => {
    // Verificamos que todos los campos importantes estén completos
    return (
      formValues.codigo !== "" &&
      formValues.fechaExpiracion !== "" &&
      formValues.tipo !== 0 &&
      formValues.paquete > 0 &&
      formValues.cantidad > 0 &&
      formValues.valor > 0 &&
      formValues.usos > 0 &&
      formValues.montoMaximo > 0
    );
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
          <Picker.Item label="Porcentaje" value={1} />
          <Picker.Item label="Fijo" value={2} />
        </Picker>

        <Text style={styles.label}>Paquete:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formValues.paquete.toString()}
          onChangeText={(value) =>
            handleChange("paquete", parseInt(value) || 0)
          }
        />

        <Text style={styles.label}>Cantidad:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formValues.cantidad.toString()}
          onChangeText={(value) =>
            handleChange("cantidad", parseInt(value) || 0)
          }
        />

        <Text style={styles.label}>Valor:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formValues.valor.toString()}
          onChangeText={(value) =>
            handleChange("valor", value)
          }
        />

        <Text style={styles.label}>Usos:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formValues.usos.toString()}
          onChangeText={(value) => handleChange("usos", parseInt(value) || 0)}
        />

        <Text style={styles.label}>Monto Máximo:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formValues.montoMaximo.toString()}
          onChangeText={(value) =>
            handleChange("montoMaximo", parseFloat(value) || 0)
          }
        />

        <Text style={styles.label}>Categoría de Comprador:</Text>
        <Picker
          selectedValue={formValues.categoriaComprador}
          onValueChange={(value) => handleChange("categoriaComprador", value)}
          style={styles.input}
        >
          <Picker.Item label="Todos" value={1} />
          <Picker.Item label="Frecuente" value={2} />
          <Picker.Item label="Minorista" value={3} />
          <Picker.Item label="Mayorista" value={4} />
          <Picker.Item label="Inactivo" value={5} />
        </Picker>

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
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default FormularioCupones;
