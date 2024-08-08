import { Button, Checkbox, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";

const SignupSchemaValidation = yup.object({
  name: yup.string().required("Please Enter Your Name"),
  email: yup.string().email().required("Please Enter A Valid Email"),
  password: yup.string().required("Minimum 8 Characters Required").min(8),
  confirmPassword: yup.string().required("Password Doesn't Match.").min(1),
});

export default function Signup() {
  const [show, setShow] = useState(false);
  const [sent,setSent]=useState(false)
  const navigate=useNavigate()

  const { values, handleSubmit, handleBlur, handleChange, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: SignupSchemaValidation,
      onSubmit: (val) => {
        console.log(val);
        create(val)
      },
    });
    const create=async (val)=>{
      let {name,email,password,confirmPassword}=val
      let payload={name,email,password,confirmPassword}

      try {
        let res=await axios.post(`${url}/users/signUp`,payload);
        console.log(res); 
        localStorage.setItem("token",res.data.token)
        toast.success(res.data.message)
        setSent(!sent)
        // navigate("/signin")

      } catch (err) {
        toast.error(err.response.data.message)
      }

    }
  return (
    <div className="login-main"> 
        {sent?<form
          className="outer-div shadow-lg p-3 bg-white rounded"
          onSubmit={handleSubmit}
        >
          <h2 className="title">{sent?"Account Created":"Create A New Account"}</h2>
           <h5 className="signup-p"> We Sent You A Account Activation Link To Your Mail Id Click It To Verify Your Account. </h5>
          <div className="login-bottom">
            <Link to="/login">Already Have An Account? Login.</Link>
            <Link to="/forget">Forget Password</Link>
          </div>
        </form>:<form
          className="outer-div shadow-lg p-3 bg-white rounded"
          onSubmit={handleSubmit}
        >
          <h2 className="title">Create A New Account</h2>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name? <p style={{color:"red"}}>*{errors.name}</p>: ""}
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email? <p style={{color:"red"}}>*{errors.email}</p>: ""}
          <TextField
            label="Password"
            variant="outlined"
            type={show ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password? <p style={{color:"red"}}>*{errors.password}</p>: ""}
          <TextField
            label="Confirm Password"
            variant="outlined"
            type={show ? "text" : "password"}
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.confirmPassword && errors.confirmPassword ? <p style={{color:"red"}}>*{errors.confirmPassword}</p>: ""}
          {touched.confirmPassword &&(values.confirmPassword.length > 0 && values.confirmPassword!==values.password)? <p style={{color:"red"}}>* Password Doesn't Match</p>: ""}
          <div className="showPassword-div">
            <Checkbox onClick={() => setShow(!show)} />
            <p>Show Password</p>
          </div>
          <Button variant="contained" type="submit">
            Create
          </Button>
          <div className="login-bottom">
            <Link to="/login">Already Have An Account? Login.</Link>
            <Link to="/forget">Forget Password</Link>
          </div>
        </form>}
      </div> 
  );
}
