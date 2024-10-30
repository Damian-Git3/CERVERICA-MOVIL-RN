import React from 'react'
import { icons } from "@/constants";
import AuthContext from "@/context/Auth/AuthContext";
import PerfilContext from "@/context/Perfil/PerfilContext";
import { useRouter } from "expo-router"; // Cambiado a useRouter
import { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";

const notificaciones = () => {
  return (
    <>
        <Text>
            Notificaciones
        </Text>
    </>
  )
}

export default notificaciones