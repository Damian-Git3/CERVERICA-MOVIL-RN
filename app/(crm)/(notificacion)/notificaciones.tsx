import React, { useEffect } from 'react'; 
import { Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import useNotificaciones from "@/hooks/useNotificaciones";
import { Notificacion } from "@/models/Notificacion"; 
import { StyleSheet } from "react-native";

const Notificaciones = () => {
  const { notificaciones, cargando, getNotificaciones, marcarVisto } = useNotificaciones();

  // Llama a getNotificaciones cuando el componente se monte
  useEffect(() => {
    getNotificaciones();
  }, []);

  return (
    <ScrollView>
      <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>
        Notificaciones
      </Text>
      
      {cargando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        notificaciones?.length ? (
          notificaciones.map((notificacion: Notificacion) => (
            <TouchableOpacity 
              key={notificacion.id}
              onPress={() => marcarVisto(notificacion.id)}
            >
              <View style={notificacion.visto ? styles.moduleCard : styles.moduleCardNotSeen }>
                <Text>{notificacion.mensaje}</Text>
                <Text>{new Date(notificacion.fecha).toLocaleString()}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ padding: 10 }}>No hay notificaciones</Text>
        )
      )}
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  userInfo: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
    marginVertical: 20,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007bff", // Cambia este color según tu diseño
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  initial: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modulesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
  moduleName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#212121", // Color rojo para el botón
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 60,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});


export default Notificaciones;
