import React, { useState } from "react"; 
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Checkbox, TextField } from "@mui/material";
import { url } from "../App";
import { toast } from "react-toastify";
import axios from "axios";

const CreateSchemaValidation = yup.object({
  password: yup.string().required("Minimum 8 Characters Required").min(8),
  confirmPassword: yup.string().required("Password Doesn't Match").min(8),
});

export default function ResetPassword() {
  const navigate = useNavigate();
  let [show, setShow] = useState(false);

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      validationSchema: CreateSchemaValidation,
      onSubmit: (val) => {
        Create(val); 
      },
    });

  const Create = async (val) => {
    console.log(val);
    let { password } = val;
    console.log(password);
    let payload = { password };
    let resetToken=localStorage.getItem("resetToken")
    try {
      let res = await axios.post(`${url}/users/resetPassword`,payload,{
        headers:{Authorization:`Bearer ${resetToken}`}
      });
      console.log(res);
      toast.success(res.data.message);
      localStorage.clear()
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="login-main"> 
        <Form
          className="outer-div shadow-lg p-3 mb-5 bg-white rounded"
          onSubmit={handleSubmit}
        > 
            <h2 className="title">Reset Your Password Here</h2>  
            <TextField
              label="Password"
              type={show ? "text" : "password"}
              variant="outlined"
              onBlur={handleBlur}
              name="password"
              value={values.password}
              onChange={handleChange}
              style={{
                marginTop: "20px",
                fontSize: "15px",
              }}
            />
            {touched.password && errors.password ? (
              <p style={{ color: "red" }}>{errors.password}</p>
            ) : (
              ""
            )}

            <TextField
              label="Confirm Password"
              type={show ? "text" : "password"}
              variant="outlined"
              onBlur={handleBlur}
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              style={{
                marginTop: "20px",
                fontSize: "15px",
              }}
            />
            {touched.confirmPassword && errors.confirmPassword ? (
              <p style={{ color: "red" }}>{"Enter the Confirm Password"}</p>
            ) : (
              ""
            )}

            {values.confirmPassword.length &&
            values.password !== values.confirmPassword ? (
              <p style={{ color: "red" }}>{"Password Doesn't Match"}</p>
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
        </Form> 
    </div>
  );
}
