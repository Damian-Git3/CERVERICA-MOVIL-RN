import { Stack } from "expo-router";

const AdminLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="inicio"
        options={{
          title: "Inicio Admin",
          headerShown: false,
        }}
      />
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
    </Stack>
  );
};

export default AdminLayout;
