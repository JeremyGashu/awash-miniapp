import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TextInput, View, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import { headerTextStyle } from '../Styles/PinInputPage'
import colors from '../Util/colors'
import DropDownPicker from 'react-native-dropdown-picker';
import { saveLocation } from '../Firebase/add_location';
import checkRequestPermissions from '../Util/permissions';
import Geolocation from '@react-native-community/geolocation';

// import Geolocation from 'react-native-geolocation-service';


const LocationInfo = ({ route, navigation }) => {

    const [loading, setLoading] = useState(false)
    const [locationGranted, setLocationGranted] = useState(false)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('Branch');
    const [items, setItems] = useState([
        { label: 'Branch', value: 'Branch' },
        { label: 'ATM', value: 'ATM' },
        { label: 'POS', value: 'POS' },
        { label: 'Agent', value: 'Agent' },
        { label: 'District', value: 'District' }
    ]);

    const [name, setName] = useState('')
    const [region, setRegion] = useState('')
    const [city, setCity] = useState('')
    const [woreda, setWoreda] = useState('')
    const [hoseNo, setHouseNo] = useState('')

    const handleSubmitLocation = () => {
        if (!name) {
            ToastAndroid.showWithGravity(
                `Please enter name`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
            return
        }

        if (!region) {
            ToastAndroid.showWithGravity(
                `Please enter region`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
            return
        }

        if (!city) {
            ToastAndroid.showWithGravity(
                `Please enter city`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
            return
        }

        if (!woreda) {
            ToastAndroid.showWithGravity(
                `Please enter woreda`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
            return
        }

        setLoading(true)

        saveLocation({ name, woreda, region, city, hoseNo, ...route.params, type: value }).then(val => {
            ToastAndroid.showWithGravity(
                `Saved Location successfully!`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
            setLoading(false)
            setTimeout(() => {
                navigation.goBack()
            }, 1000)
        }).catch(err => {
            console.log(err)
            ToastAndroid.showWithGravity(
                `Error adding location please try again.`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
        })
    }

    useEffect(() => {
        // requestLocationPermission()
        return () => {

        }
    }, [])
    const requestLocationPermission = async () => {
        // PermissionsAndroid.request('android.permission.ACCESS_COARSE_LOCATION')

        try {
            await checkRequestPermissions("android.permission.ACCESS_FINE_LOCATION")
            setLocationGranted(true)


            // setShowMap(true)
        } catch (error) {
            // setShowMap(false)
            ToastAndroid.showWithGravity(
                "Please grant location permission to display map.",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
        }
    }

    useEffect(() => {
        if (locationGranted) {
            console.log('Reached Here')
            Geolocation.getCurrentPosition((p) => { console.log(p) }, err => { console.log(err) })
        }
        return () => {

        }
    }, [locationGranted])


    // useEffect(() => {


    //     if (hasLocationPermission) {
    //         Geolocation.getCurrentPosition(
    //             (position) => {
    //                 console.log(position);
    //             },
    //             (error) => {
    //                 // See error code charts below.
    //                 console.log(error.code, error.message);
    //             },
    //             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    //         );
    //     }
    //     return () => {

    //     }
    // }, [])

    return (
        <ScrollView contentContainerStyle={{ justifyContent: 'center' }}>
            <View>
                <Text style={{ ...headerTextStyle, fontWeight: 'bold', marginTop: 20, marginBottom: 0 }}>Location Information</Text>
            </View>

            <View>
                <Text style={{ color: '#444', marginLeft: 15, fontSize: 17 }}>Name</Text>
                <TextInput
                    style={inputStyle}
                    placeholder="Name"
                    onChangeText={(val) => {
                        setName(val)
                    }}
                    placeholderTextColor={colors.LIGHT_GRAY}
                />

                <Text style={{ color: '#444', marginLeft: 15, fontSize: 17 }}>Region</Text>
                <TextInput
                    style={inputStyle}
                    placeholder="Region"
                    onChangeText={(val) => {
                        setRegion(val)
                    }}
                    placeholderTextColor={colors.LIGHT_GRAY}
                />

                <Text style={{ color: '#444', marginLeft: 15, fontSize: 17 }}>City</Text>
                <TextInput
                    style={inputStyle}
                    placeholder="City"
                    onChangeText={(val) => {
                        setCity(val)
                    }}
                    placeholderTextColor={colors.LIGHT_GRAY}
                />

                <Text style={{ color: '#444', marginLeft: 15, fontSize: 17 }}>Woreda</Text>
                <TextInput
                    style={inputStyle}
                    placeholder="Woreda"
                    onChangeText={(val) => {
                        setWoreda(val)
                    }}
                    placeholderTextColor={colors.LIGHT_GRAY}
                />

                <Text style={{ color: '#444', marginLeft: 15, fontSize: 17 }}>House Number</Text>
                <TextInput
                    style={inputStyle}
                    placeholder="House No"
                    onChangeText={(val) => {
                        setHouseNo(val)
                    }}
                    placeholderTextColor={colors.LIGHT_GRAY}
                />

                <View style={{
                    height: 65,
                    margin: 15
                }}>

                    <Text style={{ color: '#444', fontSize: 17, marginBottom: 10 }}>Select the type of location</Text>
                    <DropDownPicker

                        placeholder=''
                        style={{
                            borderColor: colors.ORANGE,
                            color: colors.DARK_GRAY,
                            borderStyle: 'solid',
                            borderWidth: 2,
                            height: 57,
                            backgroundColor: 'transparent'
                        }}
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        labelStyle={{ fontSize: 18 }}

                    />
                </View>


            </View>
            <TouchableOpacity disabled={loading} onPress={() => {
                handleSubmitLocation()
            }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: loading ? colors.DARK_ORANGE : colors.ORANGE, height: 50, margin: 15, borderRadius: 10, marginTop: 30 }}>
                <Text style={{ color: 'white', fontSize: 30, textAlign: 'center', fontWeight: loading ? 'normal' : 'bold' }}>Save Location</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const inputStyle = StyleSheet.create({
    height: 55,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: colors.ORANGE,
    margin: 15,
    color: '#444',
    fontSize: 18,
    paddingLeft: 15,
    paddingVertical: 10,
    borderRadius: 7,
    marginTop: 8
})

export default LocationInfo