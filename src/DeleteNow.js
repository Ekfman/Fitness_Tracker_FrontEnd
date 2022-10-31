const DeleteNow = () => {

    return(
        <div className="card">
        <form className="routineCard">
            <div className="routineName">
                <input className="editActivityName" type="text" placeholder="Bulgarian split squats"></input>
            </div>
            <div className="routineDesc">
                <input className="editActivityDesc" type="text" placeholder="Lunge position with back leg elevated2"></input>
            </div>
            <div className="createRoutineButton">
            <button>Create Activity</button>
            </div>
        </form>
    </div>
    )
}

export default DeleteNow;