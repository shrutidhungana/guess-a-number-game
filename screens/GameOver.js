import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    Dimensions,
    ScrollView,
     SafeAreaView
} from 'react-native';
import Colors from '../constants/Colors';
import MainButton from '../components/MainButton';

const GameOver = (props) => {
    return (
        
      <ScrollView>
      <View style = {styles.screen}>
          <Text>
              The Game is Over
          </Text>
          <View style = {styles.imageContainer}>
          <Image source={require('../assets/icon.png')} style={styles.image}
          resizeMode = 'cover'
              />
          </View>
          <View style={styles.resultContainer} >
              <Text style = {styles.resultText}>
              Your phone needed: {''}
              <Text style = {styles.highlight}>
                  {props.roundsNumber}
              </Text>
              rounds to guess the number:{''}
              <Text style = {styles.highlight}>
                  {props.userNumber}
              </Text>
              </Text>
              </View>
          
          <MainButton onPress={props.onRestart}>NEW GAME
          </MainButton>
            </View>
            </ScrollView>
            
  )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: Dimensions.get('window').height<400 ? 30: 50,
        paddingVertical: 10, 
    },

    imageContainer: {
        width: Dimensions.get('window').width*0.7,
        height: Dimensions.get('window').width*0.7,
        borderRadius: Dimensions.get('window').width*0.7/2,
        borderWidth: 10,
        borderColor: 'black',
        overFlow: 'hidden',
        marginVertical: Dimensions.get('window').height /30,
    },

    image: {
        width: '100%',
        height: '100%',
    
    },
    highlight: {
        color: Colors.primary,
    },

    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height /60,
    },

    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height <400 ? 16 : 20,
    },
})

export default GameOver