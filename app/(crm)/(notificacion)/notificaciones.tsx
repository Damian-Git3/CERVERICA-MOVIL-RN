import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import useNotificaciones from "@/hooks/useNotificaciones";
import { Notificacion } from "@/models/Notificacion";
import { StyleSheet } from "react-native";

const Notificaciones = () => {
  const { notificaciones, cargando, getNotificaciones, marcarVisto } =
    useNotificaciones();
  const [orden, setOrden] = useState<boolean>(false); // Ordenación ascendente (false) o descendente (true)
  const [criterio, setCriterio] = useState<string>(""); // Para el filtro de búsqueda de texto

  // Llama a getNotificaciones cuando el componente se monte
  useEffect(() => {
    getNotificaciones();
  }, []);

  // Función para ordenar y filtrar las notificaciones
  const procesarNotificaciones = () => {
    // Asegurarse de que notificaciones sea un array antes de proceder
    if (!Array.isArray(notificaciones)) {
      return [];
    }

    const notificacionesFiltradas = notificaciones.filter(
      (notificacion: Notificacion) => {
        const mensaje = notificacion.mensaje.toLowerCase();
        return mensaje.includes(criterio.toLowerCase());
      }
    );

    return notificacionesFiltradas.sort((a, b) => {
      const fechaA = new Date(a.fecha).getTime();
      const fechaB = new Date(b.fecha).getTime();
      return orden ? fechaB - fechaA : fechaA - fechaB;
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Notificaciones</Text>

      {/* Filtro de búsqueda */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por mensaje..."
          value={criterio}
          onChangeText={(text) => setCriterio(text)}
        />
      </View>

      {/* Filtro de orden por fecha */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Ordenar por fecha: </Text>
        <Switch value={orden} onValueChange={(value) => setOrden(value)} />
        <Text>{orden ? "Descendente" : "Ascendente"}</Text>
      </View>

      {cargando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : notificaciones && notificaciones.length > 0 ? (
        procesarNotificaciones().map((notificacion: Notificacion) => (
          <TouchableOpacity
            key={notificacion.id}
            onPress={() => marcarVisto(notificacion.id)}
          >
            <View
              style={
                notificacion.visto
                  ? styles.moduleCard
                  : styles.moduleCardNotSeen
              }
            >
              <Text>{notificacion.mensaje}</Text>
              <Text>{new Date(notificacion.fecha).toLocaleString()}</Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noNotifications}>No hay notificaciones</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  searchContainer: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  moduleCard: {
    backgroundColor: "#fff",
    width: "98%", // Dos columnas
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  moduleCardNotSeen: {
    backgroundColor: "orange",
    width: "98%", // Dos columnas
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  noNotifications: {
    padding: 10,
    fontSize: 16,
    color: "#888",
  },
});

export default Notificaciones;
