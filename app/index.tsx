import AuthContext from "@/context/Auth/AuthContext";
import { Redirect } from "expo-router";
import { useContext } from "react";

const Page = () => {
  const { session } = useContext(AuthContext);

  if (session) {
    return <Redirect href="/(crm)/inicio" />;
  }

  return <Redirect href="/(auth)/bienvenida" />;
};

export default Page;
