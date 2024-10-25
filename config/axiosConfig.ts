import axios from "axios";
import { router } from "expo-router";

// Timeout para axios
axios.defaults.timeout = 5000;

// EXPO_PUBLIC_BASE_URL se define en .env
axios.defaults.baseURL = process.env.EXPO_PUBLIC_BASE_URL;

// Interceptor para token expirado
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      //TODO: Generar toast para notificar sesión expiro
      console.log("El token expiro");
      router.replace("/(auth)/login");
    }

    return Promise.reject(error);
  }
);
