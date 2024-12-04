import { useContext, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import usePuntosFidelidad from "@/hooks/usePuntosFidelidad";
import Icon from "react-native-vector-icons/FontAwesome";
import AuthContext from "@/context/Auth/AuthContext";

const PuntosFidelidad = () => {
  const { onLogout, session } = useContext(AuthContext);

  const {
    getPuntosFidelidad,
    getTransacciones,
    puntosFidelidad,
    transacciones,
    cargando,
  } = usePuntosFidelidad();

  useEffect(() => {
    getPuntosFidelidad();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          PistoPoints <Icon name="beer" size={28} color="#f4a261" />
        </Text>
        {puntosFidelidad ? (
          <>
            <View style={styles.card}>
              <Text style={styles.text}>
                <Text style={styles.label}>Puntos Acumulados:</Text>{" "}
                {puntosFidelidad.puntosAcumulados ?? 0}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Puntos Redimidos:</Text>{" "}
                {puntosFidelidad.puntosRedimidos ?? 0}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Fecha Última Actualización:</Text>{" "}
                {puntosFidelidad.fechaUltimaActualizacion
                  ? new Date(
                    puntosFidelidad.fechaUltimaActualizacion
                  ).toLocaleDateString()
                  : "No disponible"}
              </Text>
            </View>
            <View style={styles.cardHighlight}>
              <Icon name="star" size={24} color="#fff" style={styles.icon} />
              <Text style={styles.textHighlight}>
                Puntos Disponibles: {puntosFidelidad.puntosDisponibles ?? 0}
              </Text>
              <Icon name="star" size={24} color="#fff" style={styles.icon} />
            </View>
          </>
        ) : (
          <>
            <View style={styles.card}>
              <Text style={styles.text}>
                <Text style={styles.label}>Puntos Acumulados:</Text> 0
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Puntos Redimidos:</Text> 0
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Fecha Última Actualización:</Text>{" "}
                No disponible
              </Text>
            </View>
            <View style={styles.cardHighlight}>
              <Icon name="star" size={24} color="#fff" style={styles.icon} />
              <Text style={styles.textHighlight}>Puntos Disponibles: 0</Text>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#343a40",
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    padding: 20,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 16,
  },
  cardHighlight: {
    width: "100%",
    backgroundColor: "#da813b",
    shadowColor: "#000",
    padding: 20,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: "#495057",
  },
  label: {
    fontWeight: "bold",
    color: "#212529",
  },
  textHighlight: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
  },
  icon: {
    marginRight: 8,
    marginLeft: 16,
  },
});

export default PuntosFidelidad;
