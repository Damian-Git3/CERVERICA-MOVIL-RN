import { create } from "zustand";
import { Venta } from "@/models/venta";

interface Store {
  venta: Venta | null;
  setVenta: (venta: Venta) => void;
}

const useVentaStore = create<Store>((set) => ({
  venta: null,
  setVenta: (v) => set({ venta: v }),
}));

export default useVentaStore;
