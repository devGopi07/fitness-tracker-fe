import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Checkbox, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../App";

const LoginSchemaValidation = yup.object({
  email: yup.string().email().required("Please Enter A Valid Email"),
  password: yup.string().required("Minimum 8 Characters Required").min(8),
});

export default function Signin() {
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const navigate = useNavigate();

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        email: "gopi.rg03@gmail.com",
        password: "gopi@321",
      },
      validationSchema: LoginSchemaValidation,
      onSubmit: (val) => {
        console.log(val);
        Login(val);
      },
    });

  const Login = async (val) => {
    let { email, password } = val;
    let payload = { email, password };

    try {
      let res = await axios.post(`${url}/users/signIn`, payload);
      console.log(res);
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      toast.error(err.response.data.message);
      localStorage.setItem("token", err.response.data.token);
    }
  };

  const [show, setShow] = useState(false);
  return (
    <div className="login-main"> 
        <form
          className="outer-div shadow-lg p-3 bg-white rounded"
          onSubmit={handleSubmit}
        >
          <h2 className="title">Login</h2>
          <TextField
            label="Enter Your Email"
            variant="outlined"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email ? (
            <p style={{ color: "red" }}>* {errors.email}</p>
          ) : (
            ""
          )}
          <TextField
            label="Enter The Password"
            variant="outlined"
            type={show ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password ? (
            <p style={{ color: "red" }}>* {errors.password}</p>
          ) : (
            ""
          )}
          <div className="showPassword-div">
            <Checkbox onClick={() => setShow(!show)} />
            <p>Show Password</p>
          </div>
          <Button variant="contained" type="submit">
            Login
          </Button>
          <div className="login-bottom">
            <Link to="/forget">Forgot Password</Link>
            <Link to="/signup">Create A New Account</Link>
          </div>
        </form>
      </div> 
  );
}
