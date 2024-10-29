import { Stack } from "expo-router";
import "../config/NativeWindConfig";
import "../config/AxiosConfig";
import "../config/ConfigGeneral";

import "react-native-reanimated";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import Toast from "react-native-toast-message";
import { toastConfig } from "@/config/ToastConfig";
import AuthState from "@/context/Auth/AuthState";
import AuthLoaded from "@/context/Auth/AuthLoaded";

export default function RootLayout() {
  return (
    <AuthState>
      <AuthLoaded>
        <GestureHandlerRootView className="flex-1">
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(crm)" options={{ headerShown: false }} />
          </Stack>

          <Toast config={toastConfig} topOffset={60} />
        </GestureHandlerRootView>
      </AuthLoaded>
    </AuthState>
  );
}
