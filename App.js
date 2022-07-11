import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';

  
import Header from './components/Header';
import StartGame from './screens/StartGame';
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameOver';




export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
 
  

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    
  
  };

  const gameOverHandler = numofRounds => {
    setGuessRounds(numofRounds);
  };

  let content = <StartGame onStartGame = {startGameHandler} />

  if (userNumber&& guessRounds <=0) {
    content =
      <GameScreen
      userChoice={userNumber}
      onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    content =
      <GameOver
      roundsNumber={guessRounds}
      userNumber={userNumber}
      onRestart = {configureNewGameHandler}
    />;
  }
  
  return (
    <SafeAreaView style = { styles.screen}>
      <Header title={"Guess a Number"} />
    {content}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 2,  
  },

 
  
});
