import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import Header from "../components/header";
import cardioIcon from "../assets/cardio-icon.png"; // Update the paths accordingly
import resistanceIcon from "../assets/resistance-icon.png"; // Update the paths accordingly
import ExerciseCard from "../components/ExerciseCard"; // Import the ExerciseCard component

export default function exercise() {

  return (
    <div className="homepage">
      <ExerciseCard />
    </div>
  );
}