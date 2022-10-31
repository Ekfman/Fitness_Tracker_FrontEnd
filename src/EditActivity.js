import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callApi } from "./Api";

const EditActivity = ({token, activityToEdit}) => {
    const [name, setName] = useState(activityToEdit.name)
    const [description, setDescription] = useState(activityToEdit.description)
    const navigate = useNavigate()
    const { activityId } = useParams();
    
    const editHandler = async (e) => {
        e.preventDefault();
        try {
            await callApi({token, method: "PATCH", body: {name, description}, path: `/activities/${activityId}`})
            navigate("/activities")
            window.alert("You have succesfully updated the activity!" )
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = () => navigate("/activities")
    
    return(
    <div>   
        <br></br> 
        <form className="card" onSubmit={editHandler}>
            <div className="cardText">
            <input className="editActivityName" type="text" value={name} onChange={ (e) => setName(e.target.value)} required></input>
            <input className="editActivityDesc" type="text" value={description} onChange={ (e) => setDescription(e.target.value)} required></input>            
            </div>
            <button className="editButton" onClick={handleCancel}>Cancel</button>
            <button className="editButton">Edit Activity</button>
        </form>
    </div>
    )
}

export default EditActivity;