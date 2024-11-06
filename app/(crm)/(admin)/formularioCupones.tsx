import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker"; // Para seleccionar tipo y categoría
import useCupones from "@/hooks/useCupones";

const FormularioCupones: React.FC = () => {
  const route = useRoute();
  const cupon = route.params?.cupon || null; // Obtener el cupón si se está editando
  const navigation = useNavigation();

  console.log("cupon");
  console.log(cupon);
  const { registrarCupon, actualizarCupon } = useCupones();

  const [formValues, setFormValues] = useState({
    id: cupon?.id || 0,
    codigo: cupon?.codigo || "",
    fechaCreacion: cupon?.fechaCreacion || new Date().toISOString(),
    fechaExpiracion: cupon?.fechaExpiracion || "",
    tipo: cupon?.tipo || 1,
    paquete: cupon?.paquete || 0,
    cantidad: cupon?.cantidad || 0,
    valor: cupon?.valor || 0,
    usos: cupon?.usos || 0,
    montoMaximo: cupon?.montoMaximo || 0,
    categoriaComprador: cupon?.categoriaComprador || 1,
    activo: cupon?.activo || true,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Generar la fecha de creación formateada solo si es un nuevo cupón
      const fecha = new Date();
      const year = fecha.getFullYear();
      const month = String(fecha.getMonth() + 1).padStart(2, "0");
      const day = String(fecha.getDate()).padStart(2, "0");
      const hours = String(fecha.getHours()).padStart(2, "0");
      const minutes = String(fecha.getMinutes()).padStart(2, "0");
      const seconds = String(fecha.getSeconds()).padStart(2, "0");
      const milliseconds = String(fecha.getMilliseconds()).padStart(3, "0");

      const fechaFormatoAPI = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

      // Si el cupón es nuevo, incluir la fecha de creación
      const formValuesConFecha = cupon
        ? {
            ...formValues, // Si ya existe un cupón, solo utilizamos los datos actuales del formulario sin modificar la fecha
          }
        : {
            ...formValues, // Si es un cupón nuevo, incluir la fecha de creación
            fechaCreacion: fechaFormatoAPI,
          };

      if (cupon) {
        // Si el cupón ya existe, actualizar sin tocar la fechaCreacion
        console.log(formValuesConFecha);
        /*
      await actualizarCupon(formValuesConFecha);
      Toast.show({
        text1: "Cupón Actualizado",
        text2: "El cupón ha sido actualizado exitosamente.",
        type: "success",
      });
      */
      } else {
        // Si el cupón es nuevo, registrar con la fechaCreacion
        console.log(formValuesConFecha);
        await registrarCupon(formValuesConFecha);
        Toast.show({
          text1: "Cupón Registrado",
          text2: "El cupón ha sido registrado exitosamente.",
          type: "success",
        });
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error al registrar o actualizar el cupón:", error);
      Toast.show({
        text1: "Error",
        text2: "Hubo un problema al procesar la solicitud.",
        type: "error",
      });
    }
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
          <Text>{formValues.fechaExpiracion || "Seleccionar fecha"}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={new Date(formValues.fechaExpiracion || Date.now())}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                handleChange("fechaExpiracion", selectedDate);
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
          <Picker.Item label="Porcentaje" value="Porcentaje" />
          <Picker.Item label="Fijo" value="Fijo" />
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
            handleChange("valor", parseFloat(value) || 0)
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
          <Picker.Item label="Todos" value="Todos" />
          <Picker.Item label="Frecuente" value="Frecuente" />
          <Picker.Item label="Minorista" value="Minorista" />
          <Picker.Item label="Mayorista" value="Mayorista" />
          <Picker.Item label="Inactivo" value="Inactivo" />
        </Picker>

        <Text style={styles.label}>Activo:</Text>
        <Switch
          value={formValues.activo}
          onValueChange={(value) => handleChange("activo", value)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
    justifyContent: "center",
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

export default FormularioCupones;
