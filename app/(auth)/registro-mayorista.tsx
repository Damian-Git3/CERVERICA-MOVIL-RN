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
// @ts-ignore
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";

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

  const [isContactoValido, setIsContactoValido] = useState(false);
  const [isEmpresaValido, setIsEmpresaValido] = useState(false);
  const [erroresFormularioContacto, setErroresFormularioContacto] = useState<
    string[]
  >([]);

  const [erroresFormularioEmpresa, setErroresFormularioEmpresa] = useState<
    string[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const { onRegisterUsuarioMayorista } = useContext(AuthContext);

  const [pasoActual, setPasoActual] = useState(0);

  const validarFormularioContacto = () => {
    const errores = [];

    if (!nuevoMayorista.nombreContacto.trim()) {
      errores.push("El nombre no debe estar vacío");
    }
    if (!nuevoMayorista.emailContacto.trim()) {
      errores.push("El correo no debe estar vacío");
    } else if (
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(nuevoMayorista.emailContacto)
    ) {
      errores.push("El formato del correo es inválido");
    }
    if (!nuevoMayorista.cargoContacto.trim()) {
      errores.push("El cargo no debe estar vacío");
    }
    if (!nuevoMayorista.telefonoContacto.trim()) {
      errores.push("El teléfono no debe estar vacío");
    } else if (!/^\d{10}$/.test(nuevoMayorista.telefonoContacto)) {
      errores.push("El teléfono debe contener 10 dígitos");
    }
    if (!nuevoMayorista.passwordContacto.trim())
      errores.push("La contraseña no debe estar vacia");
    if (
      nuevoMayorista.passwordContacto !== nuevoMayorista.passwordConfirmContacto
    ) {
      errores.push("Las contraseñas deben coincidir");
    }

    setErroresFormularioContacto(errores);
    setIsContactoValido(errores.length === 0);
  };

  useEffect(() => {
    validarFormularioContacto();
  }, [
    nuevoMayorista.nombreContacto,
    nuevoMayorista.emailContacto,
    nuevoMayorista.telefonoContacto,
    nuevoMayorista.cargoContacto,
    nuevoMayorista.passwordContacto,
    nuevoMayorista.passwordConfirmContacto,
  ]);

  const validarFormularioEmpresa = () => {
    const errores = [];

    if (!nuevoMayorista.nombreEmpresa.trim()) {
      errores.push("El nombre no debe estar vacío");
    }

    if (!nuevoMayorista.emailEmpresa.trim()) {
      errores.push("El correo no debe estar vacío");
    } else if (
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(nuevoMayorista.emailEmpresa)
    ) {
      errores.push("El formato del correo es inválido");
    }

    if (!nuevoMayorista.direccionEmpresa.trim()) {
      errores.push("El cargo no debe estar vacío");
    }

    if (!nuevoMayorista.telefonoEmpresa.trim()) {
      errores.push("El teléfono no debe estar vacío");
    } else if (!/^\d{10}$/.test(nuevoMayorista.telefonoEmpresa)) {
      errores.push("El teléfono debe contener 10 dígitos");
    }

    if (!nuevoMayorista.RFCEmpresa.trim()) {
      errores.push("El RFC no debe estar vacío");
    } else if (
      !/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/.test(
        nuevoMayorista.RFCEmpresa
      )
    ) {
      errores.push("El RFC no tiene un formato válido");
    }

    setErroresFormularioEmpresa(errores);
    setIsEmpresaValido(errores.length === 0);
  };

  useEffect(() => {
    validarFormularioEmpresa();
  }, [
    nuevoMayorista.nombreEmpresa,
    nuevoMayorista.emailEmpresa,
    nuevoMayorista.direccionEmpresa,
    nuevoMayorista.telefonoEmpresa,
    nuevoMayorista.RFCEmpresa,
  ]);

  const handleRegistrarUsuario = async () => {
    setErroresFormularioContacto([]);
    setErroresFormularioEmpresa([]);

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
        rfcEmpresa: nuevoMayorista.RFCEmpresa,

        rol: "Mayorista",
      });

      if (respuestaRegistrarUsuario.isSuccess) {
        Toast.show({
          type: "success",
          text1: "Cuenta creada!",
          text2: "Inicia sesión con tus datos 🎉",
        });

        router.replace("/(auth)/login");
      } else {
        if (respuestaRegistrarUsuario.errors) {
          Toast.show({
            type: "error",
            text1: "Algo sucedio!",
            text2: "No se pudo completar el registro:(",
          });

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

          if (respuestaRegistrarUsuario.pantallaErrores == "usuario") {
            setErroresFormularioContacto(newErrors);
            setPasoActual(0);
          } else {
            setErroresFormularioEmpresa(newErrors);
            setPasoActual(1);
          }

          return;
        }
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
        activeStep={pasoActual}
      >
        <ProgressStep
          label="Datos usuario"
          nextBtnText="Siguiente"
          onNext={validarFormularioContacto}
          removeBtnRow={true}
        >
          <View style={{ alignItems: "center" }} className="px-5">
            <View className="items-center mb-5">
              <Text className="text-center text-[60px] font-medium">
                Contacto
              </Text>
            </View>

            <View className="w-full">
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
                  placeholder="Teléfono"
                  keyboardType="phone-pad"
                  value={nuevoMayorista.telefonoContacto}
                  maxLength={10}
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

            {/* Mostrar errores */}
            {erroresFormularioContacto.length > 0 && (
              <View className="mb-5 w-full">
                {erroresFormularioContacto.map((error, index) => (
                  <Text key={index} className="text-danger-500">
                    {error}
                  </Text>
                ))}
              </View>
            )}

            <CustomButton
              title="Siguiente"
              onPress={() => setPasoActual(1)}
              disabled={!isContactoValido}
              className="mb-14"
            />
          </View>
        </ProgressStep>
        <ProgressStep
          label="Datos empresa"
          previousBtnText="Anterior"
          finishBtnText="Registrarme"
          removeBtnRow={true}
        >
          <View style={{ alignItems: "center" }} className="px-5">
            <View className="items-center mb-5">
              <Text className="text-center text-[60px] font-medium">
                Empresa
              </Text>
            </View>

            {loading && (
              <Progress.Bar
                indeterminate={true}
                width={350}
                color="#ED9224"
                className="mb-5"
              />
            )}

            {/* Input nombre empresa */}
            <View style={styles.inputContainer}>
              <Icon name="business" size={24} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholderTextColor="#a9a9a9"
                placeholder="Nombre empresa"
                value={nuevoMayorista.nombreEmpresa}
                onChangeText={(value) =>
                  handleInputChange("nombreEmpresa", value)
                }
              />
            </View>

            {/* Input correo */}
            <View style={styles.inputContainer}>
              <Icon name="mail" size={24} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholderTextColor="#a9a9a9"
                placeholder="Correo empresa"
                textContentType="emailAddress"
                keyboardType="email-address"
                value={nuevoMayorista.emailEmpresa}
                onChangeText={(value) =>
                  handleInputChange("emailEmpresa", value)
                }
              />
            </View>

            {/* Input dirección empresa */}
            <View style={styles.inputContainer}>
              <Icon name="pin" size={24} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholderTextColor="#a9a9a9"
                placeholder="Dirección empresa"
                value={nuevoMayorista.direccionEmpresa}
                onChangeText={(value) =>
                  handleInputChange("direccionEmpresa", value)
                }
              />
            </View>

            {/* Input teléfono empresa */}
            <View style={styles.inputContainer}>
              <Icon name="call" size={24} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholderTextColor="#a9a9a9"
                placeholder="Teléfono empresa"
                maxLength={10}
                value={nuevoMayorista.telefonoEmpresa}
                keyboardType="phone-pad"
                onChangeText={(value) =>
                  handleInputChange("telefonoEmpresa", value)
                }
              />
            </View>

            {/* Input RFC empresa */}
            <View style={styles.inputContainer}>
              <Icon name="storefront" size={24} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholderTextColor="#a9a9a9"
                placeholder="RFC Empresa"
                maxLength={13}
                value={nuevoMayorista.RFCEmpresa}
                onChangeText={(value) => handleInputChange("RFCEmpresa", value)}
              />
            </View>

            {/* Mostrar errores */}
            {erroresFormularioEmpresa.length > 0 && (
              <View className="mb-5 w-full">
                {erroresFormularioEmpresa.map((error, index) => (
                  <Text key={index} className="text-danger-500">
                    {error}
                  </Text>
                ))}
              </View>
            )}

            <CustomButton
              title="Registrarme"
              onPress={handleRegistrarUsuario}
              disabled={!isEmpresaValido}
              className="mb-5"
            />

            <CustomButton
              title="Anterior"
              bgVariant="secondary"
              onPress={() => setPasoActual(0)}
            />
          </View>
        </ProgressStep>
      </ProgressSteps>

      <View className="absolute bottom-0 left-0" pointerEvents="none">
        <ImageBackground
          source={images.leftVectorSignUp}
          className="h-[250px] w-[150px] -translate-x-14"
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
