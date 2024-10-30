import { Stack } from "expo-router";

const AgenteLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="solicitudes-mayoristas"
        options={{
          title: "Solicitudes mayoristas",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AgenteLayout;
