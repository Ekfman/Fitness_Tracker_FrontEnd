import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callApi } from "./Api";


const Register = ({setToken}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState(null)
    const navigate = useNavigate();
    
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const { token } = await callApi({ method: "POST", body: {username, password}, path: "/users/register" });
          setToken(token);
          navigate("/login")
        } catch (err) {
          console.error(err);
        }
      };

    return(
        <div>
            <h1>Sign up, now!</h1>
            <form>
                <label>Username:</label>
                <br></br>
                <input type="text" onChange={ e => setUsername(e.target.value)} required ></input>
                <br></br>
                <label>Password:</label>
                <div>(Must be at least 8 characters long)</div>
                <input type="password" onChange={ e => setPassword(e.target.value)} required></input>
                <br></br>
                <button onClick={submitHandler}>Create</button>
            </form>
        </div>
    )
}

export default Register;