import React, { useContext } from 'react';
import HangmanContext from '../context/HangmanContext';

const Word = () => {
  const { selectedWord, correctAlphabets } = useContext(HangmanContext);

  return (
    <div className="word">
      {selectedWord.split('').map((alphabet, i) => {
        return (
          <span className="letter" key={i}>
            {correctAlphabets.includes(alphabet) ? alphabet : ''}
          </span>
        )
      })}
    </div>
  )
}

export default Word;
