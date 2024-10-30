import {
  getEstatusSolicitudMayoristaColor,
  getEstatusSolicitudMayoristaNombre,
  SolicitudMayorista,
} from "@/models/SolicitudesMayoristas";
import { Text, View } from "react-native";
import React from "react";
// @ts-ignore
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

export default function SolicitudMayoristaCard({
  solicitudMayorista,
}: {
  solicitudMayorista: SolicitudMayorista;
}) {
  // Define los pasos según el valor de solicitudMayorista
  const pasos =
    solicitudMayorista.tipo === 1
      ? ["Prospecto", "Contactado", "Cerrado"]
      : ["Nuevo pedido", "Contactado", "Cerrado"];

  // Determina el paso activo basado en el estatus
  let activeStep;
  switch (solicitudMayorista.estatus) {
    case 1: // Prospecto
      activeStep = 0;
      break;
    case 2: // Nuevo Pedido
      activeStep = 0; // Si el tipo es 2, puedes cambiar esto según la lógica que necesites
      break;
    case 3: // Contactado
      activeStep = 1;
      break;
    case 4: // Cerrado
      activeStep = 2;
      break;
    case 5: // Cancelado
      activeStep = 2; // Si consideras que se cancela en el último paso
      break;
    default:
      activeStep = 0; // Valor por defecto
  }

  return (
    <View className="flex flex-col bg-white p-4 rounded-lg shadow-md shadow-neutral-300 my-2">
      {/* Nombre del contacto */}
      <Text className="text-lg font-bold text-neutral-800">
        Nombre contacto: {solicitudMayorista.mayorista.nombreContacto}
      </Text>

      {/* Nombre de la empresa */}
      <Text className="text-base font-semibold text-neutral-600 my-1">
        Nombre empresa: {solicitudMayorista.mayorista.nombreEmpresa}
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

      <ProgressSteps
        activeStepIconBorderColor="#ed9224"
        progressBarColor="#ed9224"
        completedProgressBarColor="#ed9224"
        completedStepIconColor="#ed9224"
        labelColor="#ed9224"
        activeLabelColor="#ed9224"
        activeStep={activeStep} // Usar el paso activo calculado
      >
        {pasos.map((stepLabel, index) => (
          <ProgressStep key={index} label={stepLabel} removeBtnRow={true} />
        ))}
      </ProgressSteps>
    </View>
  );
}
