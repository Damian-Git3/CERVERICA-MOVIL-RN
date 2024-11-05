import SolicitudMayoristaCard from "@/components/Agente/SolicitudesMayoristas/SolicitudMayoristaCard";
import { images } from "@/constants";
import AuthContext from "@/context/Auth/AuthContext";
import useSolicitudesMayoristas from "@/hooks/useSolicitudesMayoristas";
import { SolicitudMayorista } from "@/models/SolicitudesMayoristas";
import useSolicitudesMayoristasStore from "@/stores/SolicitudesMayoristasStore";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  Button,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ListaSolicitudes = () => {
  const { getSolicitudesMayoristas, solicitudesMayoristas, cargando } =
    useSolicitudesMayoristas();
  const { session } = useContext(AuthContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filteredSolicitudes, setFilteredSolicitudes] = useState(
    solicitudesMayoristas
  );
  const [filtrosLista, setFiltrosLista] = useState({
    noAtendidos: false,
    mayorMenor: false,
  });

  useEffect(() => {
    getSolicitudesMayoristas!();
  }, []);

  useEffect(() => {
    setFilteredSolicitudes(solicitudesMayoristas); // Actualiza la lista cuando cambien las solicitudes
  }, [solicitudesMayoristas]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await getSolicitudesMayoristas!();
    setIsRefreshing(false);
  };

  const handlePressSolicitud = (solicitudMayorista: SolicitudMayorista) => {
    const setSolicitudMayorista =
      useSolicitudesMayoristasStore.getState().setSolicitudMayorista;

    setSolicitudMayorista(solicitudMayorista);

    switch (solicitudMayorista.estatus) {
      case 1:
        router.push("/(agente)/(solicitudes-mayoristas)/prospecto-solicitud");
        break;

      default:
        console.log("Método no soportado");
        break;
    }
  };

  const handleFilterNoAtendidos = () => {
    if (!filtrosLista.noAtendidos) {
      const noAtendidos = solicitudesMayoristas.filter(
        (solicitud: SolicitudMayorista) => solicitud.estatus === 1
      );

      setFilteredSolicitudes(noAtendidos);
    } else {
      setFilteredSolicitudes(solicitudesMayoristas);
    }

    setFiltrosLista({
      mayorMenor: false,
      noAtendidos: !filtrosLista.noAtendidos,
    });
  };

  const handleOrdenarMayorAMenor = () => {
    if (!filtrosLista.mayorMenor) {
      const sorted = solicitudesMayoristas.sort(
        (a: SolicitudMayorista, b: SolicitudMayorista) => b.estatus - a.estatus
      );

      setFilteredSolicitudes(sorted);
    } else {
      setFilteredSolicitudes(solicitudesMayoristas);
    }

    setFiltrosLista({
      noAtendidos: false,
      mayorMenor: !filtrosLista.mayorMenor,
    });
  };

  return (
    <View className="flex-1 px-3">
      <FlatList
        data={filteredSolicitudes}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePressSolicitud(item)}
            key={item.id}
          >
            <SolicitudMayoristaCard solicitudMayorista={item} />
          </TouchableOpacity>
        )}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {cargando ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No se encontraron solicitudes de mayoristas"
                  resizeMode="contain"
                />
                <Text className="text-sm">
                  No se encontraron solicitudes de mayoristas
                </Text>
              </>
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="flex flex-col my-5">
            <Text className="text-2xl font-JakartaExtraBold mb-3">
              Bienvenido {session?.nombre} 👋
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex flex-row gap-2">
                <TouchableOpacity
                  onPress={handleFilterNoAtendidos}
                  style={{
                    backgroundColor: filtrosLista.noAtendidos
                      ? "#ED9224"
                      : "#E0E0E0",
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      color: filtrosLista.noAtendidos ? "#FFFFFF" : "#000000",
                    }}
                  >
                    No atendidos
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleOrdenarMayorAMenor}
                  style={{
                    backgroundColor: filtrosLista.mayorMenor
                      ? "#ED9224"
                      : "#E0E0E0",
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      color: filtrosLista.mayorMenor ? "#FFFFFF" : "#000000",
                    }}
                  >
                    Ordenar Mayor a Menor
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}
      />
    </View>
  );
};

export default ListaSolicitudes;
