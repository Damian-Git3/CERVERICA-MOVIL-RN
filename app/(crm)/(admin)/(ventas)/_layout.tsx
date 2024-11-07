import { Stack } from "expo-router";

const VentasLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="ventas"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="reporte-ventas"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="detalle-venta"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default VentasLayout;
