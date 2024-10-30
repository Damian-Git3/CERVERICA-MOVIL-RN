import { Stack } from "expo-router";

const SolicitudesMayoristasLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="lista-solicitudes"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="prospecto-solicitud"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default SolicitudesMayoristasLayout;