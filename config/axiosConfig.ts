import axios from "axios";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

// Timeout para axios
axios.defaults.timeout = 5000;

// EXPO_PUBLIC_BASE_URL se define en .env
axios.defaults.baseURL = process.env.EXPO_PUBLIC_BASE_URL;
console.log(process.env.EXPO_PUBLIC_BASE_URL);

// Interceptor para token expirado
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Toast.show({
        type: "error",
        text1: "Esperamos demasiado tiempo!",
        text2: "Es necesario que vuelvas a ingresar sesión",
      });
      router.replace("/(auth)/login");
    } else if (
      error.code === "ECONNABORTED" &&
      error.message.includes("timeout")
    ) {
      Toast.show({
        type: "error",
        text1: "Lo sentimos!",
        text2: "La solicitud excedió el tiempo de espera",
      });
    }
  }
);
