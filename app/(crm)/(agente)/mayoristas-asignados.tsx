import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import usePagos from "@/hooks/usePagos";

const MayoristasAsignados = () => {
  const { mayoristasAsignados, getMayoristasAsignados, cargando } = usePagos();
  const [searchText, setSearchText] = useState("");
  const [estatus, setEstatus] = useState("Todos");
  const [filteredMayoristas, setFilteredMayoristas] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getMayoristasAsignados();
  }, []);

  useEffect(() => {
    filterSolicitudes();
  }, [searchText, estatus, mayoristasAsignados]);

  const filterSolicitudes = () => {
    if (!mayoristasAsignados) return;
    const filtered = mayoristasAsignados.filter(
      (mayorista) =>
        mayorista.nombreEmpresa
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        mayorista.rfcEmpresa.toLowerCase().includes(searchText.toLowerCase()) ||
        mayorista.nombreContacto
          .toLowerCase()
          .includes(searchText.toLowerCase())
    );
    setFilteredMayoristas(filtered);
  };

  const handleMayoristaClick = (id) => {
    router.push({
      pathname: "/(agente)/pagos",
      params: { idMayorista: id },
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleMayoristaClick(item.id)}
    >
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.nombreEmpresa}</Text>
        <Text style={styles.cardText}>RFC: {item.rfcEmpresa}</Text>
        <Text style={styles.cardText}>Contacto: {item.nombreContacto}</Text>
        <Text style={styles.cardText}>Teléfono: {item.telefonoEmpresa}</Text>
        <Text style={styles.cardText}>Email: {item.emailEmpresa}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clientes Mayoristas Asignados</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre, RFC o contacto"
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredMayoristas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={
          !cargando && <Text>No se encontraron clientes mayoristas</Text>
        }
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  cardBody: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardText: {
    marginVertical: 5,
  },
});

export default MayoristasAsignados;
