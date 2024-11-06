import { useReducer, useState } from "react";
import axios from "axios";
import { CrearVentaDto } from "@/dtos/CrearVentaDTO";

const END_POINT = "/Ventas";

type State = {};

type GetRecetasAction = {
  type: "GET_RECETAS";
  payload: Receta[];
};

type Action = GetRecetasAction;

const initialState: State = {
  recetas: null,
};

const RecetasReducer = (state: State, action: Action): State => {
  const { payload, type } = action;

  switch (type) {
    case "GET_RECETAS":
      return {
        ...state,
        recetas: payload,
      };

    default:
      return state;
  }
};

export default function useVentas() {
  //const [state, dispatch] = useReducer(RecetasReducer, initialState);
  const [cargando, setCargando] = useState(false);

  const crearVenta = async (venta: CrearVentaDto) => {
    setCargando(true);

    try {
      const result = await axios.post(`${END_POINT}/CrearVenta`, venta);

      /* dispatch({
        type: "GET_RECETAS",
        payload: result.data,
      }); */

      return result;
    } catch (error) {
      console.error("Error al obtener solicitudes mayoristas:", error);
    } finally {
      setCargando(false);
    }
  };

  return {
    cargando,
    crearVenta,
  };
}
