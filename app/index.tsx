import AuthContext from "@/context/Auth/AuthContext";
import { Redirect } from "expo-router";
import { useContext } from "react";

const Page = () => {
  const { session } = useContext(AuthContext);

  console.log(session);

  if (session) {
    if (session.rol == "Agente") {
      return <Redirect href="/(crm)/(agente)/solicitudes-mayoristas" />;
    } else {
      return <Redirect href="/(crm)/(agente)/inicio" />;
    }
  }

  return <Redirect href="/(auth)/bienvenida" />;
};

export default Page;
