import { useEffect, useState } from "react";
import { callApi } from "./Api";
import { useNavigate } from "react-router-dom";


const Activities = ({token, setActivityToEdit}) => {
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
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

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const newActivity = await callApi({token, method: "POST", body: {name, description}, path:"/activities"})
                setActivities([newActivity, ...activities])
                navigate("/activities")
        } catch (error) {
            console.error(error)
        }
    }

    const addActivityHandler = () => {
        setActivityForm( prev => !prev)
    }
    
    return (
        <div>
            <h1 className="main">Browse all activities...</h1>
            <button onClick={addActivityHandler}>{editActivityForm ? "Cancel" : "Add Activity"}</button>
            {editActivityForm ? (
            <div className="card">
                <form className="routineCard" onSubmit={submitHandler}>
                    <div className="routineName">
                        <input className="editActivityName" type="text" placeholder="Bulgarian split squats" onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div className="routineDesc">
                        <input className="editActivityDesc" type="text" placeholder="Death..." onChange={(e) => setDescription(e.target.value)}></input>
                    </div>
                    <div className="createRoutineButton">
                    <button>Create Activity</button>
                    </div>
                </form>
            </div>
            ) : (<span></span>)}
            <div>
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
        </div>
    )
};
export default Activities;