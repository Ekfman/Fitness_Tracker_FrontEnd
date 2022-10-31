import { useEffect, useState } from "react";
import { callApi } from "./Api";
import { useNavigate } from "react-router-dom";

const CreateActivity = ({token, activities, setActivities}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const newActivity = await callApi({token, method: "POST", name, description, path:"/activities"})
                setActivities([newActivity, ...activities])
                console.log(newActivity);
                navigate("/activities")
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <>
        <h2>You are creating an activity...</h2>
         <form className="routineCard" onSubmit={submitHandler}>
             <div className="routineName">
                <label>Name: </label>
                <input type="text" placeholder="Bulgarian split squats" onChange={(e) => setName(e.target.value)}></input>
             </div>
             <div className="routineDesc">
                 <label>Description: </label>
                <input className="routineDescInputBox" type="text" placeholder="Death" onChange={(e) => setDescription(e.target.value)}></input>
             </div>
             <div className="createRoutineButton">
                <button>Create Activity</button>
            </div>
        </form>
        </>
    )
}

export default CreateActivity;