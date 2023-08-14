import React, { useState } from "react";
import "../assets/ExerciseCard.css";
import Workout from "../../../server/models/Workout";

const ExerciseCard = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");

  const handleWorkoutNameChange = (event) => {
    setWorkoutName(event.target.value);
  };

  const handleDistanceChange = (event) => {
    setDistance(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const [cardioExercises, setCardioExercises] = useState([]);

  const handleAddCardioClick = () => {
    const newCardioExercise = {
      workoutType: "Cardio",
      workoutName,
      distance,
      duration,
      date,
    };

    const cardioWorkout = new Workout(newCardioExercise);

    cardioWorkout
      .save()
      .then((savedWorkout) => {
        console.log("Cardio workout saved:", savedWorkout);
        setCardioExercises([...cardioExercises, newCardioExercise]);

        setWorkoutName("");
        setDistance("");
        setDuration("");
        setDate("");
      })
      .catch((error) => {
        console.error("Error saving cardio workout:", error);
        // Handle error
      });
  };

  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [restTime, setRestTime] = useState("");
  const [weight, setWeight] = useState("");

  const handleSetsChange = (event) => {
    setSets(event.target.value);
  };

  const handleRepsChange = (event) => {
    setReps(event.target.value);
  };

  const handleRestTimeChange = (event) => {
    setRestTime(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const [weightExercises, setWeightExercises] = useState([]);

  const handleAddWeightClick = () => {
    const newWeightExercise = {
      workoutType: "Weight",
      sets,
      reps,
      restTime,
      weight,
    };

    const weightWorkout = new Workout(newWeightExercise);

    weightWorkout
      .save()
      .then((savedWorkout) => {
        console.log("Weight workout saved:", savedWorkout);

        setWeightExercises([...weightExercises, newWeightExercise]);
        setSets("");
        setReps("");
        setRestTime("");
        setWeight("");
      })
      .catch((error) => {
        console.error("Error saving weight workout:", error);
        // Handle error
      });
  };

  return (
    <div className="exercise-card">
      <div className="cardio-section">
        <h2>Cardio Exercise Card</h2>
        <div className="input-group">
          <label>Workout Name:</label>
          <input
            type="text"
            value={workoutName}
            onChange={handleWorkoutNameChange}
          />
        </div>
        <div className="input-group">
          <label>Distance (miles):</label>
          <input
            type="number"
            value={distance}
            onChange={handleDistanceChange}
          />
        </div>
        <div className="input-group">
          <label>Duration:</label>
          <input type="text" value={duration} onChange={handleDurationChange} />
        </div>
        <div className="input-group">
          <label>Date:</label>
          <input type="date" value={date} onChange={handleDateChange} />
        </div>
        <button onClick={handleAddCardioClick}>Add Cardio Workout</button>
        <div className="added-exercises">
          <h3>Added Cardio Workouts</h3>
          <ul>
            {cardioExercises.map((exercise, index) => (
              <li key={index}>
                {exercise.workoutName} - Distance: {exercise.distance} miles,
                Duration: {exercise.duration}, Date: {exercise.date}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="weight-section">
        <h2>Weight Workout Card</h2>
        <div className="input-group">
          <label>Sets:</label>
          <input type="number" value={sets} onChange={handleSetsChange} />
        </div>
        <div className="input-group">
          <label>Reps:</label>
          <input type="number" value={reps} onChange={handleRepsChange} />
        </div>
        <div className="input-group">
          <label>Rest Time:</label>
          <input type="text" value={restTime} onChange={handleRestTimeChange} />
        </div>
        <div className="input-group">
          <label>Weight:</label>
          <input type="text" value={weight} onChange={handleWeightChange} />
        </div>
        <button onClick={handleAddWeightClick}>Add Weight Workout</button>
        <div className="added-exercises">
          <h3>Added Weight Workouts</h3>
          <ul>
            {weightExercises.map((exercise, index) => (
              <li key={index}>
                Sets: {exercise.sets}, Reps: {exercise.reps}, Rest Time:{" "}
                {exercise.restTime}, Weight: {exercise.weight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
