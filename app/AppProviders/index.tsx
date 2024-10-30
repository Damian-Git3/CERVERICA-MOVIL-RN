import React from "react";
import AuthState from "@/context/Auth/AuthState";
import AuthLoaded from "@/context/Auth/AuthLoaded";
import PerfilState from "@/context/Perfil/PerfilState";
import HistorialPreciosState from "@/context/HistorialPrecios/HistorialPreciosState";

const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AuthState>
      <AuthLoaded>
        <PerfilState>
          <HistorialPreciosState>{children}</HistorialPreciosState>
        </PerfilState>
      </AuthLoaded>
    </AuthState>
  );
};

export default AppProviders;
