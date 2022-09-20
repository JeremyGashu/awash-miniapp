import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { headerTextStyle } from "../Styles/PinInputPage";
import colors from "../Util/colors";
import DropDownPicker from "react-native-dropdown-picker";
import { saveLocation } from "../Firebase/add_location";
import { MedaContext } from "../context/MedaContext";

// import Geolocation from 'react-native-geolocation-service';

const LocationInfo = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);

  const [typeOpen, setTypeOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const [typeValue, setTypeValue] = useState();
  const [regionValue, setRegionValue] = useState();
  const [typeItems, setTypeItems] = useState([
    { label: "Branch", value: "Branch" },
    { label: "ATM", value: "ATM" },
    { label: "POS", value: "POS" },
    { label: "Agent", value: "Agent" },
    { label: "District", value: "District" },
  ]);
  const [userId, setUserId] = useState("");

  const [medaExtVal, setMedaExtVal] = useContext(MedaContext);

  const [regionItems, setRegionItems] = useState([
    { label: "Addis Ababa", value: "Addis Ababa" },
    { label: "Afar", value: "Afar" },
    { label: "Amhara", value: "Amhara" },
    { label: "Benishangul-Gumuz", value: "Benishangul-Gumuz" },
    { label: "Dire Dawa", value: "Dire Dawa" },
    { label: "Gambela", value: "Gambela" },
    { label: "Harari", value: "Harari" },
    { label: "Oromia", value: "Oromia" },
    { label: "Somali", value: "Somali" },
    { label: "Tigray", value: "Tigray" },
    { label: "SNNPR", value: "SNNPR" },
    { label: "Sidama", value: "Sidama" },
    { label: "SWEPR", value: "SWEPR" },
  ]);

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [woreda, setWoreda] = useState("");
  const [hoseNo, setHouseNo] = useState("");

  const handleSubmitLocation = () => {
    if (!typeValue) {
      ToastAndroid.showWithGravity(
        `Please select type`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }

    if (!name) {
      ToastAndroid.showWithGravity(
        `Please enter name`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }

    if (!regionValue) {
      ToastAndroid.showWithGravity(
        `Please select region`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }

    if (!city) {
      ToastAndroid.showWithGravity(
        `Please enter city`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }

    if (!woreda) {
      ToastAndroid.showWithGravity(
        `Please enter woreda`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }

    setLoading(true);
    // console.log(userId);
    // return;

    saveLocation({
      name,
      woreda,
      region: regionValue,
      city,
      hoseNo,
      ...route.params,
      type: typeValue,
      userId: userId,
    })
      .then((val) => {
        ToastAndroid.showWithGravity(
          `Saved Location successfully!`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setLoading(false);
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        ToastAndroid.showWithGravity(
          `Error adding location please try again.`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      });
  };

  useEffect(() => {
    setUserId(JSON.parse(medaExtVal.megaExt).userId);

    return () => {};
  }, []);

  return (
    <ScrollView contentContainerStyle={{ justifyContent: "center" }}>
      <View>
        <Text
          style={{
            ...headerTextStyle,
            fontWeight: "bold",
            marginTop: 5,
            marginBottom: 0,
          }}
        >
          Location Information
        </Text>
      </View>

      <View>
        <View
          style={{
            height: 65,
            margin: 10,
            // marginTop: 5,
            // marginHorizontal:15
          }}
        >
          <Text style={{ color: "#444", fontSize: 17, marginBottom: 10 }}>
            Select the type of location
          </Text>
          <DropDownPicker
            placeholder="Type"
            style={{
              borderColor: colors.ORANGE,
              color: colors.DARK_GRAY,
              borderStyle: "solid",
              borderWidth: 2,
              height: 57,
            }}
            open={typeOpen}
            value={typeValue}
            items={typeItems}
            setOpen={setTypeOpen}
            setValue={setTypeValue}
            setItems={setTypeItems}
            labelStyle={{ fontSize: 18 }}
          />
        </View>

        <Text
          style={{ color: "#444", marginLeft: 15, fontSize: 17, marginTop: 20 }}
        >
          Name
        </Text>
        <TextInput
          style={{ ...inputStyle, marginBottom: 0 }}
          placeholder="Name"
          onChangeText={(val) => {
            setName(val);
          }}
          placeholderTextColor={colors.LIGHT_GRAY}
        />

        {/* <Text style={{ color: "#444", marginLeft: 15, fontSize: 17 }}>
          Region
        </Text>
        <TextInput
          style={inputStyle}
          placeholder="Region"
          onChangeText={(val) => {
            setRegion(val);
          }}
          placeholderTextColor={colors.LIGHT_GRAY}
        /> */}

        <View
          style={{
            height: 65,
            margin: 15,
          }}
        >
          <Text style={{ color: "#444", fontSize: 17, marginBottom: 10 }}>
            Select Region
          </Text>
          <DropDownPicker
            placeholder="Region"
            style={{
              borderColor: colors.ORANGE,
              color: colors.DARK_GRAY,
              borderStyle: "solid",
              borderWidth: 2,
              height: 57,
            }}
            open={regionOpen}
            value={regionValue}
            items={regionItems}
            setOpen={setRegionOpen}
            setValue={setRegionValue}
            setItems={setRegionItems}
            labelStyle={{ fontSize: 18 }}
          />
        </View>

        <Text
          style={{ color: "#444", marginLeft: 15, fontSize: 17, marginTop: 20 }}
        >
          City
        </Text>
        <TextInput
          style={inputStyle}
          placeholder="City"
          onChangeText={(val) => {
            setCity(val);
          }}
          placeholderTextColor={colors.LIGHT_GRAY}
        />

        <Text style={{ color: "#444", marginLeft: 15, fontSize: 17 }}>
          Woreda
        </Text>
        <TextInput
          style={inputStyle}
          placeholder="Woreda"
          onChangeText={(val) => {
            setWoreda(val);
          }}
          placeholderTextColor={colors.LIGHT_GRAY}
        />

        <Text style={{ color: "#444", marginLeft: 15, fontSize: 17 }}>
          House Number
        </Text>
        <TextInput
          style={inputStyle}
          placeholder="House No"
          onChangeText={(val) => {
            setHouseNo(val);
          }}
          placeholderTextColor={colors.LIGHT_GRAY}
        />
      </View>
      <TouchableOpacity
        disabled={loading}
        onPress={() => {
          handleSubmitLocation();
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: loading ? colors.DARK_ORANGE : colors.ORANGE,
          height: 50,
          margin: 15,
          borderRadius: 10,
          marginTop: 30,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 30,
            textAlign: "center",
            fontWeight: loading ? "normal" : "bold",
          }}
        >
          Save Location
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const inputStyle = StyleSheet.create({
  height: 55,
  borderStyle: "solid",
  borderWidth: 2,
  borderColor: colors.ORANGE,
  margin: 15,
  color: "#444",
  fontSize: 18,
  paddingLeft: 15,
  paddingVertical: 10,
  borderRadius: 7,
  marginTop: 8,
});

export default LocationInfo;
