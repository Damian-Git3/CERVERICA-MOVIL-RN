import { create } from "zustand";
import { SolicitudMayorista } from "@/models/SolicitudesMayoristas";

interface Store {
  solicitudMayorista: SolicitudMayorista | null;
  setSolicitudMayorista: (solicitud: SolicitudMayorista) => void;
}

const useSolicitudesMayoristasStore = create<Store>((set) => ({
  solicitudMayorista: null,
  setSolicitudMayorista: (solicitud) => set({ solicitudMayorista: solicitud }),
}));

export default useSolicitudesMayoristasStore;
