import React, { useContext, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  ActivityIndicator,
} from "react-native";
import { Badge } from "react-native-elements";
import { Venta } from "@/models/venta";
import VentaContext from "@/context/Venta/VentaContext";

interface ListVentasProps {
  data: Venta[];
}

interface CardProps {
  venta: Venta;
}

export const ListVentas: React.FC<ListVentasProps> = () => {
  const { ventas, getVentas } = useContext(VentaContext);

  useEffect(() => {
    if (getVentas) {
      getVentas();
    }
    console.log("getVentas");
    console.log("ventas", ventas);
  }, []);

  const renderItem = ({ item }: { item: Venta }) => <Card venta={item} />;

  return (
    <View style={styles.container}>
      <Button title="Recargar" onPress={getVentas} />
      <FlatList
        data={ventas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    position: "relative", // Ensure the container is positioned relatively
  },
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject, // This will cover the entire screen
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    top: 10,
    backgroundColor: "transparent",
  },
});

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
      return 'Recibido ✅';
    case 2:
      return 'Empaquetando 📦';
    case 3:
      return 'Listo 🚚';
    default:
      return 'Estatus desconocido';
  }
};

const obtenerSeverityEstatusVenta = (
  estatusVenta: number,
): keyof typeof severityColors => {
  switch (estatusVenta) {
    case 1:
      return 'info';
    case 2:
      return 'warning';
    case 3:
      return 'success';
    default:
      return 'default';
  }
};

const severityColors = {
  info: "blue",
  warning: "orange",
  success: "green",
  default: "gray",
};

const Card: React.FC<CardProps> = ({ venta }) => {
  const formattedDate = new Date(venta.fechaVenta).toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const nombreEstatus = obtenerNombreEstatusVenta(venta.estatusVenta);
  const severity = obtenerSeverityEstatusVenta(venta.estatusVenta);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Venta ID: {venta.id}</Text>
      <Text style={styles.description}>Fecha: {formattedDate}</Text>
      <Text style={styles.description}>
        Total Cervezas: {venta.totalCervezas}
      </Text>
      <Text style={styles.description}>
        Método de Envío: {obtenerMetodoEnvio(venta.metodoEnvio)}
      </Text>
      <Text style={styles.description}>
        Método de Pago: {obtenerMetodoPago(venta.metodoPago)}
      </Text>
      <Text style={styles.description}>
        Número de Tarjeta: {venta.numeroTarjeta}
      </Text>
      <Text style={styles.description}>
        Estatus:
        <Badge
          value={nombreEstatus}
          badgeStyle={{ backgroundColor: severityColors[severity] || severityColors.default }}
          textStyle={{ color: "white" }}
        />
      </Text>
      <Text style={styles.description}>Monto: ${venta.montoVenta}</Text>
      {/* Puedes agregar más detalles de ProductosPedido si es necesario */}
    </View>
  );
};
