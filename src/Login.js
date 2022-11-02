import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callApi } from "./Api";


const Login = ({setToken}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const token = await callApi({ method: "POST", body: {username, password}, path: "/users/login" });
          setToken(token);
          navigate("/routines")
        } catch (error) {
          console.error(error)
        }
      };

    return(
        <div>
            <h1>Log in to get your fitness on.</h1>
            <form>
                <label>Username:</label>
                <br></br>
                <input type="text" onChange={ e => setUsername(e.target.value)} required ></input>
                <br></br>
                <label>Password:</label>
                <br></br>
                <input type="password" onChange={ e => setPassword(e.target.value)} required></input>
                <br></br>
                <button onClick={submitHandler}>Get Active!</button>
            </form>
        </div>
    )
}

export default Login;