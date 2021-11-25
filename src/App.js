import React, { useState, useEffect } from 'react';
import HangmanContext from './context/HangmanContext';
import axios from "axios";

import Title from './components/Title';
import Man from './components/Man';
import WrongAlphabets from './components/WrongAlphabets';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';

import { getRandomIndex, showNotification as show } from './helpers/helpers';

import './App.css';

const words = ['temporary', 'wizard', 'programmer', 'teamwork', 'python'];
const hints = [
  'something that is not permanent',
  'someone who is able to perform magic',
  'someone who writes programs',
  'working together',
  'a kind of snake'
];
let initialIndex = getRandomIndex(words.length);
let selectedWord = words[initialIndex];
let hint = hints[initialIndex];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctAlphabets, setCorrectAlphabets] = useState([]);
  const [wrongAlphabets, setWrongAlphabets] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [word, setWord] = useState("");

  useEffect(() => {
    async function getRandomWord() {
      await axios.get("https://random-word-api.herokuapp.com/word?number=1&swear=0").then((res) => {
        const randomWord = res.data[0];
        console.log(randomWord);
        setWord(randomWord);
      });
    }
    getRandomWord();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctAlphabets.includes(letter)) {
            setCorrectAlphabets(currentAlphabet => [...currentAlphabet, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongAlphabets.includes(letter)) {
            setWrongAlphabets(currentAlphabet => [...currentAlphabet, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeyPress);

    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [correctAlphabets, wrongAlphabets, playable]);

  function playAgain() {
    setPlayable(true);
    setCorrectAlphabets([]);
    setWrongAlphabets([]);

    const random = getRandomIndex(words.length);
    selectedWord = words[random];
    hint = hints[random];
  }

  return (
    <>
      <Title />
      <div className="game-container">
        <HangmanContext.Provider value={wrongAlphabets}>
          <Man />
          <WrongAlphabets />
        </HangmanContext.Provider>

        <HangmanContext.Provider value={{ selectedWord, correctAlphabets, hint }}>
          <Word />
        </HangmanContext.Provider>
        <p className="hint">HINT - {hint}</p>
      </div>
      <HangmanContext.Provider value={{ correctAlphabets, wrongAlphabets, selectedWord, setPlayable, playAgain }}>
        <Popup />
      </HangmanContext.Provider>

      <HangmanContext.Provider value={showNotification}>
        <Notification />
      </HangmanContext.Provider >
    </>
  );
}

export default App;
