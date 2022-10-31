import { useEffect, useState } from "react";
import { callApi } from "./Api";
import { useNavigate } from "react-router-dom";


const Profile = ({token}) => {

    const navigate = useNavigate();
    const [myRoutines, setMyRoutines] = useState([]);
    const [myData, setMyData] = useState({});
    
    
    useEffect( () => {
        const fetchLoggedInUserData = async () => {
            try {
            const userData = await callApi({token, path: "/users/me"})
            setMyData(userData);
        } catch (error){
            console.error(error)
        }
        }
            fetchLoggedInUserData();
    }, [])

    
    useEffect( () => {
        const fetchMyRoutines = async () => {
            try {
                const fetchedRoutines = await callApi({token, path: `/users/${myData.username}/routines`})
                setMyRoutines(fetchedRoutines);
            } catch (error) {
                console.error(error)
            }
        }
        fetchMyRoutines();
    }, [myData])

    const addRoutineButton = () => {
        navigate("/routines")
    }

    const deleteHandler = async () => {
        console.log("clicked");    
        try {
                const deletedRoutine = await callApi({token, path: `/routines/${routine.id}`})
                setMyRoutines(deletedRoutine);
            } catch (error) {
                console.error
            }
        }

    return(
    <div className="main">
        <h1>My Routines</h1>
        <div className="profileSubHead">
            <button onClick={addRoutineButton}>Add Routine</button>
        </div>
        <div>
        {myRoutines.map( routine => {
                return(
                    <div className="routineCard">
                        <div className="routineText">
                        <h2>{routine.name}</h2>
                        <h3>Goal: {routine.goal}</h3>
                        <h3>See activities</h3>
                        <button>Add Activity</button>
                        <p>created by: {routine.creatorName}</p>
                        <button>Edit</button>
                        <button onClick={deleteHandler}>Delete</button>
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