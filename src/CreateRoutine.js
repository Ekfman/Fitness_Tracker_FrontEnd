import { useEffect, useState } from "react";

const CreateRoutine = () => {
    const [routineName, setRoutineName] = useState("");
    const [routineDescription, setRoutineDescription] = useState("");

    useEffect()

    return(
        <div>
            <label>Title</label>
            <input type="text"></input>
        </div>
    )
}

export default CreateRoutine;