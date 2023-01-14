import "./App.css";
import { useState } from "react";

export function replaceCamelWithSpaces(colorName) {
  // we need to export the function that we want to test
  return colorName.replace(/\B([A-Z])\B/g, " $1");
  // some ninja magic regex that does what's described in test
}

function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const newButtonColor = buttonColor === "red" ? "blue" : "red";
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="App">
      <button
        style={{ backgroundColor: disabled ? "gray" : buttonColor }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={disabled}
      >
        Change to {newButtonColor}
      </button>
      <br />
      <input
        id="disable-button-checkbox"
        type="checkbox"
        onClick={(e) => setDisabled(e.target.checked)}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
