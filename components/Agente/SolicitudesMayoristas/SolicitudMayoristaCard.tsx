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
  const pasos =
    solicitudMayorista.estatus === 5
      ? ["Rechazado"]
      : solicitudMayorista.estatus === 4
      ? ["Cancelado"]
      : ["Nuevo pedido", "Confirmando", "Concretado"];

  let activeStep;
  switch (solicitudMayorista.estatus) {
    case 1: // Nuevo Pedido
      activeStep = 0;
      break;
    case 2: // Confirmando
      activeStep = 1;
      break;
    case 3: // Concretado
      activeStep = 2;
      break;
    case 4: // Cancelado
      activeStep = 0;
      break;
    case 5: // Rechazado
      activeStep = 0;
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
      <Text className="text-sm text-neutral-500">
        Fecha de inicio:{" "}
        {new Date(solicitudMayorista.fechaInicio).toLocaleDateString()}
      </Text>

      {(solicitudMayorista.estatus == 4 || solicitudMayorista.estatus == 5) && (
        <>
          <Text className="text-lg text-neutral-800 mt-2">
            Mensaje{" "}
            {solicitudMayorista.estatus == 4 ? "cancelación" : "rechazado"}:
          </Text>

          <Text className="text-base text-neutral-800">
            {solicitudMayorista.mensajeRechazo}
          </Text>
        </>
      )}

      <ProgressSteps
        activeStepIconBorderColor="#ed9224"
        progressBarColor="#ed9224"
        completedProgressBarColor="#ed9224"
        completedStepIconColor={
          solicitudMayorista.estatus == 5 ? "red" : "#ed9224"
        }
        labelColor="#ed9224"
        activeLabelColor="#ed9224"
        activeStep={activeStep}
        isComplete={
          solicitudMayorista.estatus == 5 ||
          solicitudMayorista.estatus == 4 ||
          solicitudMayorista.estatus == 3
        }
      >
        {pasos.map((stepLabel, index) => (
          <ProgressStep key={index} label={stepLabel} removeBtnRow={true} />
        ))}
      </ProgressSteps>
    </View>
  );
}
