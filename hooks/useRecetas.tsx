import { useReducer, useState } from "react";
import axios from "axios";

const END_POINT = "/Receta";

type State = {
  recetas: Receta[] | null;
};

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

export default function useRecetas() {
  const [state, dispatch] = useReducer(RecetasReducer, initialState);
  const [cargando, setCargando] = useState(false);

  const getRecetas = async () => {
    setCargando(true);

    try {
      const result = await axios.get<Receta[]>(`${END_POINT}/`);

      dispatch({
        type: "GET_RECETAS",
        payload: result.data,
      });
    } catch (error) {
      console.error("Error al obtener solicitudes mayoristas:", error);
    } finally {
      setCargando(false);
    }
  };

  return {
    cargando,
    recetas: state.recetas,
    getRecetas,
  };
}
