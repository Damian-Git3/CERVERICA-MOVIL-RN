import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Button,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import usePagos from "@/hooks/usePagos";

import Toast from "react-native-toast-message";
import { set } from "react-hook-form";

const Pagos = () => {
  const { pagos, getPagosMayorista, marcarPago, cargando } = usePagos();

  const [searchText, setSearchText] = useState("");
  const [estatus, setEstatus] = useState("Todos");
  const [filteredPagos, setFilteredPagos] = useState([]);
  const [idPagoSeleccionado, setIdPagoSeleccionado] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const { idMayorista } = useLocalSearchParams();

  const handleVolver = () => {
    router.replace("/mayoristas-asignados");
  };

  const handleMarcarPago = async () => {
    if (idPagoSeleccionado) {
      const res = await marcarPago(idPagoSeleccionado);
      getPagosMayorista(Number(idMayorista));
      return res;
    } else {
      Toast.show({
        type: "error",
        text1: "Error ❌",
        text2: "No se pudo marcar el pago",
      });
    }
  };

  const handleConfirmSubmit = async () => {
    const res = await handleMarcarPago();

    setModalVisible(false);
    console.log(res);

    if (res?.status == 200) {
      Toast.show({
        type: "success",
        text1: "Éxito! 🎉",
        text2: "Pago reflejado",
      });
      handleVolver();
    } else {
      Toast.show({
        type: "error",
        text1: "Error ❌",
        text2: "No se pudo marcar el pago",
      });
    }
  };

  useEffect(() => {
    getPagosMayorista(Number(idMayorista));
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

  const handlePagoSeleccionado = (idPago) => {
    setModalVisible(true);
    setIdPagoSeleccionado(idPago);
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
        {item.estatus === 1 && (
          <TouchableOpacity
            style={{
              backgroundColor: "#4caf50",
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
            }}
            onPress={() => handlePagoSeleccionado(item.id)}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Reflejar pago
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Modal de Confirmación */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar Pago</Text>
            <Text>¿Estás seguro de que deseas marcar el pago?</Text>
            <View style={styles.modalActions}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button
                title="Confirmar"
                onPress={handleConfirmSubmit}
                color="#28a745"
              />
            </View>
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>Pagos</Text>
      {/* Botón de Volver */}
      <TouchableOpacity onPress={handleVolver} style={styles.backButton}>
        <Text style={styles.backButtonText}>⬅ Volver</Text>
      </TouchableOpacity>

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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
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
  backButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "flex-start",
    marginVertical: 10,
  },
  backButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Pagos;
