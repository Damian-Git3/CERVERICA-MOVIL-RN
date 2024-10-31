import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          title: "Notificaciones",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;