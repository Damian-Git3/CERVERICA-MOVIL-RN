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
    </Stack>
  );
};

export default Layout;
