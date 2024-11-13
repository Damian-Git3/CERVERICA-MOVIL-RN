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
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const ListaSolicitudes = () => {
  const { getSolicitudesAgente, solicitudesMayoristas, cargando } =
    useSolicitudesMayoristas();
  const { session } = useContext(AuthContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filteredSolicitudes, setFilteredSolicitudes] = useState(
    solicitudesMayoristas
  );
  const [filtrosLista, setFiltrosLista] = useState({
    confirmando: false,
    mayorMenor: false,
    menorMayor: false,
  });

  useEffect(() => {
    getSolicitudesAgente();
  }, []);

  useEffect(() => {
    setFilteredSolicitudes(solicitudesMayoristas);
  }, [solicitudesMayoristas]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await getSolicitudesAgente();
    setIsRefreshing(false);
  };

  const handlePressSolicitud = (solicitudMayorista: SolicitudMayorista) => {
    const setSolicitudMayorista =
      useSolicitudesMayoristasStore.getState().setSolicitudMayorista;

    setSolicitudMayorista(solicitudMayorista);

    switch (solicitudMayorista.estatus) {
      case 2:
        router.push("/(agente)/(solicitudes-mayoristas)/confirmando-solicitud");
        break;
    }
  };

  const toggleFilter = (filterType: string) => {
    let updatedList = solicitudesMayoristas;
    if (filterType === "confirmando") {
      updatedList = filtrosLista.confirmando
        ? solicitudesMayoristas
        : solicitudesMayoristas.filter(
            (solicitud: SolicitudMayorista) => solicitud.estatus === 2
          );
    } else if (filterType === "mayorMenor") {
      updatedList = filtrosLista.mayorMenor
        ? solicitudesMayoristas
        : [...solicitudesMayoristas].sort((a, b) => b.estatus - a.estatus);
    } else if (filterType === "menorMayor") {
      updatedList = filtrosLista.menorMayor
        ? solicitudesMayoristas
        : [...solicitudesMayoristas].sort((a, b) => a.estatus - b.estatus);
    }
    setFilteredSolicitudes(updatedList);

    setFiltrosLista((prevState) => ({
      confirmando:
        filterType === "confirmando" ? !prevState.confirmando : false,
      mayorMenor: filterType === "mayorMenor" ? !prevState.mayorMenor : false,
      menorMayor: filterType === "menorMayor" ? !prevState.menorMayor : false,
    }));
  };

  const filtrosScroll = [
    {
      titulo: "Confirmando",
      accion: () => toggleFilter("confirmando"),
      nombreFiltro: "confirmando",
    },
    {
      titulo: "Mayor a menor",
      accion: () => toggleFilter("mayorMenor"),
      nombreFiltro: "mayorMenor",
    },
    {
      titulo: "Menor a mayor",
      accion: () => toggleFilter("menorMayor"),
      nombreFiltro: "menorMayor",
    },
  ];

  const getButtonStyle = (isActive: boolean) => ({
    backgroundColor: isActive ? "#ED9224" : "#E0E0E0",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  });

  return (
    <View style={styles.container}>
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
          <View style={styles.emptyContainer}>
            {cargando ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <>
                <Image
                  source={images.noResult}
                  style={styles.noResultImage}
                  alt="No se encontraron solicitudes de mayoristas"
                  resizeMode="contain"
                />
                <Text style={styles.noResultText}>
                  No se encontraron solicitudes de mayoristas
                </Text>
              </>
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}>
              Bienvenido {session?.nombre} 👋
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filtersContainer}>
                {filtrosScroll.map((filtro, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={filtro.accion}
                    style={getButtonStyle(
                      filtrosLista[
                        filtro.nombreFiltro as keyof typeof filtrosLista
                      ]
                    )}
                  >
                    <Text>{filtro.titulo}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 12 },
  emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  noResultImage: { width: 160, height: 160 },
  noResultText: { fontSize: 14, color: "#333" },
  headerContainer: { marginVertical: 20 },
  welcomeText: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  filtersContainer: { flexDirection: "row", gap: 8 },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
});

export default ListaSolicitudes;
