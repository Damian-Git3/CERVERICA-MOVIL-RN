import React, { useState, useEffect } from "react";
import CustomButton from "@/components/CustomButton";
import useVentas from "@/hooks/useVentas";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Text, View, Linking, Alert, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ModalVenta from "@/components/admin/ventas/ModalVenta";
import { Badge, Image } from "react-native-elements";
import Toast from "react-native-toast-message";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DetalleVenta } from "@/models/venta";
import { images } from "@/constants";

interface ListDetalleVentaProps {
  data: DetalleVenta[];
}

interface CardProps {
  detalleVenta: DetalleVenta;
}

export default function DetalleVentaScreen() {
  const { selectedVenta, getVenta, retrocederStatus, empaquetar, cargando } = useVentas();
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    if (id) {
      getVenta(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (!modalVisible) {
      handleUpdateVenta();
    }
  }, [modalVisible]);

  const handleUpdateVenta = async () => {
    await getVenta(Number(id));
  };

  const retrocederPaso = async (idVenta: number) => {
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
              await retrocederStatus(idVenta);
              Toast.show({
                type: "success",
                text1: "Éxito",
                text2: "Se retrocedió el estatus con éxito!",
              });
              await handleUpdateVenta();
            } catch (error) {
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

  const avanzarEmpaquetar = async (idVenta: number) => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de avanzar al siguiente paso?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              await empaquetar(idVenta);
              Toast.show({
                type: "success",
                text1: "Éxito",
                text2: "Se avanzó al siguiente paso con éxito!",
              });
              await handleUpdateVenta();
              mostrarModal();
            } catch (error) {
              Alert.alert(
                "Error",
                "Error al avanzar al siguiente paso, intenta nuevamente"
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

  const renderItem = ({ item }: { item: DetalleVenta }) => (
    <TouchableOpacity>
      <Card detalleVenta={item} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Venta</Text>
      <View style={styles.hr} />
      {selectedVenta && (
        <>
          <Text style={styles.text}>ID: {selectedVenta.id}</Text>
          <Text style={styles.text}>
            Fecha de la venta:{" "}
            {new Date(selectedVenta.fechaVenta).toLocaleString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          <Text style={styles.text}>
            Total de cervezas: {selectedVenta.totalCervezas}
          </Text>
          <Text style={styles.text}>
            Metodo de envio: {obtenerMetodoEnvio(selectedVenta.metodoEnvio)}
          </Text>
          <Text style={styles.text}>
            Metodo de pago: {obtenerMetodoPago(selectedVenta.metodoPago)}
          </Text>
          <Text style={styles.text}>
            Estatus:
            <Badge
              value={obtenerNombreEstatusVenta(selectedVenta.estatusVenta)}
              badgeStyle={{
                backgroundColor:
                  severityColors[
                    obtenerSeverityEstatusVenta(selectedVenta.estatusVenta)
                  ] || severityColors.default,
              }}
              textStyle={{ color: "white" }}
            />
          </Text>
          <Text style={styles.text}>Monto: ${selectedVenta.montoVenta}</Text>
          {selectedVenta.estatusVenta !== 1 && (
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Retroceder paso"
                onPress={() => retrocederPaso(selectedVenta.id)}
                IconRight={() => (
                  <Ionicons name="arrow-back" size={28} color="white" />
                )}
              />
            </View>
          )}
          {selectedVenta.estatusVenta === 1 && (
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Empezar empaquetar cervezas"
                onPress={() => avanzarEmpaquetar(selectedVenta.id)}
                IconRight={() => (
                  <Ionicons name="beer" size={28} color="white" />
                )}
              />
            </View>
          )}
          {selectedVenta.estatusVenta === 2 && (
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

          <Text style={styles.header}>Detalle de Venta</Text>
          <View style={styles.hr} />
          <Text style={styles.text}>Productos:</Text>
          <FlatList
            data={selectedVenta.productosPedido}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                {cargando ? (
                  <ActivityIndicator size="small" color="#000" />
                ) : (
                  <>
                    <Image
                      source={images.noResult}
                      style={styles.noResultImage}
                      alt="No se encontraron ventas"
                      resizeMode="contain"
                    />
                    <Text style={styles.noResultText}>
                      No se encontraron ventas
                    </Text>
                  </>
                )}
              </View>
            )}
            ListHeaderComponent={() => (
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                  Venta total de : {selectedVenta.totalCervezas} cervezas
                </Text>
              </View>
            )}
          />
        </>
      )}
      {selectedVenta && (
        <ModalVenta
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          venta={selectedVenta}
          empaquetandoPedidos={true}
          productosDisponibles={selectedVenta.productosPedido}
          cargando={false}
          id={selectedVenta.id}
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
  hr: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  noResultImage: {
    width: 100,
    height: 100,
  },
  noResultText: {
    fontSize: 16,
    color: "#666",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    color: "#555",
    textAlign: "left",
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: "column",
    gap: 20,
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  list: {
    flexGrow: 1,
    padding: 16,
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
});

const Card: React.FC<CardProps> = ({ detalleVenta }) => {

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: detalleVenta.stock.receta.imagen }}
          style={{ width: 100, height: 100, marginRight: 10 }}
          resizeMode="contain"
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{detalleVenta.stock.receta.nombre}</Text>
          <Text style={styles.description}>Cantidad: {detalleVenta.cantidad}</Text>
          <Text style={styles.description}>Pack: {detalleVenta.pack} cervezas</Text>
          <Text style={styles.description}>Costo Unitario: {detalleVenta.costoUnitario}</Text>
          <Text style={styles.description}>Total: {detalleVenta.montoVenta}</Text>
        </View>
      </View>
    </View>
  );
};
