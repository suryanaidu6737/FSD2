
import Welcome from "./Welcome";

function App() {
  return (
    <div style={{ fontFamily: "system-ui", padding: 20 }}>
      <h2>React Props and State Example</h2>

      <Welcome name="Alice" />
      <Welcome name="Bob" />
    </div>
  );
}

export default App;
