import React, { useState, useEffect } from "react";
import CustomButton from "@/components/CustomButton";
import useVentas from "@/hooks/useVentas";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  Linking,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
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
  const { selectedVenta, getVenta, retrocederStatus, empaquetar, cargando } =
    useVentas();
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
    <View className="flex-1 p-5 bg-gray-100 rounded-lg shadow-md">
      <Text className="text-2xl font-bold mb-4 text-center text-gray-800">
        Venta
      </Text>
      <View className="border-b border-gray-300 mb-5" />
      {selectedVenta && (
        <>
          <Text className="text-lg text-gray-700">ID: {selectedVenta.id}</Text>
          <Text className="text-lg text-gray-700">
            Fecha de la venta:{" "}
            {new Date(selectedVenta.fechaVenta).toLocaleString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          <Text className="text-lg text-gray-700">
            Total de cervezas: {selectedVenta.totalCervezas}
          </Text>
          <Text className="text-lg text-gray-700">
            Metodo de envio: {obtenerMetodoEnvio(selectedVenta.metodoEnvio)}
          </Text>
          <Text className="text-lg text-gray-700">
            Metodo de pago: {obtenerMetodoPago(selectedVenta.metodoPago)}
          </Text>
          <Text className="text-lg text-gray-700">
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
          <Text className="text-lg text-gray-700">
            Monto: ${selectedVenta.montoVenta}
          </Text>
          {selectedVenta.estatusVenta !== 1 && (
            <View className="mt-8 flex-col gap-5 items-center">
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
            <View className="mt-8 flex-col gap-5 items-center">
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
            <View className="mt-8 flex-col gap-5 items-center">
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

          <Text className="text-2xl font-bold mb-4 text-center text-gray-800">
            Detalle de Venta
          </Text>
          <View className="border-b border-gray-300 mb-5" />
          <Text className="text-lg text-gray-700">Productos:</Text>
          <FlatList
            data={selectedVenta.productosPedido}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ flexGrow: 1, padding: 16 }}
            ListEmptyComponent={() => (
              <View className="flex-1 justify-center items-center">
                {cargando ? (
                  <ActivityIndicator size="small" color="#000" />
                ) : (
                  <>
                    <Image
                      source={images.noResult}
                      className="w-24 h-24"
                      alt="No se encontraron ventas"
                      resizeMode="contain"
                    />
                    <Text className="text-lg text-gray-600">
                      No se encontraron ventas
                    </Text>
                  </>
                )}
              </View>
            )}
            ListHeaderComponent={() => (
              <View className="mb-5">
                <Text className="text-2xl font-bold">
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

const Card: React.FC<CardProps> = ({ detalleVenta }) => {
  return (
    <View className="bg-white p-5 my-2 rounded-lg shadow-md">
      <View className="flex-row items-center">
        <Image
          source={{ uri: detalleVenta.stock.receta.imagen }}
          className="w-24 h-24 mr-2"
          resizeMode="contain"
        />
        <View className="flex-1">
          <Text className="text-lg font-bold">
            {detalleVenta.stock.receta.nombre}
          </Text>
          <Text className="text-base text-gray-600">
            Cantidad: {detalleVenta.cantidad}
          </Text>
          <Text className="text-base text-gray-600">
            Pack: {detalleVenta.pack} cervezas
          </Text>
          <Text className="text-base text-gray-600">
            Costo Unitario: {detalleVenta.costoUnitario}
          </Text>
          <Text className="text-base text-gray-600">
            Total: {detalleVenta.montoVenta}
          </Text>
        </View>
      </View>
    </View>
  );
};
