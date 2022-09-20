import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PinInputPage from "../Screens/PinInputPage";
import HomePage from "../Screens/HomePage";
import LocationInfo from "../Screens/LocationInfo";
import { Appbar } from "react-native-paper";

import { StyleSheet } from "react-native";
import LocationsPage from "../Screens/LocationsPage";
const appBarStyle = StyleSheet.create({
  item: {
    backgroundColor: "orange",
  },
});

const CustomAppBar = ({ navigation }) => (
  <Appbar.Header style={appBarStyle.item}>
    <Appbar.Content title="Location" />
    <Appbar.Action
      icon="eye-arrow-right"
      onPress={() => {
        navigation.navigate("Locations");
      }}
    />
  </Appbar.Header>
);

const Stack = createNativeStackNavigator();

export default function MainRoute({ medaExt }) {
  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PinInputPage">
        <Stack.Screen
          name="PinInputPage"
          options={{
            headerShown: false,
          }}
          component={PinInputPage}
        />
        <Stack.Screen
          name="HomePage"
          options={{
            header: CustomAppBar,
            headerShown: true,
          }}
          component={HomePage}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="LocationInfo"
          component={LocationInfo}
        />

        <Stack.Screen
          name="Locations"
          options={{
            headerShown: false,
          }}
          component={LocationsPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
