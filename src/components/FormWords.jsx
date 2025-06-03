import React, { useEffect, useState } from "react";

export default function FormWords({
  guessWords,
  setGuessWords,
  words,
  setWords,
  letters,
  setLetters,
  className = "",
}) {
  const [selectedLetter, setSelected] = useState("");

  const handleSubmit = () => {
    if (words.includes(selectedLetter)) {
      setGuessWords((prev) => [...prev, selectedLetter]);
      setSelected(""); // clear after correct
    }
  };

  const handleSelect = (value) => {
    setSelected((prev) => prev + value);
  };

  const handleBackspace = () => {
    setSelected((prev) => prev.slice(0, -1));
  };

  return (
    <div
      className={`flex flex-col md:flex-row gap-6 md:gap-9 w-full ${className}`}
    >
      {/* Guessed words display */}
      <div className="w-full md:w-1/3">
        <div className="flex flex-col items-center gap-2">
          <label className="text-lg font-medium text-white">
            Guessed words:
          </label>
          <div className="rounded px-3 py-1 text-black font-semibold bg-white h-96 overflow-y-auto w-full">
            <ul className="list-disc pl-4">
              {guessWords.map((word, idx) => (
                <li key={idx}>{word}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Game area */}
      <div className="w-full md:w-2/3 flex flex-col items-center justify-center gap-6 text-white">
        {/* Input */}
        <div className="flex flex-col items-center gap-2">
          <label className="text-lg font-medium">Forming word:</label>
          <input
            type="text"
            value={selectedLetter}
            className="rounded px-3 py-1 text-black font-semibold bg-white h-14 w-48"
          />
        </div>

        {/* Letter buttons */}
        <div className="grid grid-cols-3 gap-6">
          {letters.map((letterObj) => (
            <button
              key={letterObj.id}
              onClick={() => handleSelect(letterObj.value)}
              className="w-16 h-16 rounded-full bg-blue-400 text-white text-xl font-bold border-2 border-white"
            >
              {letterObj.value}
            </button>
          ))}
          {/* Backspace */}
          <button
            onClick={handleBackspace}
            className="col-span-3 w-full py-2 mt-2 bg-red-500 text-white font-bold rounded"
          >
            ⌫ Backspace
          </button>
        </div>

        {/* Submit */}
        <button
          className="mt-4 bg-white text-blue-700 px-4 py-2 rounded font-bold shadow"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
