import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Register from "./Register";
import Activities from "./Activities";
import Routines from "./Routines";

const App = () => {
    const [loggedInUserData, setLoggedInUserData] = useState([]);

    const [token, setToken] = useState(
        window.localStorage.getItem("token") || ""
      );
      useEffect(() => {
        window.localStorage.setItem("token", token);
      }, [token]);

    

    return(
        <BrowserRouter>
            <nav>
                {token ? (
                    <div>
                        <Link to="/routines">Routines</Link>
                        <Link to="/profile">My Routines</Link>
                        <Link to="/logout">Logout</Link>
                    </div>
                ) : (
                    <div>
                        <Link to="/routines">Routines</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )
                
                }
            </nav>
            <Routes>
                <Route path="/register" element={<Register setToken={setToken}/>}></Route>
                <Route path="/routines" element={<Routines />}></Route>
                <Route path="/activities" element={<Activities />}></Route>
            </Routes>
        </BrowserRouter>
    )
};

export default App;
