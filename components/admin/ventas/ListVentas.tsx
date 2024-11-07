import React, { useContext, useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { Badge } from "react-native-elements";
import { Venta } from "@/models/venta";
import AuthContext from "@/context/Auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { images } from "@/constants";
import useVentas from "@/hooks/useVentas";
import { router } from "expo-router";

interface ListVentasProps {
  data: Venta[];
}

interface CardProps {
  venta: Venta;
}

export const ListVentas: React.FC<ListVentasProps> = () => {
  const { ventas, getVentas, cargando, getVenta } = useVentas();
  const { session } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const [filteredVentas, setFilteredVentas] = useState<Venta[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (getVentas) {
      getVentas();
    }
  }, []);

  useEffect(() => {
    setFilteredVentas(ventas);
  }, [ventas]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text) {
      const filtered: Venta[] = ventas.filter(
        (venta: Venta) =>
          venta.id.toString().includes(text) ||
          venta.fechaVenta.toLowerCase().includes(text.toLowerCase()) ||
          venta.totalCervezas.toString().includes(text) ||
          obtenerMetodoEnvio(venta.metodoEnvio)
            .toLowerCase()
            .includes(text.toLowerCase()) ||
          obtenerMetodoPago(venta.metodoPago)
            .toLowerCase()
            .includes(text.toLowerCase()) ||
          obtenerNombreEstatusVenta(venta.estatusVenta)
            .toLowerCase()
            .includes(text.toLowerCase()) ||
          venta.montoVenta.toString().includes(text)
      );
      setFilteredVentas(filtered);
    } else {
      setFilteredVentas(ventas);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await getVentas();
    setIsRefreshing(false);
  };

  const handlePressVenta = async (id: number) => {
    router.push(`/(crm)/(admin)/(ventas)/detalle-venta?id=${id}`);
  };

  const renderItem = ({ item }: { item: Venta }) => (
    <TouchableOpacity onPress={() => handlePressVenta(item.id)}>
      <Card venta={item} />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-4">
      <TextInput
        className="h-10 border border-gray-300 rounded-lg px-3 mb-4"
        placeholder="Buscar"
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredVentas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
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
              Bienvenido {session?.nombre} 👋
            </Text>
          </View>
        )}
      />
    </View>
  );
};

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
    <View className="bg-white p-5 my-2 rounded-lg shadow-md">
      <Text className="text-lg font-bold">Venta ID: {venta.id}</Text>
      <Text className="text-base text-gray-600">Fecha: {formattedDate}</Text>
      <Text className="text-base text-gray-600">
        Total Cervezas: {venta.totalCervezas}
      </Text>
      <Text className="text-base text-gray-600">
        Método de Envío: {obtenerMetodoEnvio(venta.metodoEnvio)}
      </Text>
      <Text className="text-base text-gray-600">
        Método de Pago: {obtenerMetodoPago(venta.metodoPago)}
      </Text>
      <Text className="text-base text-gray-600">
        Estatus:
        <Badge
          value={nombreEstatus}
          badgeStyle={{
            backgroundColor: severityColors[severity] || severityColors.default,
          }}
          textStyle={{ color: "white" }}
        />
      </Text>
      <Text className="text-base text-gray-600">
        Monto: ${venta.montoVenta}
      </Text>
    </View>
  );
};
