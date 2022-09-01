import React, { useEffect, useState } from 'react'
import { ScrollView, ToastAndroid, StyleSheet, Dimensions, TouchableOpacity, Text, View, LayoutAnimation } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
// import { withTiming } from 'react-native-reanimated'
import colors from '../Util/colors'
import checkRequestPermissions from '../Util/permissions'

const HomePage = ({ navigation }) => {
    const [showMap, setShowMap] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState()
    const mapRef = React.createRef();




    const requestPermission = async () => {

        try {
            await checkRequestPermissions("android.permission.INTERNET")
            setShowMap(true)
        } catch (error) {
            setShowMap(false)
            ToastAndroid.showWithGravity(
                "Please grant internet permission to display map.",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
        }
    }

    useEffect(() => {
        requestPermission()
    }, [])

    return (
        <ScrollView>
            <View>
                {
                    showMap &&
                    <MapView ref={mapRef} onPress={e => {
                        // LayoutAnimation.easeInEaseOut()
                        // changeRegion(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
                        ToastAndroid.showWithGravity(
                            `Latitude : ${e.nativeEvent.coordinate.latitude}, Lang : ${e.nativeEvent.coordinate.longitude}`,
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER
                        )
                        mapRef.current.animateToRegion({
                            ...e.nativeEvent.coordinate, latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        })
                        setSelectedLocation(e.nativeEvent.coordinate)
                    }} initialRegion={{
                        latitude: 8.9806, longitude: 38.7578, latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }} style={styles.map}>
                        <Marker coordinate={selectedLocation != null ? selectedLocation : { latitude: 8.9806, longitude: 38.7578 }} />
                    </MapView>
                }
            </View>

            <View>
                <TouchableOpacity onPress={() => {
                    if (!selectedLocation) {
                        ToastAndroid.showWithGravity(
                            `Please select location first.`,
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER
                        )
                        return
                    }
                    navigation.navigate('LocationInfo', selectedLocation)
                }} disabled={!selectedLocation} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: !selectedLocation ? colors.DARK_ORANGE : colors.ORANGE, height: 50, margin: 15, borderRadius: 10 }}>
                    <Text style={{ color: 'white', fontSize: 30, textAlign: 'center', fontWeight: selectedLocation ? 'bold' : 'normal' }}>Submit Location</Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 70,
    },
});
export default HomePage