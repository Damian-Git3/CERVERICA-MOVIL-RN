import { useReducer, useState } from "react";
import axios from "axios";
import { ProductoCarrito } from "@/models/ProductoCarrito";

// Punto de acceso a la API
const END_POINT = "/Carrito";

type State = {
  productosCarrito: ProductoCarrito[] | null;
};

type GetProductosCarritoAction = {
  type: "GET_PRODUCTOS";
  payload: ProductoCarrito[];
};

type Action = GetProductosCarritoAction;

const initialState: State = {
  productosCarrito: null,
};

const CarritoReducer = (state: State, action: Action): State => {
  const { payload, type } = action;

  switch (type) {
    case "GET_PRODUCTOS":
      return {
        ...state,
        productosCarrito: payload,
      };

    default:
      return state;
  }
};

export default function useCarrito() {
  const [state, dispatch] = useReducer(CarritoReducer, initialState);
  const [cargando, setCargando] = useState(false);

  const obtenerProductosCarrito = async () => {
    setCargando(true);
    try {
      const result = await axios.get<ProductoCarrito[]>(
        `${END_POINT}/obtener-productos-carrito`
      );
      dispatch({
        type: "GET_PRODUCTOS",
        payload: result.data,
      });
    } catch (error) {
      console.error("Error al obtener productos del carrito:", error);
    } finally {
      setCargando(false);
    }
  };

  const agregarProductoCarrito = async (producto: {
    idReceta: number;
    cantidadLote: number;
    cantidad: number;
  }) => {
    setCargando(true);

    try {
      const response = await axios.post(
        `${END_POINT}/agregar-producto-carrito`,
        producto
      );

      return response;
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
    } finally {
      setCargando(false);
    }
  };

  const actualizarProductoCarrito = async (producto: {
    idReceta: number;
    cantidadLote: number;
    cantidad: number;
  }) => {
    setCargando(true);
    try {
      const response = await axios.post(
        `${END_POINT}/actualizar-producto-carrito`,
        producto
      );
      obtenerProductosCarrito();
      return response;
    } catch (error) {
      console.error("Error al actualizar producto en el carrito:", error);
    } finally {
      setCargando(false);
    }
  };

  const eliminarProductoCarrito = async (producto: {
    idReceta: number;
    cantidadLote: number;
  }) => {
    setCargando(true);
    try {
      await axios.post(`${END_POINT}/eliminar-producto-carrito`, producto);
      obtenerProductosCarrito();
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
    } finally {
      setCargando(false);
    }
  };

  return {
    cargando,
    productosCarrito: state.productosCarrito,
    obtenerProductosCarrito,
    agregarProductoCarrito,
    actualizarProductoCarrito,
    eliminarProductoCarrito,
  };
}
