import React, {useState, useRef, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    Dimensions,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card'
import MainButton from '../components/MainButton';
import Colors from '../constants/Colors';


const generateRandomBetween = (min, max, exclude) => { 
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (value, numofRound) => (<View
    key={value}
    style={styles.listItem}>
    <Text>
        #{numofRound}
    </Text>
    <Text>
        {value}
    </Text>
</View>
);


const GameScreen = (props) => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess );
    const [pastGuesses, setPastGuesses] = useState([initialGuess])
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);

    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    const currentLow = useRef(1); 
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

  
   
    useEffect(() => {
        if (currentGuess === userChoice) {
            props.onGameOver(pastGuesses.length);
        }
    
    },[currentGuess,userChoice, onGameOver]);

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie', 'This is wrong...', [{
              text: 'Sorry!', style: 'cancel'
            }])
            return;
        }
        
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess +1;
        }
        const nextNumber = generateRandomBetween(
            currentLow.current,
            currentHigh.current,
            currentGuess)
        
        setCurrentGuess(nextNumber);
        // setRounds(curRounds => curRounds + 1);
        setPastGuesses(curPastGuesses => [nextNumber,
            ...curPastGuesses])
    };

   

    if (Dimensions.get('window').height < 500) {
        return (
            <View style = {styles.screen}>
            <Text>
                Opponent's Guess
                </Text>
                <View style = {styles.controls}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                <Ionicons
                    name="md-remove"
                    size={24}
                    color="white"
                />
            </MainButton>
            <NumberContainer>
                
                {currentGuess}
                </NumberContainer>
                
              
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons
                    name="md-add"
                    size={24}
                    color="white" 
                    />
                    </MainButton>
                    </View>
            
            <View style = {styles.listContainer}>
            <ScrollView contentContainerStyle = {styles.list}>
                {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index)
                    
                     )}
                </ScrollView>
                </View>
        </View>
            
        )
    }

    return (
        <View style = {styles.screen}>
            <Text>
                Opponent's Guess
            </Text>
            <NumberContainer>
                
                {currentGuess}
            </NumberContainer>
            <Card style = {styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons
                        name="md-remove"
                        size={24}
                        color="white"
                    />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons
                    name="md-add"
                    size={24}
                    color="white" 
                    />
                </MainButton>
            </Card>
            <View style = {styles.listContainer}>
            <ScrollView contentContainerStyle = {styles.list}>
                {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index)
                    
                     )}
                </ScrollView>
                </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1, 
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10  ,
        width: 400,
        maxWidth: '100%'
    },


    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },

    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: Colors.secondary,
        flexDirection: "row",
        justifyContent: 'space-between'

    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 350 ?'90%': '80%'
    },

    listContainerBig: {
        flex: 1,
        width: '80%'
    },

    list: {
        justifyContent: 'flex-end',
        flexGrow: 1,
        
    }

});

export default GameScreen
