import React, { useContext, useEffect } from 'react';
import HangmanContext from '../context/HangmanContext';
import { checkWinner } from '../helpers/helpers';

const Popup = () => {
  const {correctAlphabets, wrongAlphabets, selectedWord, setPlayable, playAgain} = useContext(HangmanContext);

  let finalMessage = '';
  let finalMessageRevealWord = '';
  let playable = true;

  if( checkWinner(correctAlphabets, wrongAlphabets, selectedWord) === 'win' ) {
    finalMessage = 'You won! Congratulations!';
    playable = false;
  } else if( checkWinner(correctAlphabets, wrongAlphabets, selectedWord) === 'lose' ) {
    finalMessage = 'You lost!';
    finalMessageRevealWord = `...the word was: ${selectedWord}`;
    playable = false;
  }

  useEffect(() => {
    setPlayable(playable);
  });

  return (
    <div className="popup-container" style={finalMessage !== '' ? {display:'flex'} : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  )
}

export default Popup;
