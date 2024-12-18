import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="bienvenida" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="registro-tipo-cuenta"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="registro-cliente" options={{ headerShown: false }} />
      
      <Stack.Screen
        name="registro-mayorista"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default Layout;
