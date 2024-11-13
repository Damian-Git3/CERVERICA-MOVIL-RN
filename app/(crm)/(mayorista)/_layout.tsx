import { Stack } from "expo-router";

const MayoristaLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(solicitudes-mayoristas)"
        options={{
          title: "Solicitudes mayoristas",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default MayoristaLayout;
