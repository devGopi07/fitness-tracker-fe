import React, { useEffect, useState } from "react";
import NavbarComp from "./NavbarComp";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BMICalculator() {
  const navigate = useNavigate();


  let token = localStorage.getItem("token")

  useEffect(() => { 
    if (!token) {
      navigate("/signin"); 
    }
  }, []);

  let [height, setHeight] = useState();
  let [weight, setWeight] = useState();
  let [bmi, setBmi] = useState();

  function cal() {
    setBmi((weight / (((height / 100) * height) / 100)).toFixed(2));
  }
  function bmiNumber() {
    if (bmi < 18.5) {
      return (
        <h1
          className="title"
          style={{ color: "#B93131", backgroundColor: "#ff000033" }}
        >
          {bmi}
        </h1>
      );
    }
    if (bmi > 18.5 && bmi <= 24.9) {
      return (
        <h1
          className="title"
          style={{ color: "green", backgroundColor: "#096b0233" }}
        >
          {bmi}
        </h1>
      );
    }
    if (bmi > 24.9 && bmi <= 29.9) {
      return (
        <h1
          className="title"
          style={{ color: "#B93131", backgroundColor: "#ff000033" }}
        >
          {bmi}
        </h1>
      );
    }
    if (bmi > 29.9) {
      return (
        <h1
          className="title"
          style={{ color: "#B93131", backgroundColor: "#ff000033" }}
        >
          {bmi}
        </h1>
      );
    }
  }
  function title() {
    if (bmi < 18.5) {
      return (
        <div>
          <p style={{ color: "#B93131", fontSize: "25px" }}>Under Weight</p>
          <p style={{ color: "#B93131", fontSize: "19px" }}>
            Time to grab a bite!
          </p>
        </div>
      );
    }
    if (bmi > 18.5 && bmi <= 24.9) {
      return (
        <div>
          <p style={{ color: "green", fontSize: "25px" }}> Normal </p>
          <p style={{ color: "green", fontSize: "19px" }}>Great Shape</p>
        </div>
      );
    }
    if (bmi > 24.9 && bmi <= 29.9) {
      return (
        <div>
          <p style={{ color: "#B93131", fontSize: "25px" }}>Over Weight</p>
          <p style={{ color: "#B93131", fontSize: "19px" }}>Time To Run!</p>
        </div>
      );
    }
    if (bmi > 29.9) {
      return (
        <div>
          <p style={{ color: "#B93131", fontSize: "25px" }}>Obesity</p>
          <p style={{ color: "#B93131", fontSize: "19px" }}>Time To Run!</p>
        </div>
      );
    }
  }

  return (
    <div>
      <NavbarComp />
      <section id="bmi">
        <div className="bmi-main-outer">
          <h2 className="title">BMI Calculator</h2>

          <div className="bmi-main-box row">
            <div className="calculator-box col-lg-7">
              <h4 className="title">Enter Your Height And Weight</h4>
              <div>
                <h6>Height (cms) </h6>
                <TextField
                  fullWidth
                  sx={{ m: 1 }}
                  id="filled-basic"
                  label="Enter Your Height In cms"
                  variant="filled"
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div>
                <h6>Weight (kgs) </h6>
                <TextField
                  fullWidth
                  sx={{ m: 1 }}
                  id="filled-basic"
                  label="Enter Your Weight In kgs"
                  variant="filled"
                  type="number"
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="calculator-btn-box">
                <Button
                  variant="text"
                  style={{ color: "#3f3f3f", border: "1px solid #3f3f3f" }}
                  onClick={() => cal()}
                >
                  Calculate
                </Button>
              </div>
            </div>

            <div className="result-box col-lg-4">
              <div>
                <h3 className="title">Your BMI</h3>
                {bmiNumber()}
              </div>

              <div>
                <h2 className="title">{title()}</h2>
                <p style={{ fontWeight: "400" }}>
                  By maintaining a healthy weight, you lower your risk of
                  developing serious health problems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
