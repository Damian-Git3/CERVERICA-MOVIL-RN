import CustomButton from "@/components/CustomButton";
import useSolicitudesMayoristas from "@/hooks/useSolicitudesMayoristas";
import useSolicitudesMayoristasStore from "@/stores/SolicitudesMayoristasStore";
import { router } from "expo-router";
import { Text, View, Button, Linking, Alert, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ProspectoSolicitud() {
  const { solicitudMayorista } = useSolicitudesMayoristasStore();
  const { avanzarSiguienteEstatus, getSolicitudesMayoristas } =
    useSolicitudesMayoristas();

  // Función para abrir mapas
  const abrirMapas = () => {
    if (solicitudMayorista) {
      const direccion = encodeURIComponent(
        solicitudMayorista.mayorista.direccionEmpresa
      );
      Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${direccion}`
      );
    }
  };

  // Función para llamar al número de contacto
  const llamarContacto = () => {
    if (solicitudMayorista) {
      const opcionesTelefono = [
        {
          text: `Teléfono de Contacto`,
          onPress: () =>
            Linking.openURL(
              `tel:${solicitudMayorista.mayorista.telefonoContacto}`
            ),
        },
        {
          text: `Teléfono de Empresa`,
          onPress: () =>
            Linking.openURL(
              `tel:${solicitudMayorista.mayorista.telefonoEmpresa}`
            ),
        },
      ];

      Alert.alert(
        "Seleccionar Teléfono",
        "Elige el número a marcar:",
        [
          ...opcionesTelefono,
          { text: "Cancelar", style: "cancel" }, // Opción para cancelar
        ],
        { cancelable: false } // No se puede cerrar tocando fuera
      );
    }
  };

  // Función para enviar un correo electrónico
  const enviarCorreo = () => {
    if (solicitudMayorista) {
      const opcionesEmail = [
        {
          text: `Email de Contacto`,
          onPress: () =>
            Linking.openURL(
              `mailto:${solicitudMayorista.mayorista.emailContacto}`
            ),
        },
        {
          text: `Email de Empresa`,
          onPress: () =>
            Linking.openURL(
              `mailto:${solicitudMayorista.mayorista.emailEmpresa}`
            ),
        },
      ];

      Alert.alert(
        "Seleccionar Correo",
        "Elige el correo a utilizar:",
        [
          ...opcionesEmail,
          { text: "Cancelar", style: "cancel" }, // Opción para cancelar
        ],
        { cancelable: false } // No se puede cerrar tocando fuera
      );
    }
  };

  const marcarProspectoContactado = async () => {
    // Alerta de confirmación
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de marcar este prospecto como contactado?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            if (solicitudMayorista) {
              try {
                // Realiza la solicitud para avanzar el estatus
                await avanzarSiguienteEstatus({
                  idSolicitud: solicitudMayorista.id,
                  nuevoEstatus: 3,
                });

                // Alertar sobre el éxito
                Alert.alert("Éxito", "Prospecto marcado como contactado.");

                // Actualizar la lista de solicitudes
                await getSolicitudesMayoristas();

                // Volver a la pantalla anterior
                router.replace(
                  "/(agente)/(solicitudes-mayoristas)/lista-solicitudes"
                );
              } catch (error) {
                // Manejo de errores
                Alert.alert(
                  "Error",
                  "Ocurrió un error al actualizar el estatus."
                );
              }
            }
          },
        },
      ],
      { cancelable: false } // No se puede cerrar tocando fuera de la alerta
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Desde prospecto</Text>
      {solicitudMayorista && (
        <>
          <Text style={styles.text}>
            Nombre de contacto: {solicitudMayorista.mayorista.nombreContacto}
          </Text>
          <Text style={styles.text}>
            Nombre de la empresa: {solicitudMayorista.mayorista.nombreEmpresa}
          </Text>
          <Text style={styles.text}>
            Dirección: {solicitudMayorista.mayorista.direccionEmpresa}
          </Text>
          <Text style={styles.text}>
            Teléfono de Contacto:{" "}
            {solicitudMayorista.mayorista.telefonoContacto}
          </Text>
          <Text style={styles.text}>
            Teléfono de Empresa: {solicitudMayorista.mayorista.telefonoEmpresa}
          </Text>
          <Text style={styles.text}>
            Correo de Contacto: {solicitudMayorista.mayorista.emailContacto}
          </Text>
          <Text style={styles.text}>
            Correo de Empresa: {solicitudMayorista.mayorista.emailEmpresa}
          </Text>
          <Text style={styles.text}>
            Fecha de inicio:{" "}
            {new Date(solicitudMayorista.fechaInicio).toLocaleDateString()}
          </Text>
        </>
      )}

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Abrir en mapas "
          onPress={abrirMapas}
          IconRight={() => <Ionicons name="pin" size={28} color="white" />}
        />
        <CustomButton
          title="Llamar "
          onPress={llamarContacto}
          IconRight={() => <Ionicons name="call" size={28} color="white" />}
        />
        <CustomButton
          title="Enviar correo "
          onPress={enviarCorreo}
          IconRight={() => <Ionicons name="mail" size={28} color="white" />}
        />
      </View>

      <CustomButton
        title="Prospecto contactado "
        onPress={marcarProspectoContactado}
        bgVariant="success"
        className="mt-10"
        IconRight={() => <Ionicons name="checkmark" size={28} color="white" />}
      />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    color: "#555",
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: "column",
    gap: 20,
  },
});
