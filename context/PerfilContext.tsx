import { Session } from "@/models/session";
import { UserDetailDto } from "@/dtos/user";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { TransaccionPuntosDto } from "@/dtos/transaccionPuntos";
import { PuntosFidelidadDto } from "@/dtos/puntosFidelidad";

type PerfilProps = {
  sessionState?: { session: Session | null };
  getUserDetails?: () => Promise<UserDetailDto | null>;
  cargandoAuth: boolean;

  puntosFidelidad?: PuntosFidelidadDto | null;
  transacciones?: TransaccionPuntosDto[];

  getTransacciones?: () => Promise<TransaccionPuntosDto | null>;
  getPuntosFidelidad?: () => Promise<PuntosFidelidadDto | null>;
};

const SESSION_KEY = "MY_SESSION";

const PerfilContext = createContext<PerfilProps>({} as PerfilProps);

export const useAuth = () => {
  return useContext(PerfilContext);
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

  const value = {
    sessionState,
    cargandoAuth,
  };

  return (
    <PerfilContext.Provider value={value}>{children}</PerfilContext.Provider>
  );
};
