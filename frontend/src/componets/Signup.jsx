import {  useState } from "react";
//import apiClient from "../../service/apiClient.js";
import { useNavigate } from "react-router";
//import axios from "axios";
//import { body } from "express-validator";
import './Signup.css';

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("test");

 // for navigation

  const navigate = useNavigate();
  const baseurl = "http://localhost:4000/api/v1";
   const Signup2 = async ({ url, method = "POST", body }) => {
    await fetch(`${baseurl}/${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await Signup2({
        url: "users/register",
        body: { username, email, password },
      }).then((res) => console.log(res));
      // await axios.post("http://localhost:4000/api/v1/users/register",{username,email,password}).then((res)=>{
      //     console.log(res);
      // })
    } catch (error) {
    }
     finally {
      setLoading(false);
    }

    //Make an API call to backend with data
    // get response from backend
    // take action based on response
  };
  return (
    // <div className="signup-page">
      <div className="signup">
        <h1>Welcome to Signup Page</h1>
        {error && <div>Error: {error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="username"
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Signup...." : "Signup"}
          </button>
        </form>
      </div>
    // </div>
  );
}

export default Signup;
