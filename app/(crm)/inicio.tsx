import { images } from "@/constants";
import AuthContext from "@/context/Auth/AuthContext";
import React, { useContext } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  Button,
} from "react-native";

const Inicio = () => {
  const { session } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>¡Bienvenido, {session?.nombre}!</Text>
        <Text style={styles.subtitle}>Nos alegra verte de nuevo.</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={images.iconoCompleto} // Aquí puedes agregar un logo o imagen de bienvenida
          style={styles.image}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.description}>
          Explora las nuevas funcionalidades de la aplicación!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 100,
  },
  footer: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#777",
  },
});

export default Inicio;
