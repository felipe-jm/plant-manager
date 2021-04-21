import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Welcome } from "../screens/Welcome";

import { UserIdentification } from "../screens/UserIdentification";
import { Confirmation } from "../screens/Confirmation";
import { PlantsSelection } from "../screens/PlantsSelection";

import colors from "../styles/colors";

const StackRoutes = createStackNavigator();

const AppRoutes = () => (
  <StackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      },
    }}
  >
    <StackRoutes.Screen name="Welcome" component={Welcome} />

    <StackRoutes.Screen
      name="UserIdentification"
      component={UserIdentification}
    />

    <StackRoutes.Screen name="Confirmation" component={Confirmation} />

    <StackRoutes.Screen name="PlantsSelection" component={PlantsSelection} />
  </StackRoutes.Navigator>
);

export default AppRoutes;
