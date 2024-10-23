import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import loginRequest from "../../services/authService";
import { API_URL } from '@env';
import axios from "axios";

const SignupMayoristaScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Nuevos estados para la información de la empresa y contacto
    const [nombreEmpresa, setNombreEmpresa] = useState("");
    const [direccionEmpresa, setDireccionEmpresa] = useState("");
    const [telefonoEmpresa, setTelefonoEmpresa] = useState("");
    const [emailEmpresa, setEmailEmpresa] = useState("");

    const [nombreContacto, setNombreContacto] = useState("");
    const [cargoContacto, setCargoContacto] = useState("");
    const [telefonoContacto, setTelefonoContacto] = useState("");
    const [emailContacto, setEmailContacto] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isPhoneEmpresaValid, setIsPhoneEmpresaValid] = useState(true);
    const [isPhoneContactoValid, setIsPhoneContactoValid] = useState(true);
    const [isEmailEmpresaValid, setIsEmailEmpresaValid] = useState(true);
    const [isEmailContactoValid, setIsEmailContactoValid] = useState(true);

    const [errors, setErrors] = useState({});

    const handleSignUp = async () => {
        setLoading(true);

        // Validar que los campos no estén vacíos
        if (!password || !confirmPassword || !nombreEmpresa || !direccionEmpresa || !telefonoEmpresa || !emailEmpresa || !nombreContacto || !cargoContacto || !telefonoContacto || !emailContacto) {
            Alert.alert("Error", "Todos los campos son obligatorios");
            console.log("Error", "Todos los campos son obligatorios");
            setLoading(false);
            return;
        }

        // Validar que el email sea válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailEmpresa) || !emailRegex.test(emailContacto)) {
            Alert.alert("Error", "Por favor ingresa un correo electrónico válido");
            console.log("Error", "Por favor ingresa un correo electrónico válido");
            setLoading(false);
            return;
        }

        // Validar que la contraseña sea válida
        if (!validatePassword(password)) {
            Alert.alert("Error", "La contraseña debe contener al menos 1 mayúscula, 1 número y 2 caracteres especiales*");
            console.log("Error", "La contraseña debe contener al menos 1 mayúscula, 1 número y 2 caracteres especiales*");
            setLoading(false);
            return;
        }

        // Verificar que las contraseñas coincidan
        if (password !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden");
            console.log("Error", "Las contraseñas no coinciden");
            setLoading(false);
            return;
        }

        // Validar el formato del teléfono (opcional, dependiendo de la región puedes ajustar el regex)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(telefonoEmpresa) || !phoneRegex.test(telefonoContacto)) {
            Alert.alert("Error", "El número de teléfono debe tener 10 dígitos");
            console.log("Error", "El número de teléfono debe tener 10 dígitos");
            setLoading(false);
            return;
        }

        // Crear el objeto con los datos de entrada
        const signUpData = {
            password: password,
            rol: "Mayorista",
            nombreEmpresa: nombreEmpresa,
            direccionEmpresa: direccionEmpresa,
            telefonoEmpresa: telefonoEmpresa,
            emailEmpresa: emailEmpresa,
            
            nombreContacto: nombreContacto,
            cargoContacto: cargoContacto,
            telefonoContacto: telefonoContacto,
            emailContacto: emailContacto
        };

        // Imprimir el objeto en la consola para depuración
        console.log(JSON.stringify(signUpData, null, 2));

        try {
            // Llamar a la API para registrar la cuenta
            await registrarCuenta(signUpData);

            Alert.alert("Success", "Se creó la cuenta exitosamente.");
            console.log("Se creo")

            // Navegar a la pantalla de inicio de sesión después de un registro exitoso
            navigation.navigate("Login");
        } catch (error) {
            console.error("Error en el registro:", error);
            Alert.alert("Error", "No se pudo registrar la cuenta. Intenta nuevamente.");
            console.log("Error")
        } finally {
            setLoading(false);
        }
    };

    // Función para registrar la cuenta
    const registrarCuenta = async (request) => {
        const response = await fetch(`${API_URL}/ClienteMayorista`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        if (!response.ok) {
            // Maneja el error
            throw new Error('Error en la solicitud');
        }
    };


    const handleReturn = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 3000);
        navigation.navigate("Welcome");
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const handleInput = (value, setValue, fieldName) => {
        setValue(value);
        if (value.trim() === "") {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "Este campo es obligatorio*" }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: null }));
        }
    };

    const handleEmailInput = (text, setText, setIsValid, fieldName) => {
        setText(text);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (text.trim() === "") {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "Este campo es obligatorio*" }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: null }));
        }

        // Verificar si el correo tiene un formato válido
        if (emailRegex.test(text)) {
            setIsValid(true);  // Correo válido
        } else {
            setIsValid(false); // Correo inválido
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "El correo electrónico no es válido*" }));
        }
    };


    // Función para validar y limitar la entrada a solo números y 10 caracteres
    const handlePhoneInput = (text, setText, setIsValid, fieldName) => {
        const numericText = text.replace(/[^0-9]/g, '').slice(0, 10);
        setText(numericText);

        if (text.trim() === "") {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "Este campo es obligatorio*" }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: null }));
        }

        // Verificar si el número tiene exactamente 10 caracteres
        if (numericText.length === 10) {
            setIsValid(true);  // Número válido
        } else {
            setIsValid(false); // Número inválido
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "El teléfono debe contener 10 números*" }));
        }
    };

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const specialCharCount = (password.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length;

        return hasUpperCase && hasNumber && specialCharCount >= 2;
    };

    const handlePasswordInput = (text, setText, fieldName) => {
        setText(text);

        if (text.trim() === "") {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "Este campo es obligatorio*" }));
        } else if (!validatePassword(text)) {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "La contraseña debe contener al menos 1 mayúscula, 1 número y 2 caracteres especiales*" }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: null }));
        }
    };

    const handleConfirmPasswordInput = (text, setText, originalPassword, fieldName) => {
        setText(text);

        if (text.trim() === "") {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "Este campo es obligatorio*" }));
        } else if (text !== originalPassword) {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "Las contraseñas no coinciden*" }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: null }));
        }
    };

    const isFormValid =
        !loading &&
        !Object.values(errors).some(error => error !== null) &&
        nombreEmpresa &&
        direccionEmpresa &&
        telefonoEmpresa &&
        emailEmpresa &&
        nombreContacto &&
        cargoContacto &&
        telefonoContacto &&
        emailContacto &&
        password &&
        confirmPassword;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.containerItems}>
                    <View style={styles.circulo1}></View>
                    <View style={styles.circulo2}></View>
                    <View style={styles.circulo3}></View>

                    <Text style={styles.welcomeText}>Crear Cuenta Mayorista</Text>

                    {/* Nuevos campos para la empresa */}
                    <View style={styles.containerFlex}>
                        <View style={styles.inputContainer}>
                            <Icon name="business" size={24} color="#E1A500" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Nombre de la Empresa"
                                placeholderTextColor="#E1A500"
                                value={nombreEmpresa}
                                onChangeText={(text) => handleInput(text, setNombreEmpresa, "nombreEmpresa")}
                            />
                        </View>
                        {errors.nombreEmpresa && <Text style={styles.errorText}>{errors.nombreEmpresa}</Text>}
                    </View>

                    <View style={styles.containerFlex}>
                        <View style={styles.inputContainer}>
                            <Icon name="location" size={24} color="#E1A500" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Dirección de la Empresa"
                                placeholderTextColor="#E1A500"
                                value={direccionEmpresa}
                                onChangeText={(text) => handleInput(text, setDireccionEmpresa, "direccionEmpresa")}
                            />
                        </View>
                        {errors.direccionEmpresa && <Text style={styles.errorText}>{errors.direccionEmpresa}</Text>}
                    </View>

                    <View style={styles.containerFlex}>
                        <View style={styles.inputContainer}>
                            <Icon name="call" size={24} color="#E1A500" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Teléfono de la Empresa"
                                placeholderTextColor="#E1A500"
                                value={telefonoEmpresa}
                                onChangeText={(text) => handlePhoneInput(text, setTelefonoEmpresa, setIsPhoneEmpresaValid, "telefonoEmpresa")}
                                keyboardType="phone-pad"
                            />
                        </View>
                        {errors.telefonoEmpresa && <Text style={styles.errorText}>{errors.telefonoEmpresa}</Text>}
                    </View>

                    <View style={styles.containerFlex}>
                        <View style={styles.inputContainer}>
                            <Icon name="mail" size={24} color="#E1A500" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email de la Empresa"
                                placeholderTextColor="#E1A500"
                                value={emailEmpresa}
                                autoCapitalize="none"
                                onChangeText={(text) => handleEmailInput(text, setEmailEmpresa, setIsEmailEmpresaValid, "emailEmpresa")}
                                keyboardType="email-address"
                            />
                        </View>
                        {errors.emailEmpresa && <Text style={styles.errorText}>{errors.emailEmpresa}</Text>}
                    </View>

                    {/* Nuevos campos de contacto */}
                    <View style={styles.containerFlex}>
                        <View style={styles.inputContainer}>
                            <Icon name="person" size={24} color="#E1A500" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Nombre de Contacto"
                                placeholderTextColor="#E1A500"
                                value={nombreContacto}
                                onChangeText={(text) => handleInput(text, setNombreContacto, "nombreContacto")}
                            />
                        </View>
                        {errors.nombreContacto && <Text style={styles.errorText}>{errors.nombreContacto}</Text>}
                    </View>

                    <View style={styles.containerFlex}>
                        <View style={styles.inputContainer}>
                            <Icon name="person-circle" size={24} color="#E1A500" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Cargo de Contacto"
                                placeholderTextColor="#E1A500"
                                value={cargoContacto}
                                onChangeText={(text) => handleInput(text, setCargoContacto, "cargoContacto")}
                            />
                        </View>
                        {errors.cargoContacto && <Text style={styles.errorText}>{errors.cargoContacto}</Text>}
                    </View>

                    <View style={styles.containerFlex}>
                        <View style={styles.inputContainer}>
                            <Icon name="call" size={24} color="#E1A500" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Teléfono de Contacto"
                                placeholderTextColor="#E1A500"
                                value={telefonoContacto}
                                onChangeText={(text) => handlePhoneInput(text, setTelefonoContacto, setIsPhoneContactoValid, "telefonoContacto")}
                                keyboardType="phone-pad"
                            />
                        </View>
                        {errors.telefonoContacto && <Text style={styles.errorText}>{errors.telefonoContacto}</Text>}
                    </View>

                    <View style={styles.containerFlex}>
                        <View style={styles.inputContainer}>
                            <Icon name="mail" size={24} color="#E1A500" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email de Contacto"
                                placeholderTextColor="#E1A500"
                                value={emailContacto}
                                onChangeText={(text) => handleEmailInput(text, setEmailContacto, setIsEmailContactoValid, "emailContacto")}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                        {errors.emailContacto && <Text style={styles.errorText}>{errors.emailContacto}</Text>}
                    </View>

                    <View style={styles.containerFlex}>
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
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={(text) => handlePasswordInput(text, setPassword, "password")}
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
                        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                    </View>

                    <View style={styles.containerFlex}>
                        <View style={styles.inputContainer}>
                            <Icon
                                name={showConfirmPassword ? "lock-open" : "lock-closed"}
                                size={24}
                                color="#E1A500"
                                style={styles.icon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirmar Contraseña"
                                placeholderTextColor="#E1A500"
                                secureTextEntry={!showConfirmPassword}
                                value={confirmPassword}
                                onChangeText={(text) => handleConfirmPasswordInput(text, setConfirmPassword, password, "confirmPassword")}
                            />
                            <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                                <Icon
                                    name={showConfirmPassword ? "eye-off" : "eye"}
                                    size={24}
                                    color="#E1A500"
                                    style={styles.eyeIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
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
                    <TouchableOpacity
                        style={
                            isFormValid
                                ? styles.signupButton
                                : [styles.signupButton, { backgroundColor: '#d3d3d3', opacity: 0.6 }]
                        }
                        onPress={handleSignUp}
                        disabled={!isFormValid}
                    >
                        <Text style={styles.signupButtonText}>Registrarse</Text>
                    </TouchableOpacity>

                    {loading && (
                        <ActivityIndicator
                            style={styles.progressBar}
                            size="large"
                            color="#E1A500"
                        />
                    )}

                </View>

                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.loginText}>
                        ¿Ya tienes una cuenta?{" "}
                        <Text style={{ color: '#E1A500' }}>Iniciar sesión</Text>
                    </Text>
                </TouchableOpacity>

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
        marginBottom: 50,
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
        bottom: 10,
    },
    input: {
        width: "100%",
        height: 50,
        paddingHorizontal: 32,
        backgroundColor: "transparent",
        borderBottomColor: "#E1A500",
        borderBottomWidth: 2,
        paddingHorizontal: 16,

        color: "#fff",
        paddingLeft: 30,
    },
    eyeIcon: {
        bottom: 0,
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
        marginTop: 20
    },
    backButtonIcon: {
        color: "white",
    },
    signupButton: {
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
    signupButtonText: {
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
    loginText: {
        textAlign: "center",
        marginTop: 32,
        marginBottom: 32,
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    inputError: {
        borderBottomColor: 'red',
    },
    errorText: {
        color: "#E1A500",
        fontSize: 12,
    },
    containerFlex: {
        paddingVertical: 5,
    }
});

export default SignupMayoristaScreen;
