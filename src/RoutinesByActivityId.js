import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "./Api";

const RoutinesByActivityId = () => {
    const { activityId } = useParams();
    const [exerciseDisplay, setExerciseDisplay] = useState(false)
    const [routines, setRoutines] = useState([])
    
    const showExercises = () => {
        setExerciseDisplay( prev => !prev)
    }
    
    useEffect( () => {
        const fetchRoutines = async () => {
            try {
                const fetchedRoutines = await callApi({path:`/activities/${activityId}/routines`})
                setRoutines(fetchedRoutines);
                console.log(fetchedRoutines);
            } catch (error) {
                console.error(error)
            }
        }
        fetchRoutines();
    },[])
    // const routinesByActivityId = () => {

    //     const getRoutines = routines.map(routine => {
    //         return(
    //             routine.activities.map(activity => {
    //                 if(activity.id === activityId){
    //                     activityName = activity.name
    //                     return routine
    //                 }
    //             })
    //         )
    //     })
    //     return getRoutines;
    // }
    // const callRoutines = routinesByActivityId();
    // console.log(callRoutines);
    
    return(
        <div>
            <h2>Hi</h2>
            <div>
            {routines.map( routine => {
                return(
                    <div className="card">
                        <div className="cardText">
                        <h2>{routine.name}</h2>
                        <h4>{routine.goal}</h4>
                        <p className="exerciseDisplayButton" onClick={showExercises}>{exerciseDisplay ? "Collapse Exercises" : "Expand Exercises"}</p>
                        {exerciseDisplay ? ( 
                            routine.activities.map ( activity => {
                                return(
                                    <div className="activityCard">
                                        <h4><Link to={`/activities/${activity.id}/routines`}>{activity.name}</Link></h4>
                                        <p>{activity.description}</p>
                                        <span>Duration: </span>
                                        <span>Count: </span>
                                    </div>
                                )
                            })
                            
                        ) : <span></span> }
                        <span>created by: </span><Link to={`/users/${routine.creatorName}/routines`}>{routine.creatorName}</Link>
                        </div>
                    </div>
                )
            }

            )}
        </div>
        </div>

    )
}

export default RoutinesByActivityId;