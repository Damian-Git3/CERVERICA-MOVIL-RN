import { Stack } from "expo-router";

const AdminLayout = () => {
  return (
    <Stack>
      {/* <Stack.Screen
        name="inicio"
        options={{
          title: "Inicio Admin",
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="ventas"
        options={{
          title: "Ventas",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="reporteVentas"
        options={{
          title: "Reporte de Ventas",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="solicitudesCambioAgente"
        options={{
          title: "Solicitudes de cambio de agente",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="detalleSolicitudCambioAgente"
        options={{
          title: "Detalles de solicitud de cambio de agente",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HistorialPrecios"
        options={{
          title: "Historial de Precios",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AdminLayout;
