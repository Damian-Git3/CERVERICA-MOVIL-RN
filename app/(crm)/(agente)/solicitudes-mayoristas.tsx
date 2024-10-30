import SolicitudMayoristaCard from "@/components/Agente/SolicitudesMayoristas/SolicitudMayoristaCard";
import { images } from "@/constants";
import AuthContext from "@/context/Auth/AuthContext";
import useSolicitudesMayoristas from "@/hooks/useSolicitudesMayoristas";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SolicitudesMayoristas = () => {
  const { getSolicitudesMayoristas, solicitudesMayoristas, cargando } =
    useSolicitudesMayoristas();
  const { session } = useContext(AuthContext);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getSolicitudesMayoristas!();
  }, []);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await getSolicitudesMayoristas!();
    setIsRefreshing(false);
  };

  return (
    <View className="flex-1 px-3">
      <FlatList
        data={solicitudesMayoristas}
        renderItem={({ item }) => (
          <SolicitudMayoristaCard solicitudMayorista={item} />
        )}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {cargando ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No se encontraron solicitudes de mayoristas"
                  resizeMode="contain"
                />
                <Text className="text-sm">
                  No se encontraron solicitudes de mayoristas
                </Text>
              </>
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="flex flex-row items-center justify-between my-5">
            <Text className="text-2xl font-JakartaExtraBold">
              Bienvenido {session?.nombre} 👋
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default SolicitudesMayoristas;
