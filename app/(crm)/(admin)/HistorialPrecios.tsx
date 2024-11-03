import useHistorialPrecios from "@/hooks/historialPrecios/useHistorialPrecios";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { ReactNode, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface HistorialPreciosProps {
  children?: ReactNode;
}

interface RecetaView {
  id: number;
  nombre: string;
  imagen: string | number;
  activo: boolean;
}

const HistorialPrecios = ({ children }: HistorialPreciosProps) => {
  const [text, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReceta, setSelectedReceta] = useState<RecetaView | null>(null);
  const [filteredRecetas, setFilteredRecetas] = useState<RecetaView[]>([]);
  const { listaRecetas, getListaRecetas } = useHistorialPrecios();

  useEffect(() => {
    getListaRecetas();
  }, []);

  useEffect(() => {
    setFilteredRecetas(listaRecetas);
  }, [listaRecetas]);

  const handleSearch = (text: string) => {
    setText(text);
    if (text) {
      const filtered = listaRecetas.filter((receta: { nombre: string }) =>
        receta.nombre.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredRecetas(filtered);
    } else {
      setFilteredRecetas(listaRecetas);
    }
  };

  const handleItemPress = (receta: RecetaView) => {
    console.log("Modal abierto:", receta);
    setSelectedReceta(receta);
    setModalVisible(true);
    // Verifica que se active
  };

  const renderItem = ({ item }: { item: RecetaView }) => (
    <Pressable onPress={() => handleItemPress(item)} style={styles.item}>
      <Image source={{ uri: item.imagen as string }} style={styles.itemImage} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemText}>{item.id}</Text>
        <Text style={styles.itemText}>{item.nombre}</Text>
        <Text style={styles.itemStatus}>
          {item.activo ? "Activo" : "Inactivo"}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Historial de Precios</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleSearch}
          value={text}
          placeholder="Buscar"
        />
        <View style={styles.icon}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <FlatList
          data={filteredRecetas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      {selectedReceta && (
        <ModalReceta
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          receta={selectedReceta}
        />
      )}
    </View>
  );
};

const ModalReceta = ({
  modalVisible,
  setModalVisible,
  receta,
}: {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  receta: RecetaView;
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Image
            source={{ uri: receta.imagen as string }}
            style={styles.modalImage}
          />
          <Text style={styles.modalTitle}>{receta.nombre}</Text>
          <Text style={styles.modalText}>ID: {receta.id}</Text>
          <Text style={styles.modalText}>
            Estado: {receta.activo ? "Activo" : "Inactivo"}
          </Text>
          <Pressable
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 22,
    color: "black",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 40,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingLeft: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  icon: {
    width: 30,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: "contain",
  },
  itemTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  itemText: {
    fontSize: 16,
    color: "black",
  },
  itemStatus: {
    fontSize: 14,
    color: "gray",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#2196F3",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default HistorialPrecios;
