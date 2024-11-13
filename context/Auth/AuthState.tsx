/**
 * Este archivo representa la definición del estado, aquí estará toda la información que se va a compartir
 */

import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import AuthReducer from "./AuthReducer";
import AuthContext from "./AuthContext";
import { Session } from "@/models/session";
import { toastConfig } from "@/config/ToastConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SESSION_KEY = "SESSION_KEY";

export default function AuthState({ children }: { children: any }) {
  const initialState = {
    session: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const [obteniendoSession, setObteniendoSession] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const sessionSecureStore = await AsyncStorage.getItem(SESSION_KEY);

        if (sessionSecureStore) {
          const session: Session = JSON.parse(sessionSecureStore);

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${session.token}`;

          dispatch({
            type: "UPDATE_SESSION",
            payload: session,
          });
        }
      } catch (error) {
        console.error("Error al cargar la sesión:", error);
      } finally {
        setObteniendoSession(false);
      }
    };

    loadSession();
  }, []);

  const onLogin = async (email: string, password: string) => {
    try {
      const result = await axios.post(`/Account/login`, {
        email,
        password,
      });

      dispatch({
        type: "UPDATE_SESSION",
        payload: result.data,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(result.data));

      return result;
    } catch (e: any) {
      if (axios.isAxiosError(e)) {
        if (e.response) {
          return e.response;
        } else if (e.request) {
          console.log("Error request:", e.request);
        } else {
          console.log("Error message:", e.message);
        }
      } else {
        console.log("Unexpected error:", e);
      }

      return null;
    }
  };

  const onLogout = async () => {
    const result = await axios.post(`/Account/logout`, {});

    await AsyncStorage.removeItem(SESSION_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    dispatch({
      type: "UPDATE_SESSION",
      payload: null,
    });

    return result;
  };

  const onRegisterUsuarioCliente = async (
    nuevoUsuarioCliente: nuevoUsuarioCliente
  ) => {
    try {
      return await axios.post(`/Account/register`, nuevoUsuarioCliente);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response) {
          return e.response.data;
        } else if (e.request) {
          console.log("Error request:", e.request);
        } else {
          console.log("Error message:", e.message);
        }
      } else {
        console.log("Unexpected error:", e);
      }

      return null;
    }
  };

  const onRegisterUsuarioMayorista = async (
    nuevoUsuarioMayorista: nuevoUsuarioMayorista
  ) => {
    try {
      return (await axios.post(`/ClienteMayorista`, nuevoUsuarioMayorista))
        .data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response) {
          return e.response.data;
        } else if (e.request) {
          console.log("Error request:", e.request);
        } else {
          console.log("Error message:", e.message);
        }
      } else {
        console.log("Unexpected error:", e);
      }

      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session: state.session,
        obteniendoSession,
        onLogin,
        onLogout,
        onRegisterUsuarioCliente,
        onRegisterUsuarioMayorista,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
