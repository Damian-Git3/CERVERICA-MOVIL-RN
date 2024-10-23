import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(mayorista)" options={{ headerShown: false }} />
      <Stack.Screen name="(agente)" options={{ headerShown: false }} />
      <Stack.Screen name="(configurador)" options={{ headerShown: false }} />
    </Stack>
  );
}
