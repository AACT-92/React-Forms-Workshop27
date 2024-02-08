import { useState } from "react";
import './SignUpForm.css'

export default function SignUpForm({ token, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (!username.includes("@")) {
      setError("not a valid email")
      return
      } 
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
        }
      );
      const result = await response.json();
      setToken(result.token)
    } 
     catch (error) {
      setError(error.mesage);
    }
  }
  return (
    <>
      <h2 className="green">Sing Up!</h2>{error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="green">Submit</button>
      </form>
    </>
  );
}
