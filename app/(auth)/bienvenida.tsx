import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import CustomButton from "@/components/CustomButton";
import { slidersBienvenida } from "@/constants";
import { router } from "expo-router";

const Bienvenida = () => {
  const swiperRef = useRef<Swiper>(null);
  const [sliderActual, setSliderActual] = useState(0);

  const isLastSlide = sliderActual === slidersBienvenida.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/login");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Saltar</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#9ea2a7] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#ed9224] rounded-full" />
        }
        onIndexChanged={(indice) => setSliderActual(indice)}
      >
        {slidersBienvenida.map((slider) => (
          <View
            key={slider.id}
            className="flex items-center justify-center p-5"
          >
            <Image
              source={slider.imagen}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-black text-3xl font-bold mx-10 text-center">
                {slider.titulo}
              </Text>
            </View>
            <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
              {slider.descripcion}
            </Text>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={isLastSlide ? "Iniciar sesión" : "Siguiente"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/login")
            : swiperRef.current?.scrollBy(1)
        }
        className="w-11/12 mt-10 mb-5"
      />
    </SafeAreaView>
  );
};

export default Bienvenida;
