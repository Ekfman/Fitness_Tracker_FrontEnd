import { useEffect, useState } from "react";
import { callApi } from "./Api";


const Profile = ({token}) => {
    const [myRoutines, setMyRoutines] = useState([]);
    const [formDisplay, setFormDisplay] = useState(false);
    const userData = {}
    
    const buttonHandler = () => {
        setFormDisplay( prevState => !prevState )
    }

    useEffect( () => {
        const fetchLoggedInUserData = async () => {
            try {
            const userData = await callApi({token, path: "/users/me"})
            return userData;
        } catch (error){
            console.error(error)
        }
        }
        if(token) {
            console.log(token);
            fetchLoggedInUserData();
        }
    }, [token])
    
    const username = userData.username

    useEffect( () => {
        const fetchMyRoutines = async () => {
            try {
                const fetchedRoutines = await callApi({path: `/users/${username}/routines`})
                setMyRoutines(fetchedRoutines);
            } catch (error) {
                console.error(error)
            }
        }
        fetchMyRoutines();
    }, [])

    return(
    <div className="main">
        <h1>My Routines</h1>
        <div className="profileSubHead">
            <button onClick={buttonHandler}>{ formDisplay ? "Undo" : "Create New Routine"}</button>
            <span>Sort by: Routine | Activity</span>
        </div>
        <div>
           { formDisplay ? (
            <div className="routineCard">
                <label>Title: </label>
                <input type="text" placeholder="Quad Day"></input>
                <br></br>
                <label>Description: </label>
                <input type="text"></input>
                <br></br>
                <label>Activities:</label>
                <br></br>
                <button>Create Routine</button>
            </div>
           ) : <span></span>}
        </div>
        <div>
        {myRoutines.map( routine => {
                return(
                    <div className="routineCard">
                        <div className="routineText">
                        <h2>{routine.name}</h2>
                        <h3>Goal: {routine.goal}</h3>
                        <h3>See activities</h3>
                        <p>created by: {routine.creatorName}</p>
                        </div>
                    </div>
                )
            }

            )}
        </div>
    </div>
 )
}

export default Profile;