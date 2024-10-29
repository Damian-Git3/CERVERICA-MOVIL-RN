import { Session } from "@/models/session";
import { createContext } from "react";

type AuthContextProps = {
  session?: Session | null;
  obteniendoSession: boolean;
  onRegisterUsuarioCliente?: (
    nuevoUsuarioCliente: nuevoUsuarioCliente
  ) => Promise<any>;
  onRegisterUsuarioMayorista?: (
    nuevoUsuarioMayorista: nuevoUsuarioMayorista
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export default AuthContext;
