import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";
import useConfiguracionesGenerales from "@/hooks/useConfiguracionesGenerales";
import { IConfiguracionesGenerales } from "@/dtos/configuracionGenerales";
import { useRoute, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { ScrollView } from "react-native-gesture-handler";

const FormularioConfiguracionesGenerales: React.FC = () => {
  const route = useRoute();
  const configuracion = route.params?.configuracionesGenerales || null;
  const navigation = useNavigation();

  const {
    registrarConfiguracionesGenerales,
    actualizarConfiguracionesGenerales,
  } = useConfiguracionesGenerales();

  const [formValues, setFormValues] = useState<IConfiguracionesGenerales>({
    id: configuracion?.id || 0,
    minimoCompraEnvioGratis: configuracion?.minimoCompraEnvioGratis || 0,
    promocionesAutomaticas: configuracion?.promocionesAutomaticas || false,
    notificacionPromocionesWhatsApp:
      configuracion?.notificacionPromocionesWhatsApp || false,
    notificacionPromocionesEmail:
      configuracion?.notificacionPromocionesEmail || false,
    tiempoRecordatorioCarritoAbandonado:
      configuracion?.tiempoRecordatorioCarritoAbandonado || 0,
    tiempoRecordatorioRecomendacionUltimaCompra:
      configuracion?.tiempoRecordatorioRecomendacionUltimaCompra || 0,
    fechaModificacion: new Date(), // Inicializa con la fecha actual
    frecuenciaReclasificacionClientes:
      configuracion?.frecuenciaReclasificacionClientes || 0,
    frecuenciaMinimaMensualClienteFrecuente:
      configuracion?.frecuenciaMinimaMensualClienteFrecuente || 0,
    tiempoSinComprasClienteInactivo:
      configuracion?.tiempoSinComprasClienteInactivo || 0,
  });

  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    if (configuracion) {
      setFormValues({
        id: configuracion.id,
        minimoCompraEnvioGratis: configuracion.minimoCompraEnvioGratis,
        promocionesAutomaticas: configuracion.promocionesAutomaticas,
        notificacionPromocionesWhatsApp:
          configuracion.notificacionPromocionesWhatsApp,
        notificacionPromocionesEmail:
          configuracion.notificacionPromocionesEmail,
        tiempoRecordatorioCarritoAbandonado:
          configuracion.tiempoRecordatorioCarritoAbandonado,
        tiempoRecordatorioRecomendacionUltimaCompra:
          configuracion.tiempoRecordatorioRecomendacionUltimaCompra,
        fechaModificacion: configuracion.fechaModificacion || new Date(),
        frecuenciaReclasificacionClientes:
          configuracion.frecuenciaReclasificacionClientes,
        frecuenciaMinimaMensualClienteFrecuente:
          configuracion.frecuenciaMinimaMensualClienteFrecuente,
        tiempoSinComprasClienteInactivo:
          configuracion.tiempoSinComprasClienteInactivo,
      });
      setId(configuracion.id);
    }
  }, [configuracion]);

  const handleChange = (name: string, value: any) => {
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
  };

  const handleSubmit = async () => {
    const dataToSend = {
      ...formValues,
      fechaModificacion: new Date(), // Asigna la fecha actual al enviar
      ...(configuracion ? { id } : {}),
    };

    try {
      if (configuracion) {
        await actualizarConfiguracionesGenerales(dataToSend);
        Toast.show({
          text1: "Actualización Exitosa",
          text2: "La configuración general ha sido actualizada.",
          type: "success",
        });
      } else {
        await registrarConfiguracionesGenerales(dataToSend);
        Toast.show({
          text1: "Registro Exitoso",
          text2: "La configuración general ha sido registrada.",
          type: "success",
        });
      }
      navigation.goBack();
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
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>
          {configuracion ? "Actualizar" : "Registrar"} Configuraciones Generales
        </Text>

        <Text style={styles.label}>Mínimo Compra Envío Gratis:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formValues.minimoCompraEnvioGratis.toString()}
          onChangeText={(value) =>
            handleChange("minimoCompraEnvioGratis", value)
          }
        />

        <Text style={styles.label}>Promociones Automáticas:</Text>
        <Switch
          value={formValues.promocionesAutomaticas}
          onValueChange={(value) =>
            handleChange("promocionesAutomaticas", value)
          }
        />

        <Text style={styles.label}>Notificación Promociones WhatsApp:</Text>
        <Switch
          value={formValues.notificacionPromocionesWhatsApp}
          onValueChange={(value) =>
            handleChange("notificacionPromocionesWhatsApp", value)
          }
        />

        <Text style={styles.label}>Notificación Promociones Email:</Text>
        <Switch
          value={formValues.notificacionPromocionesEmail}
          onValueChange={(value) =>
            handleChange("notificacionPromocionesEmail", value)
          }
        />

        <Text style={styles.label}>
          Tiempo Recordatorio Carrito Abandonado (min):
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formValues.tiempoRecordatorioCarritoAbandonado.toString()}
          onChangeText={(value) =>
            handleChange("tiempoRecordatorioCarritoAbandonado", value)
          }
        />

        <Text style={styles.label}>
          Tiempo Recordatorio Recomendación Última Compra (min):
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formValues.tiempoRecordatorioRecomendacionUltimaCompra.toString()}
          onChangeText={(value) =>
            handleChange("tiempoRecordatorioRecomendacionUltimaCompra", value)
          }
        />

        <Text style={styles.label}>
          Frecuencia Reclasificación Clientes (días):
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formValues.frecuenciaReclasificacionClientes.toString()}
          onChangeText={(value) =>
            handleChange("frecuenciaReclasificacionClientes", value)
          }
        />

        <Text style={styles.label}>
          Frecuencia Mínima Mensual Cliente Frecuente:
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formValues.frecuenciaMinimaMensualClienteFrecuente.toString()}
          onChangeText={(value) =>
            handleChange("frecuenciaMinimaMensualClienteFrecuente", value)
          }
        />

        <Text style={styles.label}>
          Tiempo Sin Compras Cliente Inactivo (días):
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formValues.tiempoSinComprasClienteInactivo.toString()}
          onChangeText={(value) =>
            handleChange("tiempoSinComprasClienteInactivo", value)
          }
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {configuracion ? "Actualizar" : "Registrar"} Configuración
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

export default FormularioConfiguracionesGenerales;
