import React, { useContext, useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { Badge } from "react-native-elements";
import { Venta } from "@/models/venta";
import VentaContext from "@/context/Venta/VentaContext";
import AuthContext from "@/context/Auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { images } from "@/constants";
import useVentas from "@/hooks/useVentas";
import useVentaStore from "@/stores/VentasStore";
import { router } from "expo-router";

interface ListVentasProps {
  data: Venta[];
}

interface CardProps {
  venta: Venta;
}

export const ListVentas: React.FC<ListVentasProps> = () => {
  const { ventas, getVentas, cargando } = useVentas();
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
      const filtered: Venta[] = ventas.filter((venta: Venta) =>
        Object.values(venta).some((value: any) =>
          typeof value === 'string' && value.toLowerCase().includes(text.toLowerCase())
        )
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

  const handlePressVenta = (venta: Venta) => {
    const setVentaSeleccionada = useVentaStore.getState().setVenta;
    setVentaSeleccionada(venta);
    router.push("/(crm)/(admin)/(ventas)/detalle-venta");
  }

  const renderItem = ({ item }: { item: Venta }) => (
    <TouchableOpacity onPress={() => handlePressVenta(item)}>
      <Card venta={item} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar"
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredVentas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
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
              Bienvenido {session?.nombre} 👋
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
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
  list: {
    flexGrow: 1,
    padding: 16,
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultImage: {
    width: 100,
    height: 100,
  },
  noResultText: {
    fontSize: 16,
    color: "#666",
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
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
          badgeStyle={{
            backgroundColor: severityColors[severity] || severityColors.default,
          }}
          textStyle={{ color: "white" }}
        />
      </Text>
      <Text style={styles.description}>Monto: ${venta.montoVenta}</Text>
    </View>
  );
};
