import axios from "axios";
import React, { useEffect, useReducer } from "react";
import HistorialPreciosContext from "./HistorialPreciosContext";
import HistorialPreciosReducer from "./HistorialPreciosReducer";

interface RecetaView {
  id: number;
  nombre: string;
  imagen: number;
  activo: boolean;
}

interface HistorialPreciosStateProps {
  children: React.ReactNode;
}

const HistorialPreciosState: React.FC<HistorialPreciosStateProps> = ({
  children,
}) => {
  const initialState = {
    listaRecetas: [],
    obteniendoRecetas: true,
  };
  const [state, dispatch] = useReducer(HistorialPreciosReducer, initialState);

  const getListaRecetas = async () => {
    try {
      const response = await axios.get("/HistorialPrecios/ListarRecetas");

      dispatch({
        type: "UPDATE_LISTA_RECETAS",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener recetas", error);
    } finally {
      console.log("Recetas obtenidas");
    }
  };

  useEffect(() => {
    getListaRecetas();
  }, []);

  const contextValue = React.useMemo(
    () => ({
      listaRecetas: state.listaRecetas,
      getListaRecetas,
    }),
    [state.listaRecetas, getListaRecetas]
  );

  return (
    <HistorialPreciosContext.Provider value={contextValue}>
      {children}
    </HistorialPreciosContext.Provider>
  );
};

export default HistorialPreciosState;
