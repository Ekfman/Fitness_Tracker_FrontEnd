import { useState } from "react"
import { callApi } from "./Api"
import { useNavigate } from "react-router-dom"

const Routines = ({routines}) => {
    const navigate = useNavigate();
    
    const getRoutinesByUser = () => {
        navigate(`/users/${username}/routines`)
   }
      return(
        <div className="main">
            <h1>Explore Routines</h1>
            {routines.map( routine => {
                return(
                    <div className="routineCard">
                        <div className="routineText">
                        <h2>{routine.name}</h2>
                        <h4>{routine.goal}</h4>
                        <h3>Excercises:</h3>
                        {routine.activities.map ( activity => {
                            return(
                                <div>
                                    <h4>{activity.name}</h4>
                                    <p>{activity.description}</p>
                                    <span>Duration: </span>
                                    <span>Count: </span>
                                </div>
                            )
                        })}
                        <p onClick={getRoutinesByUser}>created by: {routine.creatorName}</p>
                        </div>
                    </div>
                )
            }

            )}
        </div>
      )
}

export default Routines;