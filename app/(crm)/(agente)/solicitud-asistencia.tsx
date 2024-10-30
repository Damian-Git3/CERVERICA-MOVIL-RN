import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import useSolicitudesAsistencias from "@/hooks/useSolicitudesAsistencias";

const SolicitudAsistencia = () => {
  const {
    solicitudesAsistencias,
    categoriasAsistencias,
    getSolicitudesAsistencias,
    getCategoriasAsistencias,
    cargando,
  } = useSolicitudesAsistencias();

  useEffect(() => {
    getSolicitudesAsistencias();
    getCategoriasAsistencias();
  }, []);

  const handleDetalles = (solicitud) => {
    // Implementa la lógica para mostrar detalles
    console.log(solicitud);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitudes de Asistencia Asignadas</Text>
      <FlatList
        data={solicitudesAsistencias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{item.nombreCategoria}</Text>
              <Text style={styles.cardText}>
                <Text style={styles.bold}>Descripción:</Text> {item.descripcion}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.bold}>Fecha de Solicitud:</Text>{" "}
                {new Date(item.fechaSolicitud).toLocaleString()}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.bold}>Cliente:</Text> {item.nombreAgente} (
                {item.emailAgente})
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.bold}>Estatus:</Text>{" "}
                {item.estatus === 1
                  ? "Enviado"
                  : item.estatus === 2
                  ? "Atendido"
                  : "Cerrada"}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleDetalles(item)}
              >
                <Text style={styles.buttonText}>Detalles</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        numColumns={2}
      />
      <View style={styles.separator} />
      <Text style={styles.subtitle}>Categorías</Text>
      <FlatList
        data={categoriasAsistencias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.categoryItem} key={item.id}>
            {item.nombre}
          </Text>
        )}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edición Categorías</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 4,
    elevation: 2,
    flex: 1,
    marginBottom: 16,
  },
  cardBody: {
    // Add any additional styling if needed
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
  bold: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
  },
  categoryItem: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default SolicitudAsistencia;
