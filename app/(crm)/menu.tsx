import { icons } from "@/constants";
import AuthContext from "@/context/Auth/AuthContext";
import { router } from "expo-router";
import { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const Menu = () => {
  const { onLogout } = useContext(AuthContext);

  const handleLogout = async () => {
    const respuestaLogout = await onLogout!();

    Toast.show({
      type: "success",
      text1: "Esperamos vuelvas pronto!",
      text2: "Lamentamos que te tengas que ir:(",
    });

    if (respuestaLogout.data.isSuccess) {
      router.replace("/(auth)/login");
    }
  };

  return (
    <View>
      <Text>Menu</Text>

      <TouchableOpacity onPress={handleLogout}>
        <Image source={icons.out} className="w-4 h-4" />
      </TouchableOpacity>
    </View>
  );
};

export default Menu;
