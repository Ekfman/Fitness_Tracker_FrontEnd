import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { callApi } from "./Api";

import Register from "./Register";
import Login from "./Login"
import Profile from "./Profile";
import Activities from "./Activities";
import Routines from "./Routines";
import RoutinesByUser from "./RoutinesByUser";
import RoutinesByActivityId from "./RoutinesByActivityId";
import EditActivity from "./EditActivity";

const App = () => {
    //const [loggedInUserData, setLoggedInUserData] = useState([]);
    const [routines, setRoutines] = useState([]);
    const [activityToEdit, setActivityToEdit] = useState("")


    const [token, setToken] = useState(
        window.localStorage.getItem("token") || ""
      );
      useEffect(() => {
        window.localStorage.setItem("token", token);
      }, [token]);


  useEffect( () => {
      const fetchRoutines = async () => {
          try {
              const fetchedRoutines = await callApi({ path: "/routines"})
              setRoutines(fetchedRoutines);
          } catch (error) {
              console.error(error)
          }
      }
      fetchRoutines()
    }, []);
    
      

    const logoutHandler = () => {
        setToken("");
        setUsername("");
        setPassword("");
    };

    return(
        <BrowserRouter>
            <nav className="navbar">
                <h1>FitnessFriendzy.</h1>
                {token ? (
                    <div>
                        <Link className="navbarLinks" to="/routines">Home</Link>
                        <Link className="navbarLinks" to="/activities">Activities</Link>
                        <Link className="navbarLinks" to="my-routines">My Routines</Link>
                        <Link className="navbarLinks" to="/logout" onClick={logoutHandler}>Logout</Link>
                    </div>
                ) : (
                    <div className="navbarLinks">
                        <Link className="navbarLinks" to="/routines">Routines</Link>
                        <Link className="navbarLinks" to="/login">Login</Link>
                        <Link className="navbarLinks" to="/register">Register</Link>
                    </div>
                )
                
                }
            </nav>
            <Routes>
                <Route path="/register" element={<Register setToken={setToken}/>}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/routines" element={<Routines routines={routines} setRoutines={setRoutines} token={token}/>}></Route>
                <Route path="/activities" element={<Activities setActivityToEdit={setActivityToEdit} token={token}/>}></Route>
                <Route path="/my-routines" element={<Profile token={token} />}></Route>
                <Route path="/users/:username/routines" element={<RoutinesByUser/>}></Route>
                <Route path="/activities/:activityId/routines" element={<RoutinesByActivityId/>}></Route>
                <Route path="/activities/:activityId" element={<EditActivity token={token} activityToEdit={activityToEdit}/>}></Route>
            </Routes>
        </BrowserRouter>
    )
};

export default App;
