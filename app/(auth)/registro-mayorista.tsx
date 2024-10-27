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
} from "react-native";
import { router } from "expo-router";

import * as Progress from "react-native-progress";
import Toast from "react-native-toast-message";
import AuthContext from "@/context/Auth/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { images } from "@/constants";

const RegistroMayorista = () => {
  const [nuevoMayorista, setNuevoUsuario] = useState({
    nombreContacto: "",
    emailContacto: "",
    telefonoContacto: "",
    cargoContacto: "",
    passwordContacto: "",
    passwordConfirmContacto: "",

    nombreEmpresa: "",
    direccionEmpresa: "",
    telefonoEmpresa: "",
    emailEmpresa: "",
    RFCEmpresa: "",
  });

  console.log(nuevoMayorista);

  const [errores, setErrores] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const { onRegisterUsuarioMayorista } = useContext(AuthContext);

  const validarFormularioContacto = () => {
    const erorresFormulario: string[] = [];

    if (
      !nuevoMayorista.nombreContacto ||
      nuevoMayorista.nombreContacto.trim() == ""
    ) {
      erorresFormulario.push("El nombre no debe estar vacío");
    }

    if (
      !nuevoMayorista.emailContacto ||
      nuevoMayorista.emailContacto.trim() == ""
    ) {
      erorresFormulario.push("El correo no debe estar vacío");
    }

    if (
      !nuevoMayorista.passwordContacto ||
      nuevoMayorista.passwordContacto.trim() == ""
    ) {
      erorresFormulario.push("La contraseña no debe estar vacia");
    }

    if (
      !nuevoMayorista.passwordConfirmContacto ||
      nuevoMayorista.passwordConfirmContacto.trim() == ""
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

  const validarPasswordContacto = () => {
    if (
      nuevoMayorista.passwordContacto !== nuevoMayorista.passwordConfirmContacto
    ) {
      setErrores(["Las contraseñas deben coincidir"]);
      return false;
    }

    return true;
  };

  const handleRegistrarUsuario = async () => {
    setErrores([]);

    if (!validarFormularioContacto()) return;

    if (!validarPasswordContacto()) return;

    setLoading(true);

    try {
      const respuestaRegistrarUsuario = await onRegisterUsuarioMayorista!({
        nombreContacto: nuevoMayorista.nombreContacto,
        cargoContacto: nuevoMayorista.cargoContacto,
        telefonoContacto: nuevoMayorista.telefonoContacto,
        emailContacto: nuevoMayorista.emailContacto,
        password: nuevoMayorista.passwordContacto,

        nombreEmpresa: nuevoMayorista.nombreEmpresa,
        direccionEmpresa: nuevoMayorista.direccionEmpresa,
        telefonoEmpresa: nuevoMayorista.telefonoEmpresa,
        emailEmpresa: nuevoMayorista.emailEmpresa,
        RFCEmpresa: nuevoMayorista.RFCEmpresa,

        rol: "Mayorista",
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
      console.log(error);
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
    <KeyboardAvoidingView behavior="padding" className="flex-1 bg-[#F5F5F5]">
      <View className="absolute top-0 left-0 right-0 z-2">
        <Image
          source={images.topVector}
          className="w-full h-[150] -translate-y-14"
        />
      </View>

      <TouchableOpacity onPress={() => router.back()} className="mt-14">
        <Text className="text-[#ed9224] text-lg text-center">← Regresar</Text>
      </TouchableOpacity>

      <ProgressSteps
        activeStepIconBorderColor="#ed9224"
        progressBarColor="#ed9224"
        completedProgressBarColor="#ed9224"
        completedStepIconColor="#ed9224"
        labelColor="#ed9224"
        activeLabelColor="#ed9224"
      >
        <ProgressStep label="Datos usuario" nextBtnText="Siguiente">
          <View style={{ alignItems: "center" }}>
            <View className="items-center mt-5 mb-10">
              <Text className="text-center text-[60px] font-medium">
                Registrate
              </Text>
            </View>

            <View className="w-full px-5">
              {/* Input nombre */}
              <View style={styles.inputContainer}>
                <Icon name="person-sharp" size={24} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor="#a9a9a9"
                  placeholder="Nombre"
                  value={nuevoMayorista.nombreContacto}
                  onChangeText={(value) =>
                    handleInputChange("nombreContacto", value)
                  }
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
                  value={nuevoMayorista.emailContacto}
                  onChangeText={(value) =>
                    handleInputChange("emailContacto", value)
                  }
                />
              </View>

              {/* Input cargo */}
              <View style={styles.inputContainer}>
                <Icon name="briefcase" size={24} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor="#a9a9a9"
                  placeholder="Cargo"
                  value={nuevoMayorista.cargoContacto}
                  onChangeText={(value) =>
                    handleInputChange("cargoContacto", value)
                  }
                />
              </View>

              {/* Input télefono */}
              <View style={styles.inputContainer}>
                <Icon name="call" size={24} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor="#a9a9a9"
                  placeholder="Telefono"
                  keyboardType="phone-pad"
                  value={nuevoMayorista.telefonoContacto}
                  onChangeText={(value) =>
                    handleInputChange("telefonoContacto", value)
                  }
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
                  value={nuevoMayorista.passwordContacto}
                  onChangeText={(value) =>
                    handleInputChange("passwordContacto", value)
                  }
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
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
                  value={nuevoMayorista.passwordConfirmContacto}
                  onChangeText={(value) =>
                    handleInputChange("passwordConfirmContacto", value)
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
            </View>
          </View>
        </ProgressStep>
        <ProgressStep
          label="Datos empresa"
          previousBtnText="Anterior"
          finishBtnText="Registrarme"
        >
          <View style={{ alignItems: "center" }}>
            <Text>This is the content within step 2!</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>

      <View className="absolute bottom-0 left-0" pointerEvents="none">
        <ImageBackground
          source={images.leftVectorSignUp}
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

export default RegistroMayorista;
