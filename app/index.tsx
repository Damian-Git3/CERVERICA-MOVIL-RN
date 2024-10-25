import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { useEffect } from "react";

const Page = () => {
  const { sessionState, loading } = useAuth();

  if (!loading) {
    if (sessionState?.session) {
      return <Redirect href="/(agente)/(tabs)/inicio" />;
    }

    return <Redirect href="/(auth)/bienvenida" />;
  }
};

export default Page;
