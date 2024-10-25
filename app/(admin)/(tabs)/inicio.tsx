import { icons } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Inicio = () => {
  const { onLogout } = useAuth();

  const handleLogout = async () => {
    const respuestaLogout = await onLogout!();

    router.replace("/(auth)/login");
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
