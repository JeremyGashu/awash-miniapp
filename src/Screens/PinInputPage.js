import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

// import { } from 'react-native-ge'
import { buttonsStyle, headerTextErrorStyle, headerTextStyle, pinButtonContainer, pinsContainer, pinsStyleEmpty, pinsStyleFilled, pinTextsStyle } from '../Styles/PinInputPage'
import colors from '../Util/colors';

const PinInputPage = ({ navigation }) => {

    const [text, setText] = useState('')
    const [error, setError] = useState(false)

    const appendText = (val) => {
        setError(false)
        if (text.length < 4) {
            setText(text + val)
        }
    }

    const clearText = () => {
        setText('')
    }

    const deleteText = () => {
        if (text.length > 0) {
            setText(text.slice(0, -1))
        }
    }

    useEffect(() => {
        if (text.length == 4) {
            if (text === '1122') {
                navigation.navigate('HomePage')
            } else {
                setText('')
                setError(true)
            }
        }
    }, [text])

    const PinButton = ({ onPress, text, hasIcon = false, icon }) => {
        return (
            <View>
                <TouchableOpacity
                    style={{ ...buttonsStyle, backgroundColor: hasIcon ? colors.GHOST_WHITE : buttonsStyle.backgroundColor }}
                    onPressIn={onPress}
                >
                    {
                        !hasIcon && <Text style={pinTextsStyle}>{text}</Text>
                    }

                    {
                        hasIcon && icon
                    }
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={{ justifyContent: 'space-evenly', height: '100%', backgroundColor: '#e3f2fd' }} >
            <View>
                {
                    !error && <Text style={headerTextStyle}>Enter PIN Code</Text>
                }

                {
                    error && (text === '') && <Text style={headerTextErrorStyle}>Incorrect PIN Code</Text>
                }
                <View style={pinsContainer}>
                    <View style={text.length >= 1 ? pinsStyleFilled : pinsStyleEmpty} ></View>
                    <View style={text.length >= 2 ? pinsStyleFilled : pinsStyleEmpty} ></View>
                    <View style={text.length >= 3 ? pinsStyleFilled : pinsStyleEmpty} ></View>
                    <View style={text.length >= 4 ? pinsStyleFilled : pinsStyleEmpty} ></View>
                </View>
            </View>

            <View>
                <View style={pinButtonContainer}>
                    <PinButton onPress={() => {
                        appendText('1')
                    }} text='1' />

                    <PinButton onPress={() => {
                        appendText('2')
                    }} text='2' />

                    <PinButton onPress={() => {
                        appendText('3')
                    }} text='3' />

                </View>

                <View style={pinButtonContainer}>
                    <PinButton onPress={() => {
                        appendText('4')
                    }} text='4' />

                    <PinButton onPress={() => {
                        appendText('5')
                    }} text='5' />

                    <PinButton onPress={() => {
                        appendText('6')
                    }} text='6' />

                </View>

                <View style={pinButtonContainer}>
                    <PinButton onPress={() => {
                        appendText('7')
                    }} text='7' />

                    <PinButton onPress={() => {
                        appendText('8')
                    }} text='8' />

                    <PinButton onPress={() => {
                        appendText('9')
                    }} text='9' />

                </View>

                <View style={pinButtonContainer}>
                    <PinButton onPress={() => {
                        clearText()
                    }} hasIcon={true} icon={<Text>
                        <Icon name="trash-o" size={30} color="#e57373" />
                    </Text>} text='X' />

                    <PinButton onPress={() => {
                        appendText('0')
                    }} text='0' />

                    <PinButton onPress={() => {
                        deleteText()
                    }} hasIcon={true} icon={<Text>
                        <Icon name="caret-square-o-left" size={30} color="#e57373" />
                    </Text>} text='X' />

                </View>
            </View>







        </ScrollView>
    )
}


export default PinInputPage