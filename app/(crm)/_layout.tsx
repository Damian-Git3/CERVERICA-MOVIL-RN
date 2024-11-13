import { images } from "@/constants";
import AuthContext from "@/context/Auth/AuthContext";
import { Link, Stack } from "expo-router";
import { useContext } from "react";
import { Image, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
// @ts-ignore
import UserAvatar from "react-native-user-avatar";

const Layout = () => {
  const { session } = useContext(AuthContext);

  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <Link href="/(crm)/menu" className="ml-5">
            <Icon name="menu" size={30} />
          </Link>
        ),
        headerRight: () => (
          <Link href="/(crm)/(perfil)/(tabs)/profile" className="mr-5">
            <UserAvatar
              size={35}
              name={session?.nombre}
              bgColor="#f5d9ab"
              textColor="black"
            />
          </Link>
        ),
        headerTitleAlign: "center",
        headerTitle: () => (
          <Image
            source={images.iconoNavbar}
            style={{
              width: Platform.OS == "ios" ? 100 : "81%",
              height: Platform.OS == "ios" ? 35 : 50,
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
        gestureDirection: "vertical",
      }}
    >
      <Stack.Screen
        name="menu"
        options={{
          animationTypeForReplace: "pop",
          headerShown: false,
        }}
      />
      <Stack.Screen name="inicio" />
    </Stack>
  );
};

export default Layout;
