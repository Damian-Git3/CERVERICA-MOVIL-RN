import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Inicio = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1">
      <Text>Inicio</Text>
    </View>
  );
};

export default Inicio;
