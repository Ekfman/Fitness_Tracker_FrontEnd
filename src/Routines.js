import { useState } from "react"
import { callApi } from "./Api"
import { Link } from "react-router-dom"

const Routines = ({token, setRoutines, routines}) => {
    const [routineName, setRoutineName] = useState("");
    const [routineGoal, setRoutineGoal] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [createRoutineForm, setCreateRoutineForm] = useState(false)
    const [exerciseDisplay, setExerciseDisplay] = useState(false);
    const showExercises = () => {
        setExerciseDisplay( prev => !prev)
    }

    const createRoutineHandler = () => {
        setCreateRoutineForm(prev => !prev)
    }

    const handleCheckBox = () => {
        setIsPublic(prev => !prev)
        console.log(isPublic);
    }
  
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const newRoutine = await callApi({method: "POST", token, body: {name: routineName, goal: routineGoal, isPublic}, path: "/routines"});
            setRoutines([newRoutine, ...routines])   
            navigate("/routines")
        } catch (error) {
            console.error(error)  
        }
    }
      return(
        <div className="main">
            <h1>Explore Routines</h1>
            <button onClick={createRoutineHandler}>{createRoutineForm ? "Cancel" : "Create Routine"}</button>
            <br></br>
                {createRoutineForm ? (
                    <div className="card">
                     <form className="routineCard" onSubmit={submitHandler}>
                     <div className="routineName">
                        <label>Name: </label>
                        <input type="text" placeholder="Quad Day" onChange={(e) => setRoutineName(e.target.value)}></input>
                     </div>
                     <div className="routineDesc">
                         <label>Goal: </label>
                        <input className="routineDescInputBox" type="text" placeholder="Grow quads" onChange={(e) => setRoutineGoal(e.target.value)}></input>
                     </div>
                     <div className="publicButton">
                        <label>Public</label>
                        <input type="checkbox" onChange={handleCheckBox}></input>
                     </div>
                     <div className="addActButtonDiv">
                         <button className="addActbutton">Add Activities</button>
                         <button>Create Activity</button>
                     </div>
                     <div className="createRoutineButton">
                        <button>Create Routine</button>
                    </div>
                </form>
            </div>
                ) : (<span></span>)}
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