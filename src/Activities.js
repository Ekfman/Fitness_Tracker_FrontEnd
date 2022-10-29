import { useEffect, useState } from "react";
import { callApi } from "./Api";

const Activities = ({activities}) => {


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