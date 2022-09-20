/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { MedaContext, MedaContextProvider } from "./context/MedaContext";
import MainRoute from "./Routes/MainRoute";
import Colors from "./Util/colors";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
});

export default class App extends Component {
  render() {
    return (
      <MedaContextProvider ext={this.props.medaExt}>
        <View style={styles.container}>
          <StatusBar backgroundColor={Colors.PRIMARY_COLOR_DARK} />
          <MainRoute medaExt={this.props.medaExt} />
        </View>
      </MedaContextProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});
