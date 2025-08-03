import React, { useState, useEffect } from "react";
import "./App.css";
import { FaCopy, FaSun, FaMoon } from "react-icons/fa";

const App = () => {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  const generatePassword = () => {
    let charset = "";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

    if (includeUppercase) charset += uppercase;
    if (includeLowercase) charset += lowercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (charset === "") {
      alert("Please select at least one character type!");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <div className="header">
        <h1>Password Generator 🔐</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <div className="output-box">
        <input type="text" value={password} readOnly />
        <button onClick={copyToClipboard} title="Copy Password">
          <FaCopy />
        </button>
        {copied && <span className="copy-tooltip">Copied!</span>}
      </div>

      <div className="controls">
        <label>
          Length: {length}
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
          Include Uppercase Letters
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
          Include Lowercase Letters
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          Include Numbers
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          Include Symbols
        </label>

        <button className="generate-btn" onClick={generatePassword}>
          🔄 Generate Password
        </button>
      </div>
    </div>  
  );
};

export default App;
