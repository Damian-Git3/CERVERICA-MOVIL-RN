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
          title: "Detalle de Solicitud de Asistencia",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="detalle-solicitud-asistencia-historico"
        options={{
          title: "Detalle de Asistencia",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="valorar-solicitud"
        options={{
          title: "Valorar Solicitud",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ClienteLayout;
