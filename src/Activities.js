import { useEffect, useState } from "react";
import { callApi } from "./Api";
import { useNavigate } from "react-router-dom";


const Activities = ({activityToEdit, setActivityToEdit}) => {
    const navigate = useNavigate();
    const[activities, setActivities] = useState([]);
    const [editActivityForm, setActivityForm] = useState(false)
    

    useEffect( () => {
        const fetchActivities = async () => {
            try {
                const fetchedActivities = await callApi({ path: "/activities"})
                setActivities(fetchedActivities);
            } catch (error) {
                console.error(error)
            }
        }
        fetchActivities()
    }, []);

    const addActivityHandler = () => {
        setActivityForm( prev => !prev)

    }

    
    return (
        <div>
            <h1 className="main">Browse all activities...</h1>
            <button onClick={addActivityHandler}>{editActivityForm ? "Cancel" : "Add Activity"}</button>
            {activities.map( activity => {
                return(
                    <div className="card">
                    <div className="cardText">
                        <h3>{activity.name}</h3>
                        <p>{activity.description}</p>
                        
                    </div>
                    <button onClick={ () => {
                        setActivityToEdit(activity)
                        navigate(`/activities/${activity.id}`)
                        } } className="editButton">Edit</button>
                </div>

                )
            })}
        </div>
    )
};
export default Activities;