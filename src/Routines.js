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

export default Routines;