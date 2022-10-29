import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "./Api";

 
const RenderRoutinesByUser = () => {
    const { username } = useParams();
    const [creatorRoutines, setCreatorRoutines] = useState([])
    const [exerciseDisplay, setExerciseDisplay] = useState(false)
    
    useEffect( () => {
        const fetchRoutinesByUser = async () => {
            try {
                const fetchedRoutinesByUser = await callApi ({path: `/users/${username}/routines`})
                setCreatorRoutines(fetchedRoutinesByUser);
            } catch (error) {
                console.error(error)
            }
        }
        fetchRoutinesByUser()
    },[])

    const showExercises = () => {
        setExerciseDisplay( prev => !prev)
    }
    
    return(
        <div>
            <h2>{`${username}'s routines`}</h2>
        <div>
            {creatorRoutines.map( routine => {
                return(
                    <div className="routineCard">
                        <div className="routineText">
                        <h2>{routine.name}</h2>
                        <h4>{routine.goal}</h4>
                        <p className="exerciseDisplayButton" onClick={showExercises}>{exerciseDisplay ? "Collapse Exercises" : "Expand Exercises"}</p>
                        {exerciseDisplay ? ( 
                            routine.activities.map ( activity => {
                                return(
                                    <div className="activityCard">
                                        <h4>{activity.name}</h4>
                                        <p>{activity.description}</p>
                                        <span>Duration: </span>
                                        <span>Count: </span>
                                    </div>
                                )
                            })
                            
                        ) : <span></span> }
                        </div>
                    </div>
                )
            }

            )}
        </div>
        </div>
    )
}


export default RenderRoutinesByUser
