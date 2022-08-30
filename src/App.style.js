import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  appWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
    padding: 16
  },

  appSeparator: {
    width: "80%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#CCC',
    marginVertical: 30
  },

  appWelcomeText: {
    color: "#F8812A",
    fontSize: 30,
    fontWeight: 'bold'
  },

  appQuickStartHeaders: {
    fontSize: 16,
    color: "#FFFFFF",
    alignSelf: 'flex-start',
    fontWeight: 'bold'
  },

  appQuickStartDesc: {
    color: "#FFFFFF",
    alignSelf: 'flex-start',
    marginVertical: 10,
    paddingHorizontal: 20,
    fontStyle: 'italic'
  }

})
