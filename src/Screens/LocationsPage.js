import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { MedaContext } from "../context/MedaContext";
import { getLocations } from "../Firebase/add_location";

import { Table, Row, Rows } from "react-native-table-component";
import { Colors } from "react-native-paper";

const LocationsPage = ({ medaExt }) => {
  const [medaExtVal, setMedaExtVal] = useContext(MedaContext);
  const [locations, setLocations] = useState([]);
  const tableHead = ["Name", "Type", "Region", "City", "Woreda", "House No"];

  useEffect(() => {
    getLocations(JSON.parse(medaExtVal.megaExt)["userId"])
      .then((res) => {
        setLocations(res.locations);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, []);

  console.log(medaExtVal);
  return (
    <ScrollView scrollEnabled={true}>
      <Text
        style={{
          color: Colors.black,
          fontSize: 25,
          // marginBottom: 10,
          marginTop: 20,
          paddingLeft: 20,
        }}
      >
        Saved locations
      </Text>
      <ScrollView horizontal={true}>
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Row textStyle={styles.text} data={tableHead} style={styles.head} />
            <Rows
              textStyle={styles.text}
              data={locations.map((location) => {
                return [
                  location.name,
                  location.type,
                  location.region,
                  location.city,
                  location.woreda,
                  location.hoseNo,
                ];
              })}
            />
          </Table>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
    width: 600,
  },
  head: { height: 50, backgroundColor: "#f1f8ff" },
  text: {
    color: "black",
    paddingHorizontal: 1,
    marginVertical: 10,
    marginLeft: 10,
  },
});

export default LocationsPage;
