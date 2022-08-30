import { StyleSheet } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import colors from '../Util/colors'


export const pinInputPageStyle = StyleSheet.create({
    backgroundColor: Colors.WHITE,
    padding: 10,
    justifyContent: 'center',
})

export const headerTextStyle = StyleSheet.create({
    color: '#444',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 30,
    height: 100,
})

export const headerTextErrorStyle = StyleSheet.create({
    color: '#e57373',
    fontSize: 30,
    height: 100,
    textAlign: 'center',
    marginBottom: 30,
})

export const pinTextsStyle = StyleSheet.create({
    color: colors.ORANGE,
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold'
})

export const pinsStyleEmpty = StyleSheet.create({
    backgroundColor: colors.DARK_GRAY,
    height: 10,
    width: 10,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10
})

export const pinsStyleFilled = StyleSheet.create({
    backgroundColor: colors.ORANGE,
    height: 16,
    width: 16,
    borderRadius: 8,
    marginLeft: 10,
    marginRight: 10
})

export const pinsContainer = StyleSheet.create({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: 10
})

export const buttonsStyle = StyleSheet.create({
    height: 76,
    width: 76,
    borderRadius: 38,
    backgroundColor: colors.WHITE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10
})

export const pinButtonContainer = StyleSheet.create({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,

})

export const mainContainer = StyleSheet.create({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
})