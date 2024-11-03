import React from "react";
import AuthState from "@/context/Auth/AuthState";
import AuthLoaded from "@/context/Auth/AuthLoaded";
import HistorialPreciosState from "@/context/HistorialPrecios/HistorialPreciosState";

const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AuthState>
      <AuthLoaded>
        <HistorialPreciosState>{children}</HistorialPreciosState>
      </AuthLoaded>
    </AuthState>
  );
};

export default AppProviders;
