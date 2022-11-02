import { useEffect, useState } from "react";
import { callApi } from "./Api";
import { useNavigate } from "react-router-dom";


const Activities = ({token, setActivityToEdit}) => {
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [createActivityForm, setCreateActivityForm] = useState(false);
    

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

    const createActivityHandler = () => {
        setCreateActivityForm((prev) => !prev);
      };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const newActivity = await callApi({token, method: "POST", body: {name, description}, path:"/activities"})
                setActivities([newActivity, ...activities])
                setCreateActivityForm(false)
                navigate("/activities")
        } catch (error) {
            console.error(error)
        }
    }

    
    return (
        <div>
            <h1 className="main">Browse all activities...</h1>
            <button onClick={createActivityHandler}>{createActivityForm ? "X" : "Add Activity"}</button>
            <div>
            {createActivityForm ? (
            <div className="card">
                <form className="routineCard" onSubmit={submitHandler}>
                    <div className="routineName">
                        <input className="editActivityName" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div className="routineDesc">
                        <input className="editActivityDesc" type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)}></input>
                    </div>
                    <div className="createRoutineButton">
                    <button>Create Activity</button>
                    </div>
                </form>
            </div>
            ) : (<span></span>)}
            </div>
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