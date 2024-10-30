import AuthContext from "@/context/Auth/AuthContext";
import { Redirect } from "expo-router";
import { useContext } from "react";

const Page = () => {
  const { session } = useContext(AuthContext);

  if (session) {
    if (session.rol === "Agente") {
      return <Redirect href="/(crm)/(agente)/inicio" />;
    }
    if (session.rol === "Admin") {
      return <Redirect href="/(crm)/(admin)/inicio" />;
    }
  }

  return <Redirect href="/(auth)/bienvenida" />;
};

export default Page;
