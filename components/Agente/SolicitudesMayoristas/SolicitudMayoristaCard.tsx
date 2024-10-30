import {
  getEstatusSolicitudMayoristaColor,
  getEstatusSolicitudMayoristaNombre,
  SolicitudMayorista,
} from "@/models/SolicitudesMayoristas";
import { Text, View } from "react-native";
import React from "react";

export default function SolicitudMayoristaCard({
  solicitudMayorista,
}: {
  solicitudMayorista: SolicitudMayorista;
}) {
  return (
    <View className="flex flex-col bg-white p-4 rounded-lg shadow-md shadow-neutral-300 my-2">
      {/* Nombre del contacto */}
      <View className="flex flex-row items-center">
        <View
          className={`w-3 h-3 rounded-full ${getEstatusSolicitudMayoristaColor(
            solicitudMayorista.estatus
          )} mr-2`}
        />

        <Text className={`text-lg font-bold`}>
          {getEstatusSolicitudMayoristaNombre(solicitudMayorista.estatus)}
        </Text>
      </View>

      {/* Nombre del contacto */}
      <Text className="text-lg font-bold text-neutral-800">
        {solicitudMayorista.mayorista.nombreContacto}
      </Text>

      {/* Nombre de la empresa */}
      <Text className="text-base font-semibold text-neutral-600 my-1">
        {solicitudMayorista.mayorista.nombreEmpresa}
      </Text>

      {/* Detalles adicionales de la empresa */}
      <Text className="text-sm text-neutral-500">
        Dirección: {solicitudMayorista.mayorista.direccionEmpresa}
      </Text>
      <Text className="text-sm text-neutral-500">
        Teléfono: {solicitudMayorista.mayorista.telefonoEmpresa}
      </Text>
      <Text className="text-sm text-neutral-500">
        Correo: {solicitudMayorista.mayorista.emailContacto}
      </Text>

      {/* Información de fecha */}
      <Text className="text-xs text-neutral-400 mt-2">
        Fecha de inicio:{" "}
        {new Date(solicitudMayorista.fechaInicio).toLocaleDateString()}
      </Text>
    </View>
  );
}
