import axios from "axios";

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

export async function getRandomWord(setWord, setHint) {
  try {
    await axios.get("https://random-word-api.herokuapp.com/word?number=1&swear=0").then(async (res) => {
      const randomWord = res.data[0];
      await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`).then((res) => {
        setHint(res.data[0]["meanings"][0]["definitions"][0]["definition"]);
        setWord(randomWord);
      });
    });
  } catch (err) {
    setHint("Word or hint could not be fetched. Please refresh page for a different word");
  }
}
