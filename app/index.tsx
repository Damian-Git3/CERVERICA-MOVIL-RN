import AuthContext from "@/context/Auth/AuthContext";
import { Redirect } from "expo-router";
import { useContext } from "react";

const Page = () => {
  const { session } = useContext(AuthContext);

  if (session) {
    return <Redirect href="/(agente)/(tabs)/inicio" />;
  }

  return <Redirect href="/(auth)/bienvenida" />;
};

export default Page;
