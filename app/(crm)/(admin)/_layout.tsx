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
        name="(ventas)"
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
      <Stack.Screen
        name="menuConfiguraciones"
        options={{
          title: "Menu de Configuraciones",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="configuracionesGenerales"
        options={{
          title: "Configuraciones Generales",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="configuracionVentasMayoreo"
        options={{
          title: "Configuraciones de Ventas de Mayoreo",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="reglaPuntos"
        options={{
          title: "Reglas de Puntos",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="formularioReglasPuntos"
        options={{
          title: "Formulario de Reglas de Puntos",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="formularioConfiguracionesGenerales"
        options={{
          title: "Formulario de Configuraciones Generales",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="formularioConfiguracionVentasMayoreo"
        options={{
          title: "Formulario de Configuración de Ventas de Mayoreo",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="cupones"
        options={{
          title: "Cupones",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="formularioCupones"
        options={{
          title: "Formulario de Cupones",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AdminLayout;
