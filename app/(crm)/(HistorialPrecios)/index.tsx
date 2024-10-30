import React, { ReactNode, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  FlatList,
  Modal,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface HistorialPreciosProps {
  children?: ReactNode;
}

interface Objeto {
  id: number;
  nombre: string;
  precio: number;
  fecha: string;
}

const data: Objeto[] = Array.from({ length: 20 }).map((_, index) => ({
  id: index,
  nombre: "Coca Cola",
  precio: 10,
  fecha: "2021-09-01",
}));

const HistorialPrecios = ({ children }: HistorialPreciosProps) => {
  const [text, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item }: { item: Objeto }) => (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
      }}
    >
      <View style={styles.item}>
        <Text>{item.nombre}</Text>
        <Text>{item.precio}</Text>
        <Text>{item.fecha}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Historial de Precios</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setText(text)}
          value={text}
          placeholder="Buscar"
        />
        <View style={styles.icon}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <ModalReceta
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

const ModalReceta = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalContent}>
        <Text>Hola</Text>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Text>Cerrar</Text>
        </TouchableOpacity>
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
  },
  contentContainer: {
    borderWidth: 2,
    borderColor: "black",
    height: "85%",
    maxHeight: "90%",
    width: "90%",
  },
  inputContainer: {
    borderWidth: 2,
    width: "90%",
    height: 40,
    margin: 12,
    borderRadius: 10,
    borderColor: "gray",
    flexDirection: "row",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    width: "90%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  icon: {
    width: "10%",
    color: "black",
    fontSize: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    height: "auto",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
});

export default HistorialPrecios;
