import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PinInputPage from '../Screens/PinInputPage';
import HomePage from '../Screens/HomePage';
import LocationInfo from '../Screens/LocationInfo';

const Stack = createNativeStackNavigator();

export default function MainRoute() {

    const config = {
        animation: 'spring',
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
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="PinInputPage">
                <Stack.Screen name="PinInputPage" component={PinInputPage} />
                <Stack.Screen name="HomePage" component={HomePage} />
                <Stack.Screen name="LocationInfo" component={LocationInfo} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
