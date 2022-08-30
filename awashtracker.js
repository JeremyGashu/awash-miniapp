/**
 * @format
 */

import { AppRegistry } from "react-native";
import React from "react";
import App from "./src/App";
import { appName } from "./manifest.json";

AppRegistry.registerComponent(appName, () => Render);

const Render = (props) => <App medaExt={props} />;
