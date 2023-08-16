// import React, { useState, useEffect } from "react";
// import { Navigate, Link } from "react-router-dom";
// //this needs to be changed 
// import { QUERY_ME } from "../utils/queries";
// import Auth from "../utils/auth";
// import { formatDate } from "../utils/dateFormat";
// import Header from "../components/header";
// import exerciseIcon from "../assets/exercise-logo.png";
// import resistanceIcon from "../assets/gym2.jpeg";

import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useQuery } from "@apollo/client"; // Import the useQuery hook
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { formatDate } from "../utils/dateFormat";
import Header from "../components/header";
import exerciseIcon from "../assets/exercise-logo.png";
import resistanceIcon from "../assets/gym2.jpeg";

export default function History() {
  const [exerciseData, setExerciseData] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(6);
  const loggedIn = Auth.loggedIn();
  let currentDate;

  // Use the useQuery hook to fetch user data
  const { loading, error, data } = useQuery(QUERY_ME);

  useEffect(() => {
    if (!loading && !error) {
      const user = data.me; // Access the user data from the GraphQL response

      const exercise = user.cardioWorkouts.concat(user.weightWorkouts);
      exercise.sort((a, b) => new Date(b.date) - new Date(a.date));
      exercise.forEach((item) => {
        item.date = formatDate(item.date);
      });

      setExerciseData(exercise);
    }
  }, [loading, error]);

  function showMoreItems() {
    setDisplayedItems(displayedItems + 6);
  }

  // If the user is not logged in, redirect to the login page
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="history">
      <Header />
      <div className="d-flex flex-column align-items-center">
        <h2 className="title">History</h2>
        {exerciseData.length ? (
          <div className="history-data">
            {/* map the exercise data  */}
            {exerciseData.slice(0, displayedItems).map((exercise) => {
              let dateToDisplay;
              if (exercise.date !== currentDate) {
                currentDate = exercise.date;
                dateToDisplay = exercise.date;
              }
              return (
                <div className="history-div d-flex" key={exercise._id}>
                  <div className="date d-flex align-items-center">
                    {dateToDisplay}
                  </div>
                  <Link
                    className="text-decoration-none"
                    to={`/history/${exercise.type}/${exercise._id}`}
                  >
                    {exercise.type === "cardio" ? (
                      <div className="history-card cardio-title d-flex">
                        <div className="d-flex align-items-center">
                          <img
                            alt="exercise"
                            src={exerciseIcon}
                            className="history-icon"
                          />
                        </div>
                        <div>
                          <p className="history-name">{exercise.name}</p>
                          <p className="history-index">
                            {exercise.distance} miles{" "}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="history-card resistance-title d-flex">
                        <div className="d-flex align-items-center">
                          <img
                            alt="resistance"
                            src={resistanceIcon}
                            className="history-icon"
                          />
                        </div>
                        <div>
                          <p className="history-name">{exercise.name}</p>
                          <p className="history-index">
                            {exercise.weight} pounds{" "}
                          </p>
                        </div>
                      </div>
                    )}
                  </Link>
                </div>
              );
            })}
            {/* show more items  */}
            {exerciseData.length > displayedItems ? (
              <div className="d-flex justify-content-center">
                <button className="show-btn" onClick={showMoreItems}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                  Show More
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            <h3 className="history-text">No exercise data yet...</h3>
            <Link to="/exercise">
              <button className="home-btn">Add Exercise</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
