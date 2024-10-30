import React, { useEffect } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import useSolicitudesAsistencias from "@/hooks/useSolicitudesAsistencias";
import tailwind from "tailwind-rn";

const SolicitudAsistencia = () => {
  const {
    solicitudesAsistencias,
    categoriasAsistencias,
    getSolicitudesAsistencias,
    getCategoriasAsistencias,
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
    <View style={tailwind("container mx-auto mt-3")}>
      <Text style={tailwind("text-2xl font-bold")}>
        Solicitudes de Asistencia Asignadas
      </Text>
      <View style={tailwind("flex flex-row flex-wrap")}>
        <FlatList
          data={solicitudesAsistencias}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={tailwind("w-full md:w-1/2 lg:w-1/3 p-2")}
              key={item.id}
            >
              <View style={tailwind("bg-white rounded-lg shadow mt-3")}>
                <View style={tailwind("p-4")}>
                  <Text style={tailwind("text-lg font-semibold")}>
                    {item.nombreCategoria}
                  </Text>
                  <Text style={tailwind("mt-2")}>
                    <Text style={tailwind("font-bold")}>Descripción:</Text>{" "}
                    {item.descripcion}
                  </Text>
                  <Text style={tailwind("mt-2")}>
                    <Text style={tailwind("font-bold")}>
                      Fecha de Solicitud:
                    </Text>{" "}
                    {new Date(item.fechaSolicitud).toLocaleString()}
                  </Text>
                  <Text style={tailwind("mt-2")}>
                    <Text style={tailwind("font-bold")}>Cliente:</Text>{" "}
                    {item.nombreAgente} ({item.emailAgente})
                  </Text>
                  <Text style={tailwind("mt-2")}>
                    <Text style={tailwind("font-bold")}>Estatus:</Text>{" "}
                    {item.estatus === 1
                      ? "Enviado"
                      : item.estatus === 2
                      ? "Atendido"
                      : "Cerrada"}
                  </Text>
                  <TouchableOpacity
                    style={tailwind(
                      "bg-blue-500 text-white py-2 px-4 rounded mt-3"
                    )}
                    onPress={() => handleDetalles(item)}
                  >
                    <Text style={tailwind("text-center")}>Detalles</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          numColumns={2}
        />
      </View>
      <View style={tailwind("border-b my-4")} />
      <Text style={tailwind("text-xl font-bold")}>Categorías</Text>
      <FlatList
        data={categoriasAsistencias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={tailwind("py-2")} key={item.id}>
            {item.nombre}
          </Text>
        )}
      />
      <TouchableOpacity
        style={tailwind("bg-blue-500 text-white py-2 px-4 rounded mt-3")}
      >
        <Text style={tailwind("text-center")}>Edición Categorías</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SolicitudAsistencia;
