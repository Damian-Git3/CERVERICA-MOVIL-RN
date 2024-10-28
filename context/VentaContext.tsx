import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { ReporteVentas, ResumenVentas, Venta } from "@/app/model/venta";	

type VentaProps = {
  ventas: Venta[];
  ventaSeleccionada: Venta | null;
  reporteVentas: ReporteVentas | null;
  resumenVentas: ResumenVentas | null;
  getVentas: () => Promise<void>;
  getVenta: (id: number) => Promise<void>;
  getReporteVentas: (param: string) => Promise<void>;
  getResumenVentas: () => Promise<void>;
  cargandoVentas: boolean;
};

const VentaContext = createContext<VentaProps>({} as VentaProps);

export const useVenta = () => {
  return useContext(VentaContext);
};

export const VentaProvider = ({ children }: { children: React.ReactNode }) => {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState<Venta | null>(
    null
  );
  const [reporteVentas, setReporteVentas] = useState<ReporteVentas | null>(null);
  const [resumenVentas, setResumenVentas] = useState<ResumenVentas | null>(null);
  const [cargandoVentas, setCargandoVentas] = useState(true);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const res = await axios.get(`/Ventas`);
        setVentas(res.data);
      } catch (error) {
        console.error("Error al obtener las ventas:", error);
      } finally {
        setCargandoVentas(false);
      }
    };

    fetchVentas();
  }, []);

  const getVentas = async () => {
    setCargandoVentas(true);
    try {
        console.log("getVentas");
      const res = await axios.get(`/Ventas`);
      console.log("res.data", res.data);
      setVentas(res.data);
    } catch (error) {
      console.error("Error al obtener las ventas:", error);
    } finally {
      setCargandoVentas(false);
    }
  };

  const getVenta = async (id: number) => {
    setCargandoVentas(true);
    try {
      const res = await axios.get(`/Ventas/${id}`);
      setVentaSeleccionada(res.data);
    } catch (error) {
      console.error("Error al obtener la venta:", error);
    } finally {
      setCargandoVentas(false);
    }
  };

  const getReporteVentas = async (param: string) => {
    setCargandoVentas(true);
    try {
      const res = await axios.get(`/Ventas/reporte/${param}`);
      setReporteVentas(res.data);
    } catch (error) {
      console.error("Error al obtener el reporte de ventas:", error);
    } finally {
      setCargandoVentas(false);
    }
  }
  
  const getResumenVentas = async () => {
    setCargandoVentas(true);
    try {
      const res = await axios.get(`/Ventas/resumen`);
      setResumenVentas(res.data);
    } catch (error) {
      console.error("Error al obtener el resumen de ventas:", error);
    } finally {
      setCargandoVentas(false);
    }
  }

  const value = {
    ventas,
    ventaSeleccionada,
    reporteVentas,
    resumenVentas,
    getVentas,
    getVenta,
    getReporteVentas,
    getResumenVentas,
    cargandoVentas,
  };

  return (
    <VentaContext.Provider value={value}>{children}</VentaContext.Provider>
  );
};