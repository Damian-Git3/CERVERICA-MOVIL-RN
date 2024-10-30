import { createContext } from "react";

interface RecetaView {
  id: number;
  nombre: string;
  imagen: number;
  activo: boolean;
}

type HistorialPreciosContextType = {
  listaRecetas: RecetaView[];
  getListaRecetas: () => Promise<RecetaView[]>;
};

const HistorialPreciosContext = createContext<HistorialPreciosContextType>(
  {} as HistorialPreciosContextType
);

export default HistorialPreciosContext;
