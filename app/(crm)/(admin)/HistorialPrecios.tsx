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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useHistorialPrecios from "@/hooks/historialPrecios/useHistorialPrecios";
import {
  HistorialPrecioInsert,
  HistorialPreciosView,
  PreciosRecetaView,
  RecetaView,
} from "@/dtos/HistorialPrecios";

interface HistorialPreciosProps {
  children?: ReactNode;
}

const HistorialPrecios = ({ children }: HistorialPreciosProps) => {
  const [text, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReceta, setSelectedReceta] =
    useState<PreciosRecetaView | null>(null);
  const [filteredRecetas, setFilteredRecetas] = useState<RecetaView[]>([]);
  const { listaRecetas, getListaRecetas } = useHistorialPrecios();
  const { receta, getPrecioReceta } = useHistorialPrecios();
  const { historialPrecios, getHistorialPrecios } = useHistorialPrecios();

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

  const [selectedRecetaId, setSelectedRecetaId] = useState<number | null>(null);

  const handleItemPress = (id: number) => {
    console.log("Modal abierto:", receta);
    getPrecioReceta(id);
    getHistorialPrecios(id);
    setSelectedRecetaId(id);
    setModalVisible(true);
  };

  useEffect(() => {
    if (selectedRecetaId !== null) {
      console.log("Receta obtenida:", receta);
      setSelectedReceta(receta);
    }
  }, [receta, selectedRecetaId]);

  useEffect(() => {
    console.log("Historial de precios obtenido:", historialPrecios);
  }, [historialPrecios]);

  const renderItem = ({ item }: { item: RecetaView }) => (
    <Pressable onPress={() => handleItemPress(item.id)} style={styles.item}>
      <Image source={{ uri: item.imagen as string }} style={styles.itemImage} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemText}>ID: {item.id}</Text>
        <Text style={styles.itemTextMain}>{item.nombre}</Text>
        <Text>$ {item.precio}</Text>
        <Text style={styles.itemStatus}>
          {item.activo ? "Activo" : "Inactivo"}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Precios</Text>
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
          historialPrecios={historialPrecios}
        />
      )}
    </View>
  );
};

const ModalReceta = ({
  modalVisible,
  setModalVisible,
  receta,
  historialPrecios = [],
}: {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  receta: PreciosRecetaView;
  historialPrecios: HistorialPreciosView[];
}) => {
  const [newModalVisible, setNewModalVisible] = useState(false);

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
          <View className="flex flex-row space-x-4">
            <View className="flex-1 items-center justify-center shadow-lg rounded-lg border">
              <Image
                source={{ uri: receta.imagen as string }}
                style={styles.modalImage}
                className="rounded-lg"
              />
            </View>

            <View className="flex-1">
              <Text style={styles.modalTitle}>{receta.nombre}</Text>
              <Text style={styles.modalText}>ID: {receta.id}</Text>
              <Text style={styles.modalText}>
                Estado: {receta.estatus ? "Activo" : "Inactivo"}
              </Text>
              <Text style={styles.modalText}>
                Litro: $ {receta.precioLitro}
              </Text>
            </View>
          </View>
          <View className="flex flex-row justify-between mt-4">
            <View className="w-1/2 p-2 ">
              <Text style={styles.modalText}>
                Paquete 1: $ {receta.precioPaquet1}
              </Text>
            </View>
            <View className="w-1/2 p-2">
              <Text style={styles.modalText}>
                Paquete 6: $ {receta.precioPaquete6}
              </Text>
            </View>
          </View>
          <View className="flex flex-row justify-between ">
            <View className="w-1/2 p-2">
              <Text style={styles.modalText}>
                Paquete 12: $ {receta.precioPaquete12}
              </Text>
            </View>
            <View className="w-1/2 p-2">
              <Text style={styles.modalText}>
                Paquete 24: $ {receta.precioPaquete24}
              </Text>
            </View>
          </View>

          {/* LISTA DE HISTORIAL DE PRECIOS OBTENIDOS */}

          <View className="mt-4">
            <Text className="text-lg font-bold mb-2">Historial de Precios</Text>
            {historialPrecios.length === 0 ? (
              <Text className="text-center text-gray-500">
                Sin cambios de Precio
              </Text>
            ) : (
              <FlatList
                data={historialPrecios}
                keyExtractor={(item) => item.fecha.toString()}
                renderItem={({ item, index }) => {
                  const fecha = new Date(item.fecha);
                  return (
                    <View
                      key={fecha}
                      className={`flex flex-row p-2 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-100"
                      }`}
                    >
                      <Text className="w-1/5 text-xs text-center">
                        {fecha.toLocaleDateString()}
                      </Text>
                      <Text className="w-1/5 text-xs text-center">
                        $ {item.precioPaquete1}
                      </Text>
                      <Text className="w-1/5 text-xs text-center">
                        $ {item.precioPaquete6}
                      </Text>
                      <Text className="w-1/5 text-xs text-center">
                        $ {item.precioPaquete12}
                      </Text>
                      <Text className="w-1/5 text-xs text-center">
                        $ {item.precioPaquete24}
                      </Text>
                    </View>
                  );
                }}
                ListHeaderComponent={() => (
                  <View className="flex flex-row bg-gray-200 p-2">
                    <Text className="w-1/5 font-bold text-xs text-center">
                      Fecha
                    </Text>
                    <Text className="w-1/5 font-bold text-xs text-center">
                      P1
                    </Text>
                    <Text className="w-1/5 font-bold text-xs text-center">
                      P6
                    </Text>
                    <Text className="w-1/5 font-bold text-xs text-center">
                      P12
                    </Text>
                    <Text className="w-1/5 font-bold text-xs text-center">
                      P24
                    </Text>
                  </View>
                )}
              />
            )}
          </View>

          <Pressable
            onPress={() => setNewModalVisible(true)}
            className="mt-4 p-2 bg-blue-500 rounded"
          >
            <Text className="text-white text-center">Nuevo Historial</Text>
          </Pressable>

          <Pressable
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </Pressable>
        </View>
      </View>

      <NuevoHistorialModal
        modalVisible={newModalVisible}
        setModalVisible={setNewModalVisible}
        idReceta={receta.id}
      />
    </Modal>
  );
};

