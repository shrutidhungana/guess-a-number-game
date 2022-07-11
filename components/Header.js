import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform
} from 'react-native';
import Colors from '../constants/Colors';


const Header = (props) => {
  return (
      <View style={{
          ...styles.headerBase,
          ...Platform.select({ ios: styles.headerIOS, android: styles.headerAndroid })
      }}>
          <Text style = {styles.headerTitle}>
              {props.title}
          </Text>
      </View>
  )
}

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 80,
        paddingTop: 30,
       
        alignItems: 'center',
        justifyContent: 'center',
        
        
    },

    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor:  '#ccc',
        color:  'white',

    },

    headerAndroid: {
        backgroundColor: Colors.primary ,
        borderBottomColor:  'transparent',
        color:  'black',


    },


    headerTitle: {
        
        fontSize: 20,
    }
});



export default Header;