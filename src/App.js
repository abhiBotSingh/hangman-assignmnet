import React, { useState, useEffect } from 'react';
import HangmanContext from './context/HangmanContext';

import Title from './components/Title';
import Man from './components/Man';
import WrongAlphabets from './components/WrongAlphabets';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';

import { getRandomWord, showNotification as show } from './helpers/helpers';

import './App.css';

function App() {

  const [playable, setPlayable] = useState(true);
  const [correctAlphabets, setCorrectAlphabets] = useState([]);
  const [wrongAlphabets, setWrongAlphabets] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");

  useEffect(() => {
    getRandomWord(setSelectedWord);
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
    getRandomWord(setSelectedWord);
  }

  return (
    <>
      <Title />
      <div className="game-container">
        <HangmanContext.Provider value={wrongAlphabets}>
          <Man />
          <WrongAlphabets />
        </HangmanContext.Provider>

        <HangmanContext.Provider value={{ selectedWord, correctAlphabets }}>
          <Word />
        </HangmanContext.Provider>
        {/* <p className="hint">HINT - {hint}</p> */}
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
