import { Stack } from "expo-router";

const HistorialPreciosLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Historial de Precios",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default HistorialPreciosLayout;
