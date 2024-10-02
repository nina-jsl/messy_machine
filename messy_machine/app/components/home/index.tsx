"use client";
import React, { useState, useEffect } from "react";

interface RandomOutput {
  text: string;
  position: { top: string; left: string };
}

const Home: React.FC = () => {
  const [randomOutputs, setRandomOutputs] = useState<RandomOutput[]>([]);
  const [keyPressed, setKeyPressed] = useState(false);

  const randomLetters = "abcdefghijklmnopqrstuvwxyz".split("");
  const randomPhrases = [
    "Hello World!",
    "You pressed a key!",
    "Random output!",
    "Why so serious?",
    "Expect the unexpected!",
    "Let's build something!",
    "Useless GUI, wasted clicks.",
    "Computers speak in code.",
    "Dialogues drive interaction.",
    "Useful, but not intuitive.",
    "A broken button, a broken flow.",
    "Silent systems are useless.",
    "Efficient UI, happy users.",
    "Code speaks, humans listen.",
    "Useful data, useless display.",
    "Dialogs pop up unexpectedly.",
    "Computers never forget.",
    "Glitch in the matrix.",
    "UI guides, code executes.",
    "Too many clicks, less value.",
    "Simple UI, powerful backend.",
  ];

  const getRandomPosition = () => {
    const top = Math.floor(Math.random() * 100) + "%";
    const left = Math.floor(Math.random() * 100) + "%";
    return { top, left };
  };

  const getRandomItem = (arr: string[]) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  const handleKeyPress = () => {
    setKeyPressed(true);
    const newOutput: RandomOutput = {
      text:
        Math.random() < 0.5
          ? getRandomItem(randomLetters)
          : getRandomItem(randomPhrases),
      position: getRandomPosition(),
    };
    setRandomOutputs((prevOutputs) => [...prevOutputs, newOutput]);
  };

  const handleEscPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setRandomOutputs([]);
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleEscPress(e);
      } else {
        handleKeyPress();
      }
    };

    window.addEventListener("keydown", onKeyPress);

    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, []);

  return (
    <div id="input-section" className="bg-black w-full h-full relative">
      {!keyPressed && (
        <div
          id="text-container"
          className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <h1 className="text-white font-mono text-xl mb-4">
            Press Any Key to Start Texting!
          </h1>
          <p className="text-white/60 font-mono text-sm">
            Press &apos;esc&apos; to exit the program
          </p>
        </div>
      )}

      {randomOutputs.map((output, index) => (
        <div
          key={index}
          className="text-white text-base font-mono absolute"
          style={{ top: output.position.top, left: output.position.left }}
        >
          {output.text}
        </div>
      ))}
    </div>
  );
};

export default Home;
