import React, { useEffect } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import useNotificaciones from "@/hooks/useNotificaciones";
import { Notificacion } from "@/models/Notificacion"; 

const Notificaciones = () => {
  const { notificaciones, cargando, getNotificaciones } = useNotificaciones();

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
            <View key={notificacion.id} style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text>{notificacion.mensaje}</Text>
              <Text>{new Date(notificacion.fecha).toLocaleString()}</Text>
              <Text>{notificacion.visto ? "Visto" : "No visto"}</Text>
            </View>
          ))
        ) : (
          <Text style={{ padding: 10 }}>No hay notificaciones</Text>
        )
      )}
    </ScrollView>
  );
}

export default Notificaciones;
