import { images } from "@/constants";
import AuthContext from "@/context/Auth/AuthContext";
import { Link, Stack } from "expo-router";
import { useContext } from "react";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
// @ts-ignore
import UserAvatar from "react-native-user-avatar";

const Layout = () => {
  const { session } = useContext(AuthContext);

  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <Link href="/(crm)/(perfil)/(tabs)/profile" className="ml-5">
            <UserAvatar
              size={40}
              name={session?.nombre}
              bgColor="#f5d9ab"
              textColor="black"
            />
          </Link>
        ),
        headerRight: () => (
          <Link href="/(crm)/menu" className="mr-5">
            <Icon name="menu" size={30} />
          </Link>
        ),
        headerTitleAlign: "center",
        headerTitle: () => (
          <Image
            source={images.iconoNavbar}
            style={{
              width: "81%",
              height: 50,
              resizeMode: "contain",
            }}
          />
        ),
        headerStyle: {
          backgroundColor: "#ed9224",
        },
        contentStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen
        name="menu"
        options={{
          headerTitle: "Menú",
          headerLeft: undefined,
          headerRight: undefined,
          headerBackTitle: "Regresar",
          headerTintColor: "black",
          headerShown: false,
        }}
      />
      <Stack.Screen name="inicio" />
    </Stack>
  );
};

export default Layout;
