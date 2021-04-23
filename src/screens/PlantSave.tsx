import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";

import { getBottomSpace } from "react-native-iphone-x-helper";

import { SvgFromUri } from "react-native-svg";

import { format, isBefore } from "date-fns";

import { Button } from "../components/Button";

import waterDrop from "../assets/waterdrop.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { Plant } from "../types";
import { savePlant } from "../libs/storage";

type Params = {
  plant: Plant;
};

export const PlantSave = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { plant } = route.params as Params;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatepicker, setShowDatepicker] = useState(Platform.OS === "ios");

  function handleChangeTime(event: Event, datetime: Date | undefined) {
    if (Platform.OS === "ios") {
      setShowDatepicker(!showDatepicker);
    }

    if (datetime && isBefore(datetime, new Date())) {
      setSelectedDate(new Date());
      return Alert.alert("Escolha uma hora no futuro! ⌚");
    }

    if (datetime) {
      setSelectedDate(datetime);
    }
  }

  function handleOpenDatetimePickerForAndroid() {
    setShowDatepicker(!showDatepicker);
  }

  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDate,
      });

      navigation.navigate("Confirmation", {
        title: "Tudo certo!",
        subtitle:
          "Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado",
        buttonTitle: "Muito Obrigado :D",
        icon: "hug",
        nextScreen: "MyPlants",
      });
    } catch (err) {
      Alert.alert("Não foi possível salvar. 😔");
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri uri={plant.photo} height={150} width={150} />

          <Text style={styles.name}>{plant.name}</Text>
          <Text style={styles.about}>{plant.about}</Text>
        </View>

        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image source={waterDrop} style={styles.tipImage} />
            <Text style={styles.tipText}>{plant.water_tips}</Text>
          </View>

          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>

          {showDatepicker && (
            <DateTimePicker
              value={selectedDate}
              mode="time"
              display="spinner"
              onChange={handleChangeTime}
              textColor={colors.green}
            />
          )}

          {Platform.OS === "android" && (
            <TouchableOpacity
              onPress={handleOpenDatetimePickerForAndroid}
              style={styles.datetimePickerButton}
            >
              <Text style={styles.datetimePickerText}>{`Mudar ${format(
                selectedDate,
                "HH:mm"
              )}`}</Text>
            </TouchableOpacity>
          )}

          <Button title="Cadastrar planta" onPress={handleSave} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.shape,
  },

  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shape,
  },

  name: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },

  about: {
    textAlign: "center",
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },

  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },

  tipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: "relative",
    bottom: 60,
  },

  tipImage: {
    width: 56,
    height: 56,
  },

  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    textAlign: "justify",
  },

  alertLabel: {
    textAlign: "center",
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },

  datetimePickerButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 40,
  },

  datetimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
});
