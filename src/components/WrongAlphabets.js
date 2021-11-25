import React, {useContext} from 'react';
import HangmanContext from '../context/HangmanContext';

const WrongAlphabets = () => {

  const wrongAlphabets = useContext(HangmanContext);

  return (
    <div className="wrong-alphabets-container">
      <div>
        {wrongAlphabets.length > 0 &&
          <p>Wrong</p>
        }
        {wrongAlphabets
          .map((alphabet, i) => <span key={i}>{alphabet}</span>)
          .reduce((prev, curr) => prev === null ? [curr] : [prev, ', ', curr], null)}
      </div>
    </div>
  )
}

export default WrongAlphabets;
