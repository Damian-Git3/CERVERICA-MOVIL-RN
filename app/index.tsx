import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";

const Page = () => {
  const { sessionState, cargandoAuth } = useAuth();

  if (!cargandoAuth) {
    console.log(sessionState);

    if (sessionState?.session) {
      switch (sessionState.session.rol) {
        case "agente":
          return <Redirect href="/(agente)/(tabs)/inicio" />;
          break;
        case "admin":
          return <Redirect href="/(admin)/(tabs)/inicio" />;
          break;
      }
    }

    return <Redirect href="/(auth)/bienvenida" />;
  }
};

export default Page;
