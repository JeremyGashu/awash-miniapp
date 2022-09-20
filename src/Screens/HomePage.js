import Geolocation from "@react-native-community/geolocation";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  ToastAndroid,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
// import { withTiming } from 'react-native-reanimated'
import colors from "../Util/colors";
import checkRequestPermissions from "../Util/permissions";

const HomePage = ({ navigation }) => {
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState();
  const mapRef = React.useRef();

  const requestPermission = async () => {
    try {
      await checkRequestPermissions("android.permission.INTERNET");
      await checkRequestPermissions("android.permission.ACCESS_FINE_LOCATION");
      setShowMap(true);
    } catch (error) {
      setShowMap(false);
      ToastAndroid.showWithGravity(
        "Please grant internet permission to display map.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (showMap) {
        console.log(mapRef.current.animateToRegion);
        Geolocation.getCurrentPosition(
          (pos) => {
            setSelectedLocation({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });

            mapRef.current.animateToRegion({
              ...pos.coords,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            });
          },
          (err) => {
            ToastAndroid.showWithGravity(
              "Please grant location permission to display map.",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          }
        );
      }
    }, 1500);

    return () => {};
  }, [showMap]);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View>
        {showMap && (
          <MapView
            ref={mapRef}
            onPress={(e) => {
              // LayoutAnimation.easeInEaseOut()
              // changeRegion(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)

              mapRef.current.animateToRegion({
                ...e.nativeEvent.coordinate,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              });
              setSelectedLocation(e.nativeEvent.coordinate);
            }}
            initialRegion={{
              latitude: 8.9806,
              longitude: 38.7578,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            style={styles.map}
          >
            <Marker
              coordinate={
                selectedLocation != null
                  ? selectedLocation
                  : { latitude: 8.9806, longitude: 38.7578 }
              }
            />
          </MapView>
        )}
      </View>

      <View
        style={{
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (!selectedLocation) {
              ToastAndroid.showWithGravity(
                `Please select location first.`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
              return;
            }
            navigation.navigate("LocationInfo", selectedLocation);
          }}
          disabled={!selectedLocation}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: !selectedLocation
              ? colors.DARK_ORANGE
              : colors.ORANGE,
            height: 50,
            margin: 15,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 30,
              textAlign: "center",
              fontWeight: selectedLocation ? "bold" : "normal",
            }}
          >
            Submit Location
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 150,
  },
});
export default HomePage;
