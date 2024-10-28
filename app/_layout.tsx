import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";

import "../config/axiosConfig";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(mayorista)" options={{ headerShown: false }} />
        <Stack.Screen name="(agente)" options={{ headerShown: false }} />
        <Stack.Screen name="(configurador)" options={{ headerShown: false }} />
        <Stack.Screen name="(admin)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
