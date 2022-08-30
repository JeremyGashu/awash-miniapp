import { NativeModules } from "react-native";



const checkRequestPermissions = (permission) =>
    NativeModules.MegaPermissions.checkAndRequest(permission);

export default checkRequestPermissions;