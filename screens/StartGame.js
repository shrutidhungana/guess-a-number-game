import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/Colors';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';


const StartGame = (props) => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

   


    const numberInput = (inputText) => { 
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);

    };

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width/4)
        }
    
        Dimensions.addEventListener('change', updateLayout);

        return () => {
             Dimensions.removeEventListener('change', updateLayout)
        };
    })

    

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if(isNaN (chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert
                ('Invalid number!',
                    'Number has to be a number between 1 and 99',
                    [{
                        text: 'Okay', style: 'destructive',
                        onPress: resetInputHandler
                    }])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput =
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                    START GAME
                </MainButton>
                </Card>
    }


    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset = {30}

            >
        <TouchableWithoutFeedback onPress= {() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                
            <Text style = {styles.title}>
                Start a New Game!!
            </Text>
                <Card style={styles.inputContainer}>
                <Text>
                    Select a Number!
                </Text>
                <Input style={styles.input}
                    blurOnSubmit autoCapitalize='none'
                    autoCorrect={false} keyboardType="number-pad"
                    maxLength={2}
                    onChangeText={numberInput}
                    value = {enteredValue}
                    />
                    
                <View style={styles.buttonContainer}>
                                <View style={{ width: buttonWidth }}>
                            <Button title='Reset'
                                onPress={resetInputHandler }
                                color={Colors.secondary} /> 
                    </View>
                       <View style = {{width: buttonWidth}}>
                            <Button title='Confirm'
                                onPress={confirmInputHandler} 
                                color={Colors.primary} />
                        </View>
                            
                   </View>
               </Card>
                {confirmedOutput}
            </View>
                </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView> 
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        
    },

    title: {
        fontSize: 20,
        marginVertical: 25,
    },

    inputContainer: {
        width: '80%',
        // maxWidth: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center', 
       
    },

    buttonContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
        
    },

    // button:{
        // width: 100,
        //  width: Dimensions.get('window').width/4
    // },

    input: {
        width: 50,
        textAlign: 'center',
    },

    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
    

})

export default StartGame