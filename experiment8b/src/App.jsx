
import { useState } from "react";

function App() {
  // State variable to hold count
  const [count, setCount] = useState(0);

  // Function to update count
  function increaseCount() {
    setCount(count + 1);
  }

  return (
    <div
      style={{
        fontFamily: "system-ui",
        padding: 20,
        textAlign: "center"
      }}
    >
      <h2>React Screen Update Example</h2>

      <p>You clicked the button {count} times.</p>

      <button onClick={increaseCount}>
        Click Me
      </button>
    </div>
  );
}

export default App;
