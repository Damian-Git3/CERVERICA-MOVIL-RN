import { Session } from "@/models/session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

type AuthProps = {
  sessionState?: { session: Session | null };
  onRegister?: (email: string, password: string) => Promise<any>;
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
        const sessionAsyncStorage = await AsyncStorage.getItem(SESSION_KEY);

        if (sessionAsyncStorage) {
          const session: Session = JSON.parse(sessionAsyncStorage);

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

  const onRegister = async (email: string, password: string) => {
    try {
      return await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}`);
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
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

      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(result.data));

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

      return null; // O lo que desees retornar en caso de error
    }
  };

  const onLogout = async () => {
    const result = await axios.post(
      `${process.env.EXPO_PUBLIC_BASE_URL}/Account/logout`,
      {}
    );

    await AsyncStorage.removeItem(SESSION_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setSessionState({
      session: null,
    });

    return result;
  };

  const value = {
    onRegister,
    onLogin,
    onLogout,
    sessionState,
    cargandoAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
