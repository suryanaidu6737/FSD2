
function App() {
  // Example list of items
  const fruits = ["Apple", "Banana", "Cherry", "Mango"];

  return (
    <div style={{ fontFamily: "system-ui", padding: 20 }}>
      <h2>React List Rendering Example</h2>

      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
