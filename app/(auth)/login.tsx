import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";

import * as Progress from "react-native-progress";
import AuthContext from "@/context/Auth/AuthContext";

const LoginScreen = () => {
  const { session } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errores, setErrores] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { onLogin } = useContext(AuthContext);

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

      console.log(respuestaLogin.data.rol);

      if (respuestaLogin.data.isSuccess) {
        if (respuestaLogin.data.rol === "Agente") {
          router.replace("/(crm)/(agente)/solicitudes-mayoristas");
        } else if (respuestaLogin.data.rol === "Cliente") {
          router.replace("/(crm)/(agente)/inicio");
        } else if (respuestaLogin.data.rol === "Gestion") {
          router.replace("/(crm)/(agente)/inicio");
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
    <KeyboardAvoidingView behavior="padding" className="flex-1 bg-white">
      {/* Imagen en la parte superior, fija */}
      <View className="absolute top-0 left-0 right-0 z-2">
        <Image source={images.topVector} className="w-full h-[150]" />
      </View>

      {/* Contenido desplazable */}
      <ScrollView className="flex-1 pt-[150] z-1">
        <View className="flex items-center justify-center">
          <Image
            source={images.iconoCompleto}
            className="w-[200] h-[150]"
            resizeMode="contain"
          />
        </View>

        <View className="items-center mt-5">
          <Text className="text-center text-[60px] font-medium">
            Bienvenido!
          </Text>
        </View>

        <View>
          <Text className="text-center mb-10 text-[22px]">
            Inicia sesión en tu cuenta
          </Text>
        </View>

        <View className="px-5">
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

        <View className="flex-1 justify-center items-center">
          <Text className="text-center mt-28 text-lg">
            No tienes una cuenta?{" "}
            <TouchableOpacity
              onPress={() => router.push("/(auth)/registro-tipo-cuenta")}
            >
              <Text className="text-[#ed9224] text-base">Registrate</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0">
        <ImageBackground
          source={images.leftVectorLogin}
          className="h-[250px] w-[150px]"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
    borderColor: "#ed9224",
    borderWidth: 1,
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
