import { useEffect, useState } from "react";
import { fetchAPIactivities } from "./Api";

const Activities = () => {
    const [activities, setActivities] = useState([])

    useEffect( () => {
        const fetchActivities = async () => {
            try {
                const fetchedActivities = await fetchAPIactivities()
                setActivities(fetchedActivities)
            } catch (error) {
                console.error(error)
            }
        }
        fetchActivities();
    })

    return (
        <div>
            <h1>Browse all activities...</h1>
            {activities.map( activity => {
                return(
                <div>
                    <h3>{activity.name}</h3>
                    <p>{activity.description}</p>
                </div>

                )
            })}
        </div>
    )
};
export default Activities;