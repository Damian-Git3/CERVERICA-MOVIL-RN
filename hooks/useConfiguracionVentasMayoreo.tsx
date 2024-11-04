import { useReducer, useState } from "react";
import axios from "axios";
import { PuntosFidelidadDto, ReglasPuntosDto } from "@/dtos/puntosFidelidad";
import { TransaccionPuntosDto } from "@/dtos/transaccionPuntos";
import { IConfiguracionVentasMayoreo } from "@/dtos/configuracionVentasMayoreo";

const initialState = {
  configuracionVentasMayoreo: null as IConfiguracionVentasMayoreo | null,
};

const ConfiguracionVentasMayoreoReducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case "REGISTRAR_CONFIGURACION":
      return { ...state, configuracionVentasMayoreo: payload };

    case "ACTUALIZAR_CONFIGURACION":
      return { ...state, configuracionVentasMayoreo: payload };

    case "FETCH_CONFIGURACION":
      return { ...state, configuracionVentasMayoreo: payload };

    default:
      return state;
  }
};

export default function useConfiguracionVentasMayoreo() {
  const [state, dispatch] = useReducer(
    ConfiguracionVentasMayoreoReducer,
    initialState
  );
  const [cargando, setCargando] = useState(false);

  const registrarConfiguracionVentasMayoreo = async (
    configuracionVentasMayoreo: IConfiguracionVentasMayoreo
  ) => {
    setCargando(true);
    try {
      const response = await axios.post(
        `/ConfiguracionVentasMayoreo/registrar-configuracion`,
        configuracionVentasMayoreo
      );
      dispatch({
        type: "REGISTRAR_CONFIGURACION",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error al registrar la configuración de ventas de mayoreo:",
        error
      );
      return null;
    } finally {
      setCargando(false);
    }
  };

  const actualizarConfiguracionVentasMayoreo = async (
    configuracionVentasMayoreo: IConfiguracionVentasMayoreo
  ) => {
    setCargando(true);
    try {
      const response = await axios.put(
        `/ConfiguracionVentasMayoreo/actualizar-configuracion`,
        configuracionVentasMayoreo
      );
      dispatch({
        type: "ACTUALIZAR_CONFIGURACION",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error al actualizar la configuración de ventas de mayoreo: ",
        error
      );
      return null;
    } finally {
      setCargando(false);
    }
  };

  // Método para obtener las reglas de puntos de fidelidad
  const getConfiguracionVentasMayoreo = async () => {
    try {
      const response = await axios.get<IConfiguracionVentasMayoreo>(
        `/ConfiguracionVentasMayoreo/obtener-configuracion`
      );

      dispatch({
        type: "FETCH_CONFIGURACION",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener la configuración:", error);
      return null;
    }
  };

  return {
    cargando,
    configuracionVentasMayoreo: state.configuracionVentasMayoreo,
    getConfiguracionVentasMayoreo,
    registrarConfiguracionVentasMayoreo,
    actualizarConfiguracionVentasMayoreo,
  };
}
