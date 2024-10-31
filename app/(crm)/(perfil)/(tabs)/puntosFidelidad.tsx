import { useContext } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";

const Puntosfidelidad = () => {
  const navigation = useNavigation();
  navigation.setOptions({ headerShown: false });
  /* const { puntosFidelidad, transacciones } = useContext(PerfilContext); */

  const puntosFidelidad = {
    puntosAcumulados: 0,
    puntosRedimidos: 0,
    puntosDisponibles: 0,
    fechaUltimaActualizacion: "30/10/24",
  };

  const transacciones: any = [];

  return (
    <SafeAreaView>
      <View>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Puntos de Fidelidad
        </Text>
        {puntosFidelidad ? (
          <View>
            <Text>
              Puntos Acumulados: {puntosFidelidad.puntosAcumulados ?? 0}
            </Text>
            <Text>
              Puntos Redimidos: {puntosFidelidad.puntosRedimidos ?? 0}
            </Text>
            <Text>
              Puntos Disponibles: {puntosFidelidad.puntosDisponibles ?? 0}
            </Text>
            <Text>
              Fecha Última Actualización:{" "}
              {puntosFidelidad.fechaUltimaActualizacion
                ? new Date(
                    puntosFidelidad.fechaUltimaActualizacion
                  ).toLocaleDateString()
                : "No disponible"}
            </Text>
          </View>
        ) : (
          <View>
            <Text>Puntos Acumulados: 0</Text>
            <Text>Puntos Redimidos: 0</Text>
            <Text>Puntos Disponibles: 0</Text>
          </View>
        )}
      </View>

      <View>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Transacciones</Text>
        {transacciones && transacciones.length > 0 ? (
          transacciones.map((transaccion: any) => (
            <View key={transaccion.id} style={{ marginBottom: 10 }}>
              <Text>ID Transacción: {transaccion.id}</Text>
              <Text>Puntos: {transaccion.puntos}</Text>
              <Text>Tipo de Transacción: {transaccion.tipoTransaccion}</Text>
              <Text>
                Fecha:{" "}
                {new Date(transaccion.fechaTransaccion).toLocaleDateString()}
              </Text>
              <Text>Descripción: {transaccion.descripcion}</Text>
            </View>
          ))
        ) : (
          <Text>No hay transacciones disponibles.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Puntosfidelidad;
