import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          title: "Perfil",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)/profile"
        options={{
          title: "Perfil",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)/agente"
        options={{
          title: "Agente",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)/misSolicitudesCambioAgente"
        options={{
          title: "Mis solicitudes de cambio de agente",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
