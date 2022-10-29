import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { callApi } from "./Api";

import Register from "./Register";
import Login from "./Login"
import Profile from "./Profile";
import Activities from "./Activities";
import Routines from "./Routines";

const App = () => {
    const [loggedInUserData, setLoggedInUserData] = useState([]);
    const [routines, setRoutines] = useState([]);
    const [activities, setActivities] =useState([]);
    2

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
              console.log(routines);
          } catch (error) {
              console.error(error)
          }
      }
      fetchRoutines()
    }, []);

    useEffect( () => {
        const fetchActivities = async () => {
            try {
                const fetchedActivities = await callApi({ path: "/activities"})
                setActivities(fetchedActivities);
                console.log(activities);
            } catch (error) {
                console.error(error)
            }
        }
        fetchActivities()
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
                        <Link className="navbarLinks" to ="/createRoutine">Create Routine</Link>
                        <Link className="navbarLinks" to="/my-profile">My Routines</Link>
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
                <Route path="/routines" element={<Routines routines={routines} setRoutines={setRoutines}/>}></Route>
                <Route path="/activities" element={<Activities activities={activities} />}></Route>
                <Route path="/my-profile" element={<Profile token={token} />}></Route>
                <Route path="/activities" element={<Activities />}></Route>
            </Routes>
        </BrowserRouter>
    )
};

export default App;
