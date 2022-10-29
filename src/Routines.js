import { useState } from "react"
import { callApi } from "./Api"
import { Link } from "react-router-dom"

const Routines = ({routines}) => {
    const [exerciseDisplay, setExerciseDisplay] = useState(false)
    const showExercises = () => {
        setExerciseDisplay( prev => !prev)
    }
      return(
        <div className="main">
            <h1>Explore Routines</h1>
            <div>
            {routines.map( routine => {
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
                        <Link to={`/users/${routine.creatorName}/routines`}>created by: {routine.creatorName}</Link>
                        </div>
                    </div>
                )
            }

            )}
        </div>
        </div>
      )
}

export default Routines;