import { Stack } from "expo-router";
import "../config/NativeWindConfig";
import "../config/axiosConfig";
import "../config/ConfigGeneral";

import "react-native-reanimated";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import Toast from "react-native-toast-message";
import { toastConfig } from "@/config/ToastConfig";
import AuthState from "@/context/Auth/AuthState";
import AuthLoaded from "@/context/Auth/AuthLoaded";
import PerfilState from "@/context/Perfil/PerfilState";
import VentaState from "@/context/Venta/VentaState";

export default function RootLayout() {
  return (
    <AuthState>
      <AuthLoaded>
        <PerfilState>
          <VentaState>
            <GestureHandlerRootView>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(crm)" options={{ headerShown: false }} />
              </Stack>
              <Toast config={toastConfig} topOffset={60} />
            </GestureHandlerRootView>
          </VentaState>
        </PerfilState>
      </AuthLoaded>
    </AuthState>
  );
}
