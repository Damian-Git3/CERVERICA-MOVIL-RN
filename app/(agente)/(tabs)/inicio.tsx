import { icons } from "@/constants";
import AuthContext from "@/context/Auth/AuthContext";
import { router } from "expo-router";
import { useContext } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const Inicio = () => {
  const { onLogout, session } = useContext(AuthContext);

  console.log(session);

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

    //TODO: Mostrar porque no se pudo hacer logout
  };

  return (
    <SafeAreaView>
      <Text>Desde inicio</Text>

      <TouchableOpacity
        onPress={handleLogout}
        className="justify-center items-center w-10 h-10 rounded-full bg-white"
      >
        <Image source={icons.out} className="w-4 h-4" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Inicio;
