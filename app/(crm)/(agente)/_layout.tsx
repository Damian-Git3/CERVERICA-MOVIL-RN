import { Stack } from "expo-router";

const AgenteLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="inicio"
        options={{
          title: "Inicio Agente",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AgenteLayout;
