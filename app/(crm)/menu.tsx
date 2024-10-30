import { icons } from "@/constants";
import AuthContext from "@/context/Auth/AuthContext";
import { router } from "expo-router";
import { useContext, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import Toast from "react-native-toast-message";

const Menu = () => {
  const { onLogout } = useContext(AuthContext);
  const [isPressed, setIsPressed] = useState(false);

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

  const handleNavigate = (ruta: string) => {
    router.push(ruta as any); // Cambia "/ruta/destino" por la ruta real a la que deseas redirigir
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>

      <TouchableHighlight
        style={isPressed ? styles.buttonPressed : styles.button}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onPress={() => handleNavigate("/(crm)/(HistorialPrecios)")}
      >
        <Text style={isPressed ? styles.buttonTextPressed : styles.buttonText}>
          Historial de Precios
        </Text>
      </TouchableHighlight>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Image source={icons.out} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    width: "80%",
  },
  buttonPressed: {
    backgroundColor: "#ed9224", // Color más oscuro para el efecto "hover"
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#ed9224",
    fontSize: 16,
  },
  buttonTextPressed: {
    color: "#fff",
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default Menu;
