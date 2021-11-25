import axios from "axios";

export function getRandomIndex(arrayLength) {
  return Math.floor(Math.random() * arrayLength)
}

export function showNotification(setter) {
  setter(true);
  setTimeout(() => {
    setter(false);
  }, 2000);
}

export function checkWinner(correct, wrong, word) {
  let status = 'win';

  // Check for winner
  word.split('').forEach(letter => {
    if (!correct.includes(letter)) {
      status = '';
    }
  });

  // Check for loser
  if (wrong.length === 6) status = 'lose';

  return status
}

export async function getRandomWord(setWord, isGamePlayable) {

  await axios.get("https://random-word-api.herokuapp.com/word?number=1&swear=0").then((res) => {
    const randomWord = res.data[0];
    console.log(randomWord);
    setWord(randomWord);
  });

}
