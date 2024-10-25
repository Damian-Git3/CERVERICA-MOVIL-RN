import { Session } from "@/app/model/session";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

type AuthProps = {
  sessionState?: { session: Session | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  loading: boolean;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const sessionSecureStore = await SecureStore.getItemAsync(SESSION_KEY);

        if (sessionSecureStore) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${sessionSecureStore}`;

          const session: Session = JSON.parse(sessionSecureStore);

          setSessionState({
            session,
          });
        }
      } catch (error) {
        console.error("Error al cargar la sesión:", error);
      } finally {
        setLoading(false);
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
      const result = await axios.post(
        `${process.env.EXPO_PUBLIC_BASE_URL}/Account/login`,
        {
          email,
          password,
        }
      );

      setSessionState({
        session: result.data,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(result.data));
      return result;
    } catch (e) {
      return { error: true, msg: e };
    }
  };

  const onLogout = async () => {
    const result = await axios.post(
      `${process.env.EXPO_PUBLIC_BASE_URL}/Account/logout`,
      {}
    );

    console.log(result);

    await SecureStore.deleteItemAsync(SESSION_KEY);

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
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
