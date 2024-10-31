import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="agente"
        options={{
          title: "Agente",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="puntosFidelidad"
        options={{
          title: "Puntos fidelidad",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