const NuevoHistorialModal = ({
  modalVisible,
  setModalVisible,
  idReceta,
}: {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  idReceta: number;
}) => {
  const [paquete1, setPaquete1] = useState("");
  const [paquete6, setPaquete6] = useState("");
  const [paquete12, setPaquete12] = useState("");
  const [paquete24, setPaquete24] = useState("");
  const { setNuevoPrecio } = useHistorialPrecios();

  const handleSubmit = () => {
    const nuevoHistorial: HistorialPrecioInsert = {
      IdReceta: idReceta,
      Paquete1: parseFloat(paquete1),
      Paquete6: parseFloat(paquete6),
      Paquete12: parseFloat(paquete12),
      Paquete24: parseFloat(paquete24),
    };

    console.log("Nuevo historial de precios:", nuevoHistorial);
    // Aquí puedes agregar la lógica para enviar el nuevo historial al servidor
    setNuevoPrecio(nuevoHistorial);
    setModalVisible(false);
  };

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
        <View style={styles.modalPrecios}>
          <Text className="text-lg font-bold mb-4">
            Nuevo Historial de Precios
          </Text>
          <TextInput
            className="border p-2 mb-2"
            placeholder="Paquete 1"
            keyboardType="numeric"
            value={paquete1}
            onChangeText={setPaquete1}
          />
          <TextInput
            className="border p-2 mb-2"
            placeholder="Paquete 6"
            keyboardType="numeric"
            value={paquete6}
            onChangeText={setPaquete6}
          />
          <TextInput
            className="border p-2 mb-2"
            placeholder="Paquete 12"
            keyboardType="numeric"
            value={paquete12}
            onChangeText={setPaquete12}
          />
          <TextInput
            className="border p-2 mb-2"
            placeholder="Paquete 24"
            keyboardType="numeric"
            value={paquete24}
            onChangeText={setPaquete24}
          />
          <Pressable
            onPress={handleSubmit}
            className="mt-4 p-2 bg-blue-500 rounded"
          >
            <Text className="text-white text-center">Guardar</Text>
          </Pressable>
          <Pressable
            onPress={() => setModalVisible(false)}
            className="mt-4 p-2 bg-gray-500 rounded"
          >
            <Text className="text-white text-center">Cancelar</Text>
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
  itemTextMain: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
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
    borderColor: "black",
  },
  modalContent: {
    width: "80%",
    height: "60%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalPrecios: {
    width: "80%",
    height: "70%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
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
    marginBottom: 0,
    resizeMode: "contain",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
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
