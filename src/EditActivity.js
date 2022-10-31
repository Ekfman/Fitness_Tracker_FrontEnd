import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callApi } from "./Api";

const EditActivity = ({token, activityToEdit, setActivities, activities}) => {
    const [name, setName] = useState(activityToEdit.name)
    const [description, setDescription] = useState(activityToEdit.description)
    const navigate = useNavigate()
    const { activityId } = useParams();
    
    const editHandler = async (e) => {
        e.preventDefault();
        try {
            await callApi({token, method: "PATCH", body: {name, description}, path: `/activities/${activityId}`})
            navigate("/activities")
        } catch (error) {
            console.log(error);
        }
    }
    
    return(
    <div>   
        <br></br> 
        <form className="card" onSubmit={editHandler}>
            <div className="cardText">
            <input className="editActivityName" type="text" value={name} onChange={ (e) => setName(e.target.value)} required></input>
            <input className="editActivityDesc" type="text" value={description} onChange={ (e) => setDescription(e.target.value)} required></input>            
            </div>
            <button className="editButton">Edit Activity</button>
        </form>
    </div>
    )
}

export default EditActivity;