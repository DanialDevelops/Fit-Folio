import React from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import Container from "react-bootstrap/Container";
import Header from "../components/header";
import ExerciseCard from "../components/Exercise.js"; // Import the ExerciseCard component

export default function Home() {
  const navigate = useNavigate();
  const loggedIn = Auth.loggedIn();

  return (
    <div className="homepage">
      <Header />
      <Container className="home d-flex flex-column align-items-center justify-content-center flex-wrap text-center">
        <h1 className="home-title">Your Fitness Folio, Redefined</h1>
        <p className="home-text">
          With FitFolio, tracking your daily exercise becomes effortless and
          enjoyable.Get ready to embrace a healthier lifestyle and unlock your
          full potential as you log and monitor your workouts with ease. Let's
          embark on this fitness journey together and achieve your goals one
          step at a time. Join FitFolio now and witness the transformation
          firsthand!
        </p>
        <ExerciseCard />
        {loggedIn ? (
          <button className="home-btn" onClick={() => navigate("/exercise")}>
            Add Exercise
          </button>
        ) : (
          <button className="home-btn" onClick={() => navigate("/signup")}>
            Get Started
          </button>
        )}
      </Container>
    </div>
  );
}
