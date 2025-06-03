import FormWords from "./components/FormWords";
import { gameLetters } from "./utils/letters";
import { gameWords } from "./utils/words";
import { useState, useEffect } from "react";

function App() {
  const [guessWords, setGuessWords] = useState([]);
  const [words, setWords] = useState([]);
  const [displayGuess, setGuess] = useState("");
  const [letters, setLetters] = useState([]);
  const [remaining, setRemaining] = useState(3);

  function random() {
    return Math.floor(Math.random() * 5);
  }

  function check(word) {
    return guessWords.includes(word);
  }

  const handleguess = () => {
    if (remaining === 0) return;

    let randInt = random();
    let word = words[randInt];

    while (check(word)) {
      randInt = random();
      word = words[randInt];
    }

    setGuess(word); // <-- show the clue word
    setRemaining((prev) => prev - 1);
  };

  useEffect(() => {
    const randInt = Math.floor(Math.random() * 5);

    const objectLetters = gameLetters[randInt].map((letter, index) => ({
      id: index,
      value: letter,
    }));
    setLetters(objectLetters);

    const upperCasedWords = gameWords[randInt].map((word) =>
      word.toUpperCase()
    );
    setWords(upperCasedWords);
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center gap-12 bg-black p-6 sm:p-8">
        {/* Title */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-blue-50 font-bold text-2xl sm:text-3xl">
            English Game Minigame
          </h1>
          <p className="text-blue-50 mt-2 text-sm sm:text-base">
            Created by Brainard Enosh
          </p>
        </div>

        {/* Main game + progress panel */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 w-full max-w-5xl">
          {/* Progress Panel (Left) */}
          <div className="flex flex-col justify-start items-center md:items-start gap-3 bg-gray-800 p-4 rounded w-full md:w-1/3">
            <p className="text-white text-sm sm:text-base">
              {guessWords.length * 5}% completed
            </p>
            <p className="text-white text-sm sm:text-base">
              Remaining clue: {remaining}/3
            </p>
            <button
              className="text-white p-2 rounded-xl bg-green-400 hover:bg-green-500 transition"
              onClick={handleguess}
            >
              🔍 Get clue
            </button>
            <div className="text-white text-lg font-semibold">
              {displayGuess}
            </div>
          </div>

          {/* Game Component (Right) */}
          <FormWords
            guessWords={guessWords}
            setGuessWords={setGuessWords}
            words={words}
            setWords={setWords}
            letters={letters}
            setLetters={setLetters}
            className="w-full md:w-2/3"
          />
        </div>

        {/* How to play section */}
        <div className="text-white text-center mt-6 sm:mt-10">
          <h2 className="text-base sm:text-lg font-semibold mb-2">
            How to play:
          </h2>
          <p className="text-sm sm:text-base">
            Select letters to form words. Hit submit when done!
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
