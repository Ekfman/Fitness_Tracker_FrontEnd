import { useEffect, useState } from "react";
import { callApi } from "./Api";
import { useNavigate } from "react-router-dom";

const Profile = ({ token }) => {
  const navigate = useNavigate();
  const [myRoutines, setMyRoutines] = useState([]);
  const [myData, setMyData] = useState({});
  const [activities, setActivities] = useState([]);
  const [editButton, setEditButton] = useState(false);
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activityId, setActivityId] = useState("");
  const [routineId, setRoutineId] = useState("");
  const [routineActivity, setRoutineActivity] = useState(null);

  useEffect(() => {
    const fetchLoggedInUserData = async () => {
      try {
        const userData = await callApi({ token, path: "/users/me" });
        setMyData(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLoggedInUserData();
  }, []);

  useEffect(() => {
    const fetchMyRoutines = async () => {
      try {
        const fetchedRoutines = await callApi({
          token,
          path: `/users/${myData.username}/routines`,
        });
        setMyRoutines(fetchedRoutines);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMyRoutines();
  }, [myData, routineActivity]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const fetchedActivities = await callApi({ path: "/activities" });
        setActivities(fetchedActivities);
      } catch (error) {
        console.error(error);
      }
    };
    fetchActivities();
  }, []);

  const addRoutineButton = () => {
    navigate("/routines");
  };

  const editButtonHandler = () => {
    setEditButton(prev=>!prev)
  }

  const attachActivityHandler = async (e) => {
    e.preventDefault()
    try {
      const attachActivity = await callApi({
        method: "POST",
        body: { routineId, activityId, duration, count },
        path: `/routines/${routineId}/activities`,
      });
      setRoutineActivity(attachActivity);
    } catch (error) {
      console.error(error);
    }
  };

  

  const deleteHandler = async () => {
    try {
      const deletedRoutine = await callApi({
        token,
        path: `/routines/${routine.id}`,
      });
      setMyRoutines(deletedRoutine);
    } catch (error) {
      console.error;
    }
  };

  return (
    <div className="main">
      <h1>My Routines</h1>
      <div className="profileSubHead">
        <button onClick={addRoutineButton}>Add Routine</button>
      </div>
      <div>
        {myRoutines.map((routine) => {
          return (
            <div className="routineCard">
              <div className="routineText">
                <h2>{routine.name}</h2>
                <h3>Goal: {routine.goal}</h3>
                <h3>Activities</h3>
                {routine.activities.map( (activity) => {
                    return (
                        <div className="routineActivityDiv">
                          <div className="routineActivity">
                            <h2>{activity.name}</h2>
                            <h4>{activity.description}</h4>
                            <p>Duration: {activity.duration} min </p>
                            <p>Sets: {activity.count}</p>
                            </div>
                        </div>
                    )
                })}
                
                <p>created by: {routine.creatorName}</p>
                <button onClick={editButtonHandler}>{editButton ? "Cancel" : "Edit"}</button>
                {editButton ? (

                    <form onSubmit={attachActivityHandler}>
                    <select onChange={(e) => {
                        setActivityId(e.target.value)
                        setRoutineId(routine.id)
                        }}>
                      {activities.map((activity) => <option value={activity.id}>{activity.name}</option>
                      )}
                    </select>
                    <br></br>
                    <label>Duration</label>
                    <input value={duration} onChange={(e) => setDuration(e.target.value)} type="number"></input>
                    <label>Count</label>
                    <input value={count} onChange={(e) => setCount(e.target.value)} type="number"></input>
                    <br></br>
                  <button type="submit">Add Activity</button>
                  </form>
                ) : (<></>)}
                <button onClick={deleteHandler}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
