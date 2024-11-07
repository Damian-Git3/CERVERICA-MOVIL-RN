import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  Dimensions,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import AuthContext from "@/context/Auth/AuthContext";
import Toast from "react-native-toast-message";
import useSolicitudesAsistencias from "@/hooks/solicitudesAsistencias/useSolicitudesAsistencias";

const SolicitudAsistencia = () => {
  const { session } = useContext(AuthContext);
  const {
    nuevaSolicitud,
    crearSolicitudAsistencia,
    categoriasAsistencias,
    getCategoriasAsistencias,
  } = useSolicitudesAsistencias();

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const formValido = categoriaSeleccionada && descripcion.trim().length > 0;

  useEffect(() => {
    getCategoriasAsistencias();
  }, []);

  const handleVolver = () => {
    router.push("/solicitud-asistencia");
  };

  const handleConfirmSubmit = async () => {
    if (formValido) {
      const mayoreo = session.rol == "Cliente" ? false : true;
      const res = await crearSolicitudAsistencia({
        idCategoriaAsistencia: Number(categoriaSeleccionada),
        mayoreo: mayoreo,
        descripcion: descripcion,
        tipo: 0,
      });

      setModalVisible(false);

      if (res?.status == 200) {
        Toast.show({
          type: "success",
          text1: "Éxito! 🎉",
          text2: "Espera la respuesta de nuestros agentes",
        });
        router.push("/solicitud-asistencia");
      } else {
        Toast.show({
          type: "error",
          text1: "Error ❌",
          text2: "No se pudo enviar la Solicitud",
        });
      }
    } else {
      Toast.show({
        type: "info",
        text1: "Formulario incompleto!",
        text2: "Por favor selecciona una categoría y escribe una descripción.",
      });
    }
  };

  const handleCategoriaSeleccion = (categoria) => {
    setCategoriaSeleccionada(categoria.id);
    setDropdownVisible(false);
  };

  const filteredCategorias = categoriasAsistencias
    ? categoriasAsistencias.filter((categoria) =>
        categoria.nombre.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <View style={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Botón de Volver */}
        <TouchableOpacity onPress={handleVolver} style={styles.backButton}>
          <Text style={styles.backButtonText}>⬅ Volver</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Nueva Solicitud de Asistencia</Text>

        {/* Selector de Categoría */}
        <View style={styles.field}>
          <Text style={styles.label}>Categoría de Asistencia</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setDropdownVisible(true)}
          >
            <Text>
              {categoriaSeleccionada
                ? categoriasAsistencias.find(
                    (cat) => cat.id === categoriaSeleccionada
                  )?.nombre
                : "Selecciona una categoría"}
            </Text>
          </TouchableOpacity>

          {/* Modal para el Selector */}
          <Modal visible={dropdownVisible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.dropdownContent}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar categoría..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <ScrollView
                  style={styles.dropdownList}
                  contentContainerStyle={{ paddingBottom: 10 }}
                >
                  {filteredCategorias.map((categoria) => (
                    <TouchableOpacity
                      key={categoria.id}
                      style={styles.dropdownItem}
                      onPress={() => handleCategoriaSeleccion(categoria)}
                    >
                      <Text>{categoria.nombre}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <Button
                  title="Cerrar"
                  onPress={() => setDropdownVisible(false)}
                />
              </View>
            </View>
          </Modal>
        </View>

        {/* Campo de Descripción */}
        <View style={styles.field}>
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            value={descripcion}
            onChangeText={setDescripcion}
            placeholder="Describe tu solicitud"
          />
        </View>

        {/* Botón de Envío */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[
            styles.submitButton,
            !formValido && { backgroundColor: "#d3d3d3" }, // Estilo deshabilitado
          ]}
          disabled={!formValido}
        >
          <Text style={styles.buttonText}>Enviar Solicitud</Text>
        </TouchableOpacity>

        {/* Modal de Confirmación */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirmar Envío</Text>
              <Text>¿Estás seguro de que deseas enviar esta solicitud?</Text>
              <View style={styles.modalActions}>
                <Button
                  title="Cancelar"
                  onPress={() => setModalVisible(false)}
                />
                <Button
                  title="Confirmar"
                  onPress={handleConfirmSubmit}
                  color="#28a745"
                />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 16,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dropdown: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dropdownContent: {
    width: "80%",
    maxHeight: 300,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dropdownList: {
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
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

export default SolicitudAsistencia;
