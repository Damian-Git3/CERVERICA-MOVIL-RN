import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";

import "../config/NativeWindConfig";
import "../config/AxiosConfig";

import "react-native-reanimated";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import Toast from "react-native-toast-message";
import { toastConfig } from "@/config/ToastConfig";

export default function RootLayout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(mayorista)" options={{ headerShown: false }} />
          <Stack.Screen name="(agente)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(configurador)"
            options={{ headerShown: false }}
          />
        </Stack>

        <Toast config={toastConfig} />
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
