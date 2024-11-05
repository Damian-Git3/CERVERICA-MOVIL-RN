import CustomButton from "@/components/CustomButton";
import useSolicitudesMayoristas from "@/hooks/useSolicitudesMayoristas";
import useSolicitudesMayoristasStore from "@/stores/SolicitudesMayoristasStore";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, Button, Linking, Alert, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import RechazarSolicitud from "./rechazar-solicitud";

export default function ProspectoSolicitud() {
  const { solicitudMayorista } = useSolicitudesMayoristasStore();
  const {
    avanzarSiguienteEstatus,
    getSolicitudesMayoristas,
    cancelarSolicitudMayorista,
  } = useSolicitudesMayoristas();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && solicitudMayorista == null) {
      router.replace("/(agente)/(solicitudes-mayoristas)/lista-solicitudes");
    }
  }, [isMounted, solicitudMayorista]);

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

  const marcarSolicitudCancelada = async () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de marcar esta solicitud como cancelada?",
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
                await cancelarSolicitudMayorista({
                  idSolicitud: solicitudMayorista.id,
                  mensajeRechazo: "Aceptado",
                });

                Alert.alert("Éxito", "Solicitud marcada como cancelada");

                await getSolicitudesMayoristas();

                router.replace(
                  "/(agente)/(solicitudes-mayoristas)/lista-solicitudes"
                );
              } catch (error) {
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
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Nuevo prospecto</Text>
      {solicitudMayorista && (
        <>
          <Text style={styles.textTitle}>Nombre de contacto:</Text>
          <Text style={styles.text}>
            {solicitudMayorista.mayorista.nombreContacto}
          </Text>

          <Text style={styles.textTitle} className="mt-3">
            Nombre de la empresa:
          </Text>
          <Text style={styles.text}>
            {solicitudMayorista.mayorista.nombreEmpresa}
          </Text>

          <Text style={styles.textTitle} className="mt-3">
            Dirección:
          </Text>
          <Text style={styles.text}>
            {solicitudMayorista.mayorista.direccionEmpresa}
          </Text>

          <Text style={styles.textTitle} className="mt-3">
            Teléfono de Contacto:
          </Text>
          <Text style={styles.text}>
            {solicitudMayorista.mayorista.telefonoContacto}
          </Text>

          <Text style={styles.textTitle} className="mt-3">
            Teléfono de Empresa:
          </Text>
          <Text style={styles.text}>
            {solicitudMayorista.mayorista.telefonoEmpresa}
          </Text>

          <Text style={styles.textTitle} className="mt-3">
            Correo de Contacto:
          </Text>
          <Text style={styles.text}>
            {solicitudMayorista.mayorista.emailContacto}
          </Text>

          <Text style={styles.textTitle} className="mt-3">
            Correo de Empresa:
          </Text>
          <Text style={styles.text}>
            {solicitudMayorista.mayorista.emailEmpresa}
          </Text>

          <Text style={styles.textTitle} className="mt-3">
            Fecha de inicio:
          </Text>
          <Text style={styles.text}>
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

      <RechazarSolicitud solicitudMayorista={solicitudMayorista} />
    </ScrollView>
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
    textAlign: "center",
  },
  text: {
    fontSize: 15,
    marginVertical: 5,
    textAlign: "center",
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: "column",
    gap: 20,
  },
});
