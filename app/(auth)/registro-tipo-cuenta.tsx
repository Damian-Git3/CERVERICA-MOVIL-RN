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
import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";

import * as Progress from "react-native-progress";

const RegistroTipoCuenta = () => {
  return (
    <View className="flex-1 bg-[#F5F5F5]">
      {/* Imagen en la parte superior, fija */}
      <View className="absolute top-0 left-0 right-0 z-2">
        <Image source={images.topVector} className="w-full h-[150]" />
      </View>

      {/* Contenido desplazable */}
      <ScrollView className="flex-1 z-1 pt-[150]">
        <View className="flex items-center justify-center">
          <Image
            source={images.iconoCompleto}
            className="w-[200] h-[150]"
            resizeMode="contain"
          />
        </View>

        <View className="items-center mb-10 mt-5">
          <Text className="text-center text-[40px] font-medium">
            Tipo de cuenta
          </Text>
        </View>

        <View className="p-5">
          <CustomButton
            title="Soy cliente"
            className="mb-10"
            onPress={() => router.push("/(auth)/registro-cliente")}
          />
          <CustomButton
            title="Soy mayorista"
            onPress={() => router.push("/(auth)/registro-mayorista")}
          />
        </View>

        <TouchableOpacity
          onPress={() => router.replace("/(auth)/login")}
          className="mt-14"
        >
          <Text className="text-[#ed9224] text-lg text-center">← Regresar</Text>
        </TouchableOpacity>
      </ScrollView>

      <View className="absolute bottom-0 left-0">
        <ImageBackground
          source={images.leftVectorLogin}
          className="h-[350px] w-[150px]"
        />
      </View>
    </View>
  );
};

export default RegistroTipoCuenta;
