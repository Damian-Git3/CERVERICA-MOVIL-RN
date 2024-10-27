import axios from "axios";
import { useReducer } from "react";
import { VentaReducer } from "./VentaReducer";
import { GET_VENTA, GET_VENTAS } from "../types";
import { VentaContext } from "./VentaContext";

export const VentaState = (props) => {
    const initialState = {
        ventas: [],
        ventaSeleccionada: null,
    };


    // Definimos un useReducer parta manejar el estado de la aplicacion
    const [state, dispatch] = useReducer(VentaReducer, initialState);

    const getVentas = async () => {
        try {
            const res = await axios.get("/Ventas");
            dispatch({
                type: GET_VENTAS,
                payload: res.data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getVenta = async (id: number) => {
        try {
            const res = await axios.get(`/Ventas/${id}`);
            dispatch({
                type: GET_VENTA,
                payload: res.data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <VentaContext.Provider
            value={{
                ventas: state.ventas,
                ventaSeleccionada: state.ventaSeleccionada,
                getVentas,
                getVenta,
            }}
        >
            {props.children}
        </VentaContext.Provider>
    );
}