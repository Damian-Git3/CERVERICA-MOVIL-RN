import { icons } from "@/constants";
import AuthContext from "@/context/Auth/AuthContext";
import PerfilContext from "@/context/Perfil/PerfilContext";
import { router } from "expo-router";
import { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const Profile = () => {
  const { onLogout, session } = useContext(AuthContext);
  const { userDetails } = useContext(PerfilContext);

  const handleLogout = async () => {
    const respuestaLogout = await onLogout!();

    Toast.show({
      type: "success",
      text1: "Esperamos vuelvas pronto!",
      text2: "Lamentamos que te tengas que ir :(",
    });

    if (respuestaLogout.data.isSuccess) {
      router.replace("/(auth)/login");
    }
  };

  const handleBeneficios = () => {
    router.push("/(perfil)/(tabs)/beneficios"); // Navega a la pantalla de beneficios
  };

  return (
    <>
      <SafeAreaView>
        <Text>Desde inicio</Text>

        <TouchableOpacity
          onPress={handleLogout}
          className="justify-center items-center w-10 h-10 rounded-full bg-white"
        >
          <Image source={icons.out} className="w-4 h-4" />
        </TouchableOpacity>
      </SafeAreaView>

      <View>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Perfil de Usuario
        </Text>
        {userDetails ? (
          <View>
            <Text>Email: {userDetails.email}</Text>
            <Text>Nombre completo: {userDetails.fullName}</Text>
            <Text>Teléfono: {userDetails.phoneNumber}</Text>
          </View>
        ) : (
          <Text>Cargando...</Text>
        )}
      </View>

      {/* Botón para acceder a los beneficios */}
      <TouchableOpacity
        onPress={handleBeneficios}
        className="mt-4 bg-blue-500 rounded-full px-4 py-2"
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Beneficios de Usuario
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default Profile;
