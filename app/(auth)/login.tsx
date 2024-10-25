import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import top_vector from "@/assets/images/topVector.png";
import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";

import * as Progress from "react-native-progress";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errores, setErrores] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { onLogin, sessionState } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    setErrores([]);

    try {
      const respuestaLogin = await onLogin!(email, password);

      if (respuestaLogin.errors) {
        const newErrors: string[] = [];

        Object.values(respuestaLogin.errors).forEach((errorMessages) => {
          if (Array.isArray(errorMessages)) {
            newErrors.push(...errorMessages);
          }
        });

        setErrores(newErrors);

        return;
      }

      if (respuestaLogin.isSuccess == false) {
        setErrores([respuestaLogin.message]);
      }

      if (respuestaLogin.data.isSuccess) {
        if (respuestaLogin.data.rol === "Agente") {
          router.replace("/(agente)/(tabs)/inicio");
        } else if (respuestaLogin.data.rol === "Cliente") {
          router.replace("/(agente)/(tabs)/inicio");
        } else if (respuestaLogin.data.rol === "Gestion") {
          router.replace("/(agente)/(tabs)/inicio");
        }
      }
    } catch (error: any) {
      console.log("login", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {/* Imagen en la parte superior, fija */}
      <View style={styles.topImageContainer}>
        <Image source={images.topVector} style={styles.topImage} />
      </View>

      {/* Contenido desplazable */}
      <ScrollView style={styles.scrollContent}>
        <View className="flex items-center justify-center">
          <Image
            source={images.iconoCompleto}
            style={{
              width: 200,
              height: 150,
              resizeMode: "contain",
            }}
          />
        </View>

        <View style={styles.helloContainer}>
          <Text style={styles.helloText}>Bienvenido!</Text>
        </View>

        <View>
          <Text style={styles.signInText}>Inicia sesión en tu cuenta</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Icon name="mail" size={24} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholderTextColor="#a9a9a9"
              placeholder="Correo"
              textContentType="emailAddress"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock-closed" size={24} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholderTextColor="#a9a9a9"
              placeholder="Contraseña"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                color="#E1A500"
                size={18}
                style={styles.inputIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Mostrar errores */}
          {errores.length > 0 && (
            <View className="mb-5">
              {errores.map((error, index) => (
                <Text key={index} className="text-danger-500">
                  {error}
                </Text>
              ))}
            </View>
          )}

          <CustomButton title="Iniciar sesión" onPress={handleLogin} />

          {loading && (
            <Progress.Bar
              indeterminate={true}
              width={null}
              color="#ED9224"
              className="mt-5"
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  topImageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  topImage: {
    width: "100%",
    height: 130,
  },
  scrollContent: {
    flex: 1,
    paddingTop: 150,
    zIndex: 1,
  },
  helloContainer: {
    alignItems: "center",
  },
  helloText: {
    textAlign: "center",
    fontSize: 60,
    fontWeight: "500",
  },
  signInText: {
    textAlign: "center",
    fontSize: 22,
    marginBottom: 10,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
    height: 50,
    elevation: 10,
    marginBottom: 20,
  },
  inputIcon: {
    color: "#ed9224",
    marginLeft: 20,
    marginRight: 15,
  },
  textInput: {
    flex: 1,
    height: "100%",
    fontSize: 20,
  },
});

export default LoginScreen;
