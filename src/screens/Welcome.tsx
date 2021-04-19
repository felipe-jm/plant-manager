import React from "react";
import { SafeAreaView, Text, Image, StyleSheet } from "react-native";

import { Button } from "../components/Button";

import wateringImage from "../assets/watering.png";

import colors from "../styles/colors";

const Welcome = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>
      Gerencie {"\n"}
      suas plantas {"\n"}
      de forma fácil
    </Text>

    <Image source={wateringImage} style={styles.image} />

    <Text style={styles.subtitle}>
      Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
      sempre que precisar.
    </Text>

    <Button title="&gt;" />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 16,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.heading,
    marginTop: 28,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },

  image: {
    width: 292,
    height: 284,
  },
});

export default Welcome;
