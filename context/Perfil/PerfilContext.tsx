import { createContext } from "react";
import { Session } from "@/models/session";
import { UserDetailDto } from "@/dtos/user";
import { TransaccionPuntosDto } from "@/dtos/transaccionPuntos";
import { PuntosFidelidadDto } from "@/dtos/puntosFidelidad";

type PerfilContextProps = {
  session?: Session | null;
  obteniendoSession: boolean;
  userDetails?: UserDetailDto | null;
  getUserDetails?: () => Promise<UserDetailDto | null>;

  transacciones?: TransaccionPuntosDto[];
  getTransacciones?: () => Promise<TransaccionPuntosDto[] | null>;

  puntosFidelidad?: PuntosFidelidadDto | null;
  getPuntosFidelidad?: () => Promise<PuntosFidelidadDto | null>;
};

const PerfilContext = createContext<PerfilContextProps>(
  {} as PerfilContextProps
);

export default PerfilContext;
