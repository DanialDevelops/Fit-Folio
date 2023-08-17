import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CARDIOWORKOUT, ADD_WEIGHTWORKOUT } from "../utils/mutations.js";
import "../index.css";

const ExerciseCard = ({ userId }) => {
  const [workoutName, setWorkoutName] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [restTime, setRestTime] = useState("");
  const [weight, setWeight] = useState("");
  const [cardioExercises, setCardioExercises] = useState([]);
  const [weightExercises, setWeightExercises] = useState([]);

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

  const [addCardioWorkout] = useMutation(ADD_CARDIO_WORKOUT);
  const [addWeightWorkout] = useMutation(ADD_WEIGHT_WORKOUT);

  const handleAddCardioClick = async () => {
    const newCardioExercise = {
      workoutType: "Cardio",
      workoutName,
      distance,
      duration,
      date,
    };

    try {
      const result = await addCardioWorkout({
        variables: {
          userId: userId,
          workoutData: newCardioExercise,
        },
      });
      
      const addedCardioExercise = result.data.addCardioWorkout;

      setCardioExercises([...cardioExercises, addedCardioExercise]);

      setWorkoutName("");
      setDistance("");
      setDuration("");
      setDate("");
    } catch (error) {
      console.error("Error adding cardio workout:", error);
    }
  };

  const handleAddWeightClick = async () => {
    const newWeightExercise = {
      workoutType: "Weight",
      sets,
      reps,
      restTime,
      weight,
    };

    try {
      const result = await addWeightWorkout({
        variables: {
          userId: userId,
          workoutData: newWeightExercise,
        },
      });

      const addedWeightExercise = result.data.addWeightWorkout;

      setWeightExercises([...weightExercises, addedWeightExercise]);

      setSets("");
      setReps("");
      setRestTime("");
      setWeight("");
    } catch (error) {
      console.error("Error adding weight workout:", error);
    }
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