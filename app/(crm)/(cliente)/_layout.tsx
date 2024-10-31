import { Stack } from "expo-router";

const ClienteLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="solicitud-asistencia"
        options={{
          title: "Solicitudes Asistencias",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="nueva-solicitud-asistencia"
        options={{
          title: "Nueva Solicitud Asistencia",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="detalle-solicitud-asistencia"
        options={{
          title: "Deatalles de Solicitudes Asistencias",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ClienteLayout;
