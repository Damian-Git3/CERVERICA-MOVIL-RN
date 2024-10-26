import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";

import * as Progress from "react-native-progress";
import Toast from "react-native-toast-message";

const RegistroCliente = () => {
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    correo: "",
    password: "",
    passwordConfirm: "",
  });

  const [errores, setErrores] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const { onRegisterUsuarioCliente } = useAuth();

  const validarFormulario = () => {
    const erorresFormulario: string[] = [];

    if (!nuevoUsuario.nombre || nuevoUsuario.nombre.trim() == "") {
      erorresFormulario.push("El nombre no debe estar vacío");
    }

    if (!nuevoUsuario.correo || nuevoUsuario.correo.trim() == "") {
      erorresFormulario.push("El correo no debe estar vacío");
    }

    if (!nuevoUsuario.password || nuevoUsuario.password.trim() == "") {
      erorresFormulario.push("La contraseña no debe estar vacia");
    }

    if (
      !nuevoUsuario.passwordConfirm ||
      nuevoUsuario.passwordConfirm.trim() == ""
    ) {
      erorresFormulario.push("La confirmación no debe estar vacío");
    }

    if (erorresFormulario.length != 0) {
      setErrores(erorresFormulario);
      return false;
    } else {
      return true;
    }
  };

  const validarPassword = () => {
    if (nuevoUsuario.password !== nuevoUsuario.passwordConfirm) {
      setErrores(["Las contraseñas deben coincidir"]);
      return false;
    }

    return true;
  };

  const handleRegistrarUsuario = async () => {
    setErrores([]);

    if (!validarFormulario()) return;

    if (!validarPassword()) return;

    setLoading(true);

    try {
      const respuestaRegistrarUsuario = await onRegisterUsuarioCliente!({
        email: nuevoUsuario.correo,
        fullName: nuevoUsuario.nombre,
        password: nuevoUsuario.password,
        role: "Cliente",
      });

      if (respuestaRegistrarUsuario.errors) {
        const newErrors: string[] = [];

        Object.values(respuestaRegistrarUsuario.errors).forEach(
          (errorMessages) => {
            if (Array.isArray(errorMessages)) {
              newErrors.push(...errorMessages);
            } else if (typeof errorMessages == "string") {
              newErrors.push(errorMessages);
            }
          }
        );

        setErrores(newErrors);

        return;
      }

      console.log(respuestaRegistrarUsuario.data);

      if (respuestaRegistrarUsuario.data.isSuccess == false) {
        setErrores([respuestaRegistrarUsuario.data.message]);
      }

      if (respuestaRegistrarUsuario.data.isSuccess) {
        Toast.show({
          type: "success",
          text1: "Cuenta creada!",
          text2: "Inicia sesión con tus datos 🎉",
        });

        router.replace("/(auth)/login");
      }
    } catch (error: any) {
      console.log("login", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setNuevoUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <View className="flex-1 bg-[#F5F5F5]">
      {/* Imagen en la parte superior, fija */}
      <View className="absolute top-0 left-0 right-0 z-2">
        <Image source={images.topVector} className="w-full h-[150]" />
      </View>

      {/* Contenido desplazable */}
      <ScrollView className="flex-1 pt-[150] z-1">
        <View className="items-center mt-5 mb-10">
          <Text className="text-center text-[60px] font-medium">
            Registrate
          </Text>
        </View>

        <View className="px-5">
          {/* Input nombre */}
          <View style={styles.inputContainer}>
            <Icon name="person-sharp" size={24} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholderTextColor="#a9a9a9"
              placeholder="Nombre"
              value={nuevoUsuario.nombre}
              onChangeText={(value) => handleInputChange("nombre", value)}
            />
          </View>

          {/* Input correo */}
          <View style={styles.inputContainer}>
            <Icon name="mail" size={24} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholderTextColor="#a9a9a9"
              placeholder="Correo"
              textContentType="emailAddress"
              keyboardType="email-address"
              value={nuevoUsuario.correo}
              onChangeText={(value) => handleInputChange("correo", value)}
            />
          </View>

          {/* Input contraseña */}
          <View style={styles.inputContainer}>
            <Icon name="lock-closed" size={24} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholderTextColor="#a9a9a9"
              placeholder="Contraseña"
              secureTextEntry={!showPassword}
              value={nuevoUsuario.password}
              onChangeText={(value) => handleInputChange("password", value)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                color="#E1A500"
                size={18}
                style={styles.inputIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Input confirmar contraseña */}
          <View style={styles.inputContainer}>
            <Icon name="lock-closed" size={24} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholderTextColor="#a9a9a9"
              placeholder="Confirmar contraseña"
              secureTextEntry={!showPasswordConfirm}
              value={nuevoUsuario.passwordConfirm}
              onChangeText={(value) =>
                handleInputChange("passwordConfirm", value)
              }
            />
            <TouchableOpacity
              onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}
            >
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

          <CustomButton title="Registrarme" onPress={handleRegistrarUsuario} />

          {loading && (
            <Progress.Bar
              indeterminate={true}
              width={null}
              color="#ED9224"
              className="mt-5"
            />
          )}
        </View>

        <TouchableOpacity
          onPress={() => router.replace("/(auth)/registro-tipo-cuenta")}
          className="mt-14"
        >
          <Text className="text-[#ed9224] text-lg text-center">← Regresar</Text>
        </TouchableOpacity>
      </ScrollView>

      <View className="absolute bottom-0 left-0" pointerEvents="none">
        <ImageBackground
          source={images.leftVectorLogin}
          className="h-[250px] w-[150px]"
        />
      </View>
    </View>
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

export default RegistroCliente;
