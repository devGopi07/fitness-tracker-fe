import "./App.css"; 
import * as React from "react";  
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import BMICalculator from "./Components/BMICalculator";
import Previousworkouts from "./Components/Previousworkouts";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Forget from "./Components/Forget";
import ResetPassword from "./Components/ResetPassword";
import Activation from "./Components/Activation";     

export const url="https://fitness-tracker-be-z4l7.onrender.com" 

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signUpActivation/:id" element={<Activation/>} />
        <Route path="/forget" element={<Forget/>}/>
        <Route path="/reset-password/:id" element={<ResetPassword/>} />


          <Route path="/home" element={<Home/>}/> 
          <Route path="/bmiCalculator" element={<BMICalculator/>}/> 
          <Route path="/previousWorkout" element={<Previousworkouts/>}/>  

          <Route path="/*" element={<Navigate to="/signin"/>}/> 
        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
