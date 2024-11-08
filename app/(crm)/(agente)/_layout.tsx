import { Stack } from "expo-router";

const AgenteLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(solicitudes-mayoristas)"
        options={{
          title: "Solicitudes mayoristas",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="solicitud-asistencia"
        options={{
          title: "Solicitudes Asistencias",
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
        name="seguimiento-solicitud-asistencia"
        options={{
          title: "Seguimiento",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AgenteLayout;
