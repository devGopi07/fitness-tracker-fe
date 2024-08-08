import React, { useEffect, useState } from "react";
import NavbarComp from "./NavbarComp";
import { Button, TextField } from "@mui/material"; 
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../App";
import * as yup from "yup";
import { useFormik } from "formik"; 

const HomeSchemaValidation = yup.object({
  date: yup.string().required("Please Enter The Date"),
  exercise: yup.string().required("Please Enter The Workout Name"),
  count: yup.number().required("Please Enter The Number Of Reps").min(0),
});

export default function Home() {

  const navigate = useNavigate();

  let [mainArray, setMainArray] = useState([]);
 

  let token = localStorage.getItem("token")

  useEffect(() => { 
    if (!token) {
      navigate("/signin"); 
    }
  }, []);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        date: "",
        exercise: "",
        count: 0,
      },
      validationSchema: HomeSchemaValidation,
      onSubmit: (val) => {
        console.log(val);
        addExercise(val)
      },
    });
 
    async function addExercise(val) {
      let {date,exercise,count}=val
      let email=token;
      let payload={date,exercise,count,email}

      try {
        let res=await axios.post(`${url}/workouts/createWorkout`,payload)
        console.log(payload)
        console.log(res)
        toast.success(res.data.message)
      } catch (error) {
        toast.error(error.response.data.message)
        if (error.response.status > 399 && error.response.status < 500) {
          toast.error("Session Expired Login Again");
          localStorage.removeItem("token");
          navigate("/login");      
        }
      }

      // mainArray.push({
      //   Date: values.date,
      //   Exercise: values.exercise,
      //   Reps: values.count,
      // });
      // console.log(mainArray);
    }  
 
  return (
    <div>
      <NavbarComp />
      <section id="home">
        <div className="main-outer">
          <h1 className="title">Fitness Tracker</h1>
          
            <form className="main-box" onSubmit={handleSubmit}>
              <div>
                <h6>Enter The Date</h6>
                <TextField
                  fullWidth
                  sx={{ m: 1 }}
                  id="filled-basic"
                  variant="filled"
                  type="date"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                 {touched.date && errors.date ? (
                  <p style={{ color: "red" }}>{errors.date}</p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <h6>Name Of The Exercise</h6>
                <TextField
                  fullWidth
                  sx={{ m: 1 }}
                  id="filled-basic"
                  label="Exercise Name"
                  variant="filled"
                  type="text"
                  name="exercise"
                  value={values.exercise}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.exercise && errors.exercise ? (
                  <p style={{ color: "red" }}>{errors.exercise}</p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <h6>Number Of Reps</h6>
                <TextField
                  fullWidth
                  sx={{ m: 1 }}
                  id="filled-basic"
                  type="number"
                  label="No Of Reps"
                  variant="filled"
                  name="count"
                  value={values.count}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.count && errors.count ? (
                  <p style={{ color: "red" }}>{errors.count}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="btn-box">
                <Button
                  variant="text"
                  style={{ color: "#3f3f3f", border: "1px solid #3f3f3f" }}
                  type="submit"
                >
                  Add Workout
                </Button> 
              </div>
            </form> 
        </div>
      </section>
    </div>
  );
}
