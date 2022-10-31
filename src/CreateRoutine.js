import { useEffect, useState } from "react";
import { callApi } from "./Api";
import { useNavigate } from "react-router-dom";

const CreateRoutine = ({token, setRoutines, routines}) => {
    const [routineName, setRoutineName] = useState("");
    const [routineGoal, setRoutineGoal] = useState("");
    const [isPublic, setIsPublic] = useState(false)
    const navigate = useNavigate();
    
    const handleCheckBox = () => {
        setIsPublic(prev => !prev)
        console.log(isPublic);
    }
  
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const newRoutine = await callApi({method: "POST", token, body: {name: routineName, goal: routineGoal, isPublic}, path: "/create-routine"});
            setRoutines([newRoutine, ...routines])   
            navigate("/routines")
        } catch (error) {
            console.error(error)  
        }
    }
    

    return(
        <>
        <h2>You are creating a routine...</h2>
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
        </>
    )
}

export default CreateRoutine;