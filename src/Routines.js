import Routine from "./Routine";
import { fetchAPIroutines } from "./Api";
import { useState, useEffect } from "react";

const Routines = () => {
    const [routines, setRoutines] = useState([])
    useEffect( () => {
        const fetchRoutines = async () => {
            try {
                const fetchedRoutines = await fetchAPIroutines()
                setRoutines(fetchedRoutines)
            } catch (error) {
                console.error(error)
            }
        }
        fetchRoutines()
      });
      return(
        <div>
            <h1>Search Routines Here!</h1>
            {routines.map( routine => {
                return(
                    <div>
                        <h2>{routine.name}</h2>
                        <h3>Goal: {routine.goal}</h3>
                        <h3>See activities</h3>
                        <p>created by: {routine.creatorName}</p>
                    </div>
                )
            }

            )}
        </div>
      )
}

export default Routines;