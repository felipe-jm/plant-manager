import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";

import { getStatusBarHeight } from "react-native-iphone-x-helper";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export const Header = () => (
  <View style={styles.container}>
    <View>
      <Text style={styles.greeting}>Olá</Text>
      <Text style={styles.username}>Felipe</Text>
    </View>

    <Image
      source={{ uri: "https://github.com/felipe-jm.png" }}
      style={styles.image}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
    padding: 20,
  },

  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  username: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 40,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});
