import React from "react";
import { StyleSheet, Text } from "react-native";

import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

type EnvironmentButtonProps = {
  title: string;
  active?: boolean;
} & RectButtonProps;

export const EnvironmentButton = ({
  title,
  active = false,
  ...rest
}: EnvironmentButtonProps) => (
  <RectButton
    style={[styles.container, active && styles.containerActive]}
    {...rest}
  >
    <Text style={[styles.text, active && styles.textActive]}>{title}</Text>
  </RectButton>
);

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 76,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: colors.shape,
  },

  containerActive: {
    backgroundColor: colors.green_light,
  },

  text: {
    color: colors.heading,
    fontFamily: fonts.text,
  },

  textActive: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
  },
});
