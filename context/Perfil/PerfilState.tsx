/**
 * Este archivo representa la definición del estado, aquí estará toda la información que se va a compartir
 */

import { useEffect, useMemo, useReducer, useState } from "react";
import axios from "axios";
import PerfilReducer from "./PerfilReducer";
import * as SecureStore from "expo-secure-store";
import { Session } from "@/models/session";
import { UserDetailDto, UserMayoristaDetailDto } from "@/dtos/user";
import PerfilContext from "./PerfilContext";
import { PuntosFidelidadDto } from "../../dtos/puntosFidelidad";
import { TransaccionPuntosDto } from "../../dtos/transaccionPuntos";

const SESSION_KEY = "SESSION_KEY";

export default function PerfilState({ children }: { children: any }) {
  const initialState = {
    session: null,
    userDetails: null as UserDetailDto | null,
    puntosFidelidad: null as PuntosFidelidadDto | null,
    transacciones: [] as TransaccionPuntosDto[],
  };

  const [state, dispatch] = useReducer(PerfilReducer, initialState);
  const [obteniendoSession, setObteniendoSession] = useState(true);

  useEffect(() => {
    console.log("LOAD SESSION");
    const loadSession = async () => {
      try {
        const sessionSecureStore = await SecureStore.getItemAsync(SESSION_KEY);
        console.log("Valor de sessionSecureStore:", sessionSecureStore); // Esto debería mostrar el valor almacenado

        if (sessionSecureStore) {
          const session: Session = JSON.parse(sessionSecureStore);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${session.token}`;

          dispatch({
            type: "UPDATE_SESSION",
            payload: session,
          });

          // Llamada a getUserDetails al cargar la sesión.
          if (session.rol === "Mayorista") {
            await getUserMayoristaDetails();
          } else {
            await getUserDetails();
          }

          await getPuntosFidelidad();
          await getTransacciones();
        }
      } catch (error) {
        console.error("Error al cargar la sesión:", error);
      } finally {
        setObteniendoSession(false);
      }
    };

    loadSession();
  }, []);

  // Método para obtener detalles del usuario mayorista.
  const getUserMayoristaDetails = async () => {
    console.log("OBTENIENDO MAYORISTA");
    try {
      const response = await axios.get<UserMayoristaDetailDto>(
        `/Account/detail-mayorista`
      );

      dispatch({
        type: "UPDATE_USER_MAYORISTA_DETAILS",
        payload: response.data,
      });

      return response.data;
    } catch (error) {
      console.error("Error al obtener detalles del usuario:", error);
      return null;
    }
  };

  // Método para obtener detalles del usuario.
  const getUserDetails = async () => {
    try {
      const response = await axios.get<UserDetailDto>(`/Account/detail`);

      dispatch({
        type: "UPDATE_USER_DETAILS",
        payload: response.data,
      });

      return response.data;
    } catch (error) {
      console.error("Error al obtener detalles del usuario:", error);
      return null;
    }
  };

  // Método para obtener puntos de fidelidad
  const getPuntosFidelidad = async () => {
    try {
      const response = await axios.get<PuntosFidelidadDto>(
        `/PuntosFidelidad/obtener-puntos-fidelidad`
      );

      dispatch({
        type: "UPDATE_PUNTOS_FIDELIDAD",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener puntos de fidelidad:", error);
      return null;
    }
  };

  // Método para obtener transacciones
  const getTransacciones = async () => {
    try {
      const response = await axios.get<TransaccionPuntosDto[]>(
        `/PuntosFidelidad/obtener-transacciones`
      );

      dispatch({
        type: "UPDATE_TRANSACCIONES",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener transacciones:", error);
      return [];
    }
  };

  const contextValue = useMemo(
    () => ({
      session: state.session,
      userDetails: state.userDetails,
      userMayoristaDetails: state.userMayoristaDetails,
      getUserDetails,
      getUserMayoristaDetails,
      obteniendoSession,
      puntosFidelidad: state.puntosFidelidad,
      transacciones: state.transacciones,
      getTransacciones,
      getPuntosFidelidad,
    }),
    [state, obteniendoSession]
  );

  return (
    <PerfilContext.Provider value={contextValue}>
      {children}
    </PerfilContext.Provider>
  );
}
