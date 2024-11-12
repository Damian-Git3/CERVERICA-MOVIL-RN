import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="notificaciones"
        options={{
          title: "Notificaciones",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
