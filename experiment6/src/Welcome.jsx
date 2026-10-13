
import { useState } from "react";

function Welcome({ name }) {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "8px"
      }}
    >
      <h3>Hello, {name}!</h3>
      <p>You have greeted {count} times.</p>
      <button onClick={() => setCount(count + 1)}>
        Say Hello
      </button>
    </div>
  );
}

export default Welcome;
