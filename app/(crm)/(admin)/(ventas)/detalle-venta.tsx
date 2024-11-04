import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import useVentas from "@/hooks/useVentas";
import useVentasStore from "@/stores/VentasStore";
import { router } from "expo-router";
import { Text, View, Linking, Alert, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ModalVenta from "@/components/admin/ventas/ModalVenta";
import { Badge } from "react-native-elements";

export default function DetalleVenta() {
  const { venta } = useVentasStore();
  const { getVentas, retrocederStatus } = useVentas();
  const [modalVisible, setModalVisible] = useState(false);

  const retrocederPaso = async (idVenta: number) => {
    // Alerta de confirmación
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de retroceder el estatus de esta venta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              // Realiza la solicitud para retroceder el estatus
              await retrocederStatus(idVenta);

              // Alertar sobre el éxito
              Alert.alert("Éxito", "Se retrocedió al paso anterior con éxito!");

              // Actualizar la lista de ventas
              await getVentas();
            } catch (error) {
              // Manejo de errores
              Alert.alert(
                "Error",
                "Error al retroceder el estatus, intenta nuevamente"
              );
              console.error(error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const mostrarModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalle de Venta</Text>
      {venta && (
        <>
          <Text style={styles.text}>ID: {venta.id}</Text>
          <Text style={styles.text}>Fecha de la venta: {venta.fechaVenta}</Text>
          <Text style={styles.text}>
            Total de cervezas: {venta.totalCervezas}
          </Text>
          <Text style={styles.text}>
            Metodo de envio: {obtenerMetodoEnvio(venta.metodoEnvio)}
          </Text>
          <Text style={styles.text}>
            Metodo de pago: {obtenerMetodoPago(venta.metodoPago)}
          </Text>
          {venta.numeroTarjeta && (
            <Text style={styles.text}>
              Numero de tarjeta: {venta.numeroTarjeta}
            </Text>
          )}
          <Text style={styles.text}>
            Estatus:
            <Badge
              value={obtenerNombreEstatusVenta(venta.estatusVenta)}
              badgeStyle={{
                backgroundColor:
                  severityColors[
                    obtenerSeverityEstatusVenta(venta.estatusVenta)
                  ] || severityColors.default,
              }}
              textStyle={{ color: "white" }}
            />
          </Text>
          <Text style={styles.text}>Monto: ${venta.montoVenta}</Text>
          {venta.estatusVenta !== 1 && (
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Retroceder paso"
                onPress={() => retrocederPaso(venta.id)}
                IconRight={() => (
                  <Ionicons name="arrow-back" size={28} color="white" />
                )}
              />
            </View>
          )}
          {venta.estatusVenta === 1 && (
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Empezar empaquetar cervezas"
                onPress={() => retrocederPaso(venta.id)}
                IconRight={() => (
                  <Ionicons name="beer" size={28} color="white" />
                )}
              />
            </View>
          )}
          {venta.estatusVenta === 2 && (
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Empaquetar cervezas"
                style={{ backgroundColor: severityColors["warning"] }}
                onPress={mostrarModal}
                IconRight={() => (
                  <Ionicons name="beer" size={28} color="white" />
                )}
              />
            </View>
          )}
        </>
      )}
      {venta && (
        <ModalVenta
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          venta={venta}
          empaquetandoPedidos={true}
          productosDisponibles={venta.productosPedido}
          productosEmpaquetados={[]}
          cargando={false}
          habilitarMarcarListo={false}
          empezarEmpaquetar={() => {}}
          finalizarVenta={() => {}}
          verificarProductosEmpaquetados={() => {}}
        />
      )}
    </View>
  );
}

const obtenerMetodoEnvio = (metodoEnvio: number): string => {
  switch (metodoEnvio) {
    case 1:
      return "Recoger en tienda 🏭";
    case 2:
      return "Envio domicilio 🚚";
    default:
      return "Método de envio Desconocido";
  }
};

const obtenerMetodoPago = (metodoPago: number): string => {
  switch (metodoPago) {
    case 1:
      return "Contraentrega 💵";
    case 2:
      return "Tarjeta de credito 💳";
    default:
      return "Método de pago Desconocido";
  }
};

const obtenerNombreEstatusVenta = (estatusVenta: number) => {
  switch (estatusVenta) {
    case 1:
      return "Recibido ✅";
    case 2:
      return "Empaquetando 📦";
    case 3:
      return "Listo 🚚";
    default:
      return "Estatus desconocido";
  }
};

const obtenerSeverityEstatusVenta = (
  estatusVenta: number
): keyof typeof severityColors => {
  switch (estatusVenta) {
    case 1:
      return "info";
    case 2:
      return "warning";
    case 3:
      return "success";
    default:
      return "default";
  }
};

const severityColors = {
  info: "blue",
  warning: "orange",
  success: "green",
  default: "gray",
};

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
