import { Session } from "@/models/session";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

type AuthProps = {
  sessionState?: { session: Session | null };
  onRegisterUsuarioCliente?: (
    nuevoUsuarioCliente: nuevoUsuarioCliente
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  cargandoAuth: boolean;
};

const SESSION_KEY = "MY_SESSION";

const AuthContext = createContext<AuthProps>({} as AuthProps);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [sessionState, setSessionState] = useState<{ session: Session | null }>(
    {
      session: null,
    }
  );
  const [cargandoAuth, setCargandoAuth] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const sessionSecureStore = await SecureStore.getItemAsync(SESSION_KEY);

        if (sessionSecureStore) {
          const session: Session = JSON.parse(sessionSecureStore);

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${session.token}`;

          setSessionState({
            session,
          });
        }
      } catch (error) {
        console.error("Error al cargar la sesión:", error);
      } finally {
        setCargandoAuth(false);
      }
    };

    loadSession();
  }, []);

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
          // La solicitud se realizó pero no se recibió respuesta
          console.log("Error request:", e.request);
        } else {
          // Algo pasó al configurar la solicitud
          console.log("Error message:", e.message);
        }
      } else {
        // Manejar otros tipos de errores
        console.log("Unexpected error:", e);
      }

      return null;
    }
  };

  const onLogin = async (email: string, password: string) => {
    try {
      const result = await axios.post(`/Account/login`, {
        email,
        password,
      });

      setSessionState({
        session: result.data,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(result.data));

      return result;
    } catch (e: any) {
      if (axios.isAxiosError(e)) {
        if (e.response) {
          return e.response.data;
        } else if (e.request) {
          // La solicitud se realizó pero no se recibió respuesta
          console.log("Error request:", e.request);
        } else {
          // Algo pasó al configurar la solicitud
          console.log("Error message:", e.message);
        }
      } else {
        // Manejar otros tipos de errores
        console.log("Unexpected error:", e);
      }

      return null;
    }
  };

  const onLogout = async () => {
    const result = await axios.post(`/Account/logout`, {});

    await SecureStore.deleteItemAsync(SESSION_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setSessionState({
      session: null,
    });

    return result;
  };

  const value = {
    onRegisterUsuarioCliente,
    onLogin,
    onLogout,
    sessionState,
    cargandoAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
