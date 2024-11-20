import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import useSolicitudesAsistencias from "@/hooks/solicitudesAsistencias/useSolicitudesAsistencias";

const SolicitudAsistencia = () => {
  const {
    solicitudesAsistenciasAgente,
    getSolicitudesAsistenciasAgente,
    cargando,
  } = useSolicitudesAsistencias();

  const [showActive, setShowActive] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredSolicitudes, setFilteredSolicitudes] = useState([]);

  useEffect(() => {
    getSolicitudesAsistenciasAgente(showActive);
    console.log(solicitudesAsistenciasAgente);
  }, [showActive]);

  useEffect(() => {
    filterSolicitudes(searchText);
  }, [searchText, solicitudesAsistenciasAgente]);

  const router = useRouter();

  const handleDetalles = (solicitud) => {
    if (solicitud.estatus === 3) {
      router.push({
        pathname: "/detalle-solicitud-asistencia-historico",
        params: { solicitudId: solicitud.id },
      });
    } else {
      router.push({
        pathname: "/detalle-solicitud-asistencia",
        params: { solicitudId: solicitud.id },
      });
    }
  };

  const filterSolicitudes = (text) => {
    if (!text) {
      setFilteredSolicitudes(solicitudesAsistenciasAgente);
    } else {
      const filtered = solicitudesAsistenciasAgente.filter(
        (item) =>
          item.nombreCategoria.toLowerCase().includes(text.toLowerCase()) ||
          item.descripcion.toLowerCase().includes(text.toLowerCase()) ||
          item.nombreAgente.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSolicitudes(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.nombreCategoria}</Text>
        <Text style={styles.cardText}>
          <Text>Descripción:</Text> {item.descripcion}
        </Text>
        <Text style={styles.cardText}>
          <Text>Fecha de Solicitud:</Text>{" "}
          {new Date(item.fechaSolicitud).toLocaleString()}
        </Text>
        <Text style={styles.cardText}>
          <Text>Cliente:</Text> {item.nombreCliente} ({item.emailCliente})
        </Text>
        <Text style={styles.cardText}>
          <Text>Estatus:</Text>{" "}
          {item.estatus === 1
            ? "Enviado"
            : item.estatus === 3
            ? "Cerrado"
            : "Seguimiento"}
        </Text>
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => handleDetalles(item)}
        >
          <Text style={styles.buttonText}>Detalles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Solicitudes de Asistencia</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              showActive ? styles.activeButton : styles.inactiveButton,
            ]}
            onPress={() => setShowActive(true)}
          >
            <Text style={styles.toggleButtonText}>Activas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              !showActive ? styles.activeButton : styles.inactiveButton,
            ]}
            onPress={() => setShowActive(false)}
          >
            <Text style={styles.toggleButtonText}>Históricas</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar solicitud..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      <FlatList
        data={filteredSolicitudes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  newRequestButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
  },
  header: {
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleContainer: {
    flexDirection: "row",
  },
  toggleButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 5,
  },
  activeButton: {
    backgroundColor: "#007bff",
  },
  inactiveButton: {
    backgroundColor: "#ddd",
  },
  toggleButtonText: {
    color: "#fff",
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    marginVertical: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  cardBody: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardText: {
    marginVertical: 5,
  },
  detailButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  searchContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  searchButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SolicitudAsistencia;
