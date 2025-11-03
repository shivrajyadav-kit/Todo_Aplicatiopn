import { useEffect, useState } from "react";
import apiClient from "../../service/apiClient.js";
import { useNavigate } from "react-router";
import axios from "axios";
import { body } from "express-validator";
import './Login.css';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("test");

  // for navigation

  const navigate = useNavigate();
  const baseurl="http://localhost:4000/api/v1"
    const Login=async ({url,method="POST",body})=>{
        await fetch(`${baseurl}/${url}`,{
            method:method,
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        })
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    

    

    try {
        await Login({url:"users/login",body:{email,password}}).then((res)=>console.log(res))
        // await axios.post("http://localhost:4000/api/v1/users/register",{username,email,password}).then((res)=>{
        //     console.log(res)
        // })
        
      
      
    } catch (error) {

    } finally {
      setLoading(false);
    }

    //Make an API call to backend with data
    // get response from backend
    // take action based on response
  };
  return (
    // <div className = "login-page">
    <div className="login">
      <h1 >Welcome to Login  Page</h1>
      {error && <div>Error: {error}</div>}
      <form onSubmit={handleSubmit}>
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
          {loading ? "Login...." : "Login"}
        </button>
      </form>
    </div>
    // </div>

  );
}

export default Login;
