import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";

const Page = () => {
  const { sessionState, cargandoAuth } = useAuth();

  if (!cargandoAuth) {
    console.log(sessionState);

    if (sessionState?.session) {
      return <Redirect href="/(agente)/(tabs)/inicio" />;
    }

    return <Redirect href="/(auth)/bienvenida" />;
  }
};

export default Page;
