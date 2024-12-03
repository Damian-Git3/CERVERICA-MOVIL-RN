import { create } from "zustand";

// Definir el tipo de los productos que se agregarán al carrito
export type CartItem = {
  id: number;
  nombre: string;
  precio?: number;
  cantidad: number;
};

type CartStore = {
  items: CartItem[]; // Array de productos en el carrito
  addItem: (item: CartItem) => void; // Función para agregar un producto al carrito
  removeItem: (id: number) => void; // Función para eliminar un producto del carrito
  clearCart: () => void; // Función para vaciar el carrito
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id), // Filtrar el item con el id especificado
    })),
  clearCart: () => set({ items: [] }), // Limpiar el carrito
}));
