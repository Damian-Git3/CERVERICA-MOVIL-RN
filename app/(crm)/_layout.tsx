import { images } from "@/constants";
import AuthContext from "@/context/Auth/AuthContext";
import { Link, router, Stack } from "expo-router";
import { useContext } from "react";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons";
// @ts-ignore
import UserAvatar from "react-native-user-avatar";

const Layout = () => {
  const { session } = useContext(AuthContext);

  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <Link href="/(crm)/perfil">
            <UserAvatar
              size={30}
              name={session?.nombre}
              bgColor="#f5d9ab"
              textColor="black"
            />
          </Link>
        ),
        headerRight: () => (
          <Link href="/(crm)/menu">
            <Icon name="menu" size={30} />
          </Link>
        ),
        headerTitle: () => (
          <>
            <Image
              source={images.iconoNavbar}
              style={{ width: 100, height: 35, resizeMode: "contain" }}
            />
          </>
        ),
        headerStyle: {
          backgroundColor: "#ed9224",
        },
        contentStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen name="(agente)" />
      <Stack.Screen
        name="menu"
        options={{
          headerTitle: "Menú",
          headerLeft: undefined,
          headerRight: undefined,
          headerBackTitle: "Regresar",
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        name="perfil"
        options={{
          headerTitle: "Perfil de usuario",
          headerLeft: undefined,
          headerRight: undefined,
          headerBackTitle: "Regresar",
          headerTintColor: "black",
        }}
      />
      {/* <Stack.Screen
        name="puntosFidelidad"
        options={{
          headerTitle: "",
          headerLeft: undefined,
          headerRight: undefined,
          headerBackTitle: "Regresar",
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        name="agente"
        options={{
          headerTitle: "",
          headerLeft: undefined,
          headerRight: undefined,
          headerBackTitle: "Regresar",
          headerTintColor: "black",
        }}
      /> */}
    </Stack>
  );
};

export default Layout;
