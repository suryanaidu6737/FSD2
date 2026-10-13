
import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    subscribe: false
  });

  // Handle input changes
  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    alert(
      `Form submitted!\n\nName: ${formData.name}\nAge: ${formData.age}\nGender: ${formData.gender}\nSubscribed: ${
        formData.subscribe ? "Yes" : "No"
      }`
    );
  }

  return (
    <div style={{ fontFamily: "system-ui", padding: 20 }}>
      <h2>React Form Example</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Age: </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Gender: </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">--Select--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>
            <input
              type="checkbox"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
            />
            Subscribe to newsletter
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>

      <hr />

      <h3>Entered Data:</h3>
      <p><strong>Name:</strong> {formData.name}</p>
      <p><strong>Age:</strong> {formData.age}</p>
      <p><strong>Gender:</strong> {formData.gender}</p>
      <p>
        <strong>Subscribed:</strong>{" "}
        {formData.subscribe ? "Yes" : "No"}
      </p>
    </div>
  );
}

export default App;
