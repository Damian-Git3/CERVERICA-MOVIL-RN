import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { router } from "expo-router";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `http://127.0.0.1/Account/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);

      // Almacenar el token en AsyncStorage
      await AsyncStorage.setItem("token", response.data.token);

      // Navegar a la pantalla de productos u otra pantalla
      // CAMBIAR A HOME
      router.replace("/(auth)/bienvenida");
    } catch (error) {
      console.error("Error en inicio de sesión:", error);
      // Puedes mostrar un mensaje de error aquí
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000); // Simular carga
    // CAMBIAR A HOME
    router.replace("/(auth)/bienvenida");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Cambiar el estado de visibilidad
  };

  return (
    <View style={styles.container}>
      <ScrollView /* contentContainerStyle={styles.scrollContainer} */>
        <View style={styles.containerItems}>
          <View style={styles.circulo1}></View>
          <View style={styles.circulo2}></View>
          <View style={styles.circulo3}></View>

          <Text style={styles.welcomeText}>Bienvenido</Text>

          <View style={styles.inputContainer}>
            <Icon name="mail" size={24} color="#E1A500" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#E1A500"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name={showPassword ? "lock-open" : "lock-closed"}
              size={24}
              color="#E1A500"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#E1A500"
              secureTextEntry={!showPassword} // Cambiar la visibilidad de la contraseña
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#E1A500"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={handleReturn}>
          <Icon
            name="arrow-back"
            size={24}
            color="#000"
            style={styles.backButtonIcon}
          />
        </TouchableOpacity>

        <View style={styles.containerItems}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Iniciar sesión</Text>
          </TouchableOpacity>

          {loading && (
            <ActivityIndicator
              style={styles.progressBar}
              size="large"
              color="#E1A500"
            />
          )}

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerText}>¿Eres un usuario nuevo?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  circulo1: {
    backgroundColor: "#4d3a5e",
    padding: 70,
    position: "absolute",
    borderRadius: 100,
    top: -60,
    left: 20,
  },
  circulo2: {
    backgroundColor: "#444037",
    padding: 40,
    position: "absolute",
    borderRadius: 100,
    top: 130,
    left: 100,
  },
  circulo3: {
    backgroundColor: "#4c4b38",
    padding: 60,
    position: "absolute",
    borderRadius: 100,
    top: 130,
    left: 230,
  },
  container: {
    flex: 1,
    backgroundColor: "#343434",
  },
  topBackground: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  welcomeText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 100,
    marginBottom: 100,
  },
  containerItems: {
    paddingHorizontal: 32,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    bottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    paddingHorizontal: 32,
    backgroundColor: "transparent",
    borderBottomColor: "#E1A500",
    borderBottomWidth: 2,
    marginBottom: 20,
    color: "#fff",
    paddingLeft: 30,
  },
  eyeIcon: {
    bottom: 10,
    marginLeft: -30,
  },
  backButton: {
    width: 70,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E1A500",
    borderRadius: 5,
    borderBottomEndRadius: 50,
    borderTopRightRadius: 20,
  },
  backButtonIcon: {
    color: "white",
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#E1A500",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },

  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  progressBar: {
    marginTop: 20,
  },
  registerText: {
    textAlign: "center",
    marginTop: 32,
    color: "#E1A500",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
