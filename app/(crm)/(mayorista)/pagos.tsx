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

const Pagos = () => {
  const { pagos, getPagosPropiosMayorista, cargando } = usePagos();

  const [searchText, setSearchText] = useState("");
  const [estatus, setEstatus] = useState("Todos");
  const [filteredPagos, setFilteredPagos] = useState([]);

  useEffect(() => {
    getPagosPropiosMayorista();
    console.log("Pagos:", pagos);
  }, []);

  useEffect(() => {
    filterSolicitudes();
  }, [searchText, estatus, pagos]);

  const filterSolicitudes = () => {
    if (!pagos) return;
    const filtered = pagos.filter((pago) => {
      const matchesText =
        pago.comprobante.toLowerCase().includes(searchText.toLowerCase()) ||
        (pago.fechaVencimiento
          ? new Date(pago.fechaVencimiento)
              .toLocaleDateString()
              .includes(searchText)
          : false) ||
        (pago.fechaPago
          ? new Date(pago.fechaPago).toLocaleDateString().includes(searchText)
          : false) ||
        pago.monto.toString().includes(searchText);

      const matchesEstatus =
        estatus === "Todos" || parseInt(estatus) === pago.estatus;

      return matchesText && matchesEstatus;
    });
    setFilteredPagos(filtered);
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.card,
        item.estatus === 1
          ? styles.cardPending
          : item.estatus === 2
          ? styles.cardPaid
          : styles.cardUnpaid,
      ]}
    >
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>ID: {item.id}</Text>
        <Text style={styles.cardText}>Comprobante: {item.comprobante}</Text>
        <Text style={styles.cardText}>
          Fecha Vencimiento:{" "}
          {new Date(item.fechaVencimiento).toLocaleDateString()}
        </Text>
        <Text style={styles.cardText}>
          Fecha Pago:{" "}
          {item.fechaPago
            ? new Date(item.fechaPago).toLocaleDateString()
            : "N/A"}
        </Text>
        <Text style={styles.cardText}>Monto: ${item.monto}</Text>
        <Text style={styles.cardText}>
          Estatus:{" "}
          {item.estatus === 1
            ? "Pendiente"
            : item.estatus === 2
            ? "Pagado"
            : "Impago"}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagos</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por comprobante, fecha o monto..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      <Picker
        selectedValue={estatus}
        style={styles.picker}
        onValueChange={(itemValue) => setEstatus(itemValue)}
      >
        <Picker.Item label="Todos" value="Todos" />
        <Picker.Item label="Pendiente" value="1" />
        <Picker.Item label="Pagado" value="2" />
        <Picker.Item label="Impago" value="3" />
      </Picker>

      <FlatList
        data={filteredPagos}
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
  picker: {
    height: 50,
    padding: 10,
    width: "100%",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f2f2f2",
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
  cardPending: {
    borderColor: "#ffcc00", // Amarillo para pendiente
    backgroundColor: "#fff8e1",
  },
  cardPaid: {
    borderColor: "#4caf50", // Verde para pagado
    backgroundColor: "#e8f5e9",
  },
  cardUnpaid: {
    borderColor: "#f44336", // Rojo para impago
    backgroundColor: "#ffebee",
  },
});

export default Pagos;
