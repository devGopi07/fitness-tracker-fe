import React, { useEffect, useState } from "react";
import NavbarComp from "./NavbarComp";
import Table from "react-bootstrap/Table";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { DataC } from "./DataC";
import { useNavigate } from "react-router-dom";

export default function Previousworkouts() {
  let [datepick, setDatepick] = useState();
  let [filtered, setFiltered] = useState(false);
  let [arr, setArr] = useState([]);

  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  let email = localStorage.getItem("token");

  const getData = async () => {
    try {
      let payload = { email };
      let res = await axios.post(`${url}/workouts/getAllWorkouts`, payload);

      setArr(res.data.data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getData();
    if (!token) {
      navigate("/signin");
    }
  }, []);

  async function Delete(idx) {
    let deleteVal = arr.filter((val) => val._id === idx);
    let _id = deleteVal[0]._id;
    let filteredList = arr.filter((val) => val._id !== idx);

    try {
      let res = await axios.delete(`${url}/workouts/deleteWorkout/${_id}`);
      console.log(res);
      toast.success(res.data.message);
      setArr(filteredList);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  function dateC(val, idx) {
    if (datepick === val.date) {
      return (
        <tr key={idx}>
          <td>{idx + 1}</td>
          <td>{val.date}</td>
          <td>{val.exercise}</td>
          <td>{val.count}</td>
        </tr>
      );
    }
  }

  function filteredData() {
    setFiltered(!filtered);
  }
  return (
    <div>
      <NavbarComp />
      <section id="home">
        <div className="container">
          <div className="previous-workout-outer">
            <h3 className="title">Previous Workouts</h3>

            <div className="previous-workout-filter">
              <TextField
                label="Filter By Date"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                type="date"
                onChange={(e) => setDatepick(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={() => filteredData()}
                style={{ backgroundColor: "#dfdfdf", color: "black" }}
              >
                {filtered ? "Show All" : "Filter"}
              </Button>
            </div>
            <div className="row">
              <div>
                <Table
                  className="previous-workout-table"
                  striped
                  bordered
                  hover
                  responsive="sm"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Exercise Name</th>
                      <th>Reps/Duration</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  {filtered ? (
                    <tbody>
                      {arr.map((val, idx) => {
                        return dateC(val, idx);
                      })}
                    </tbody>
                  ) : (
                    <tbody>
                      {arr.map((val, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{val.date}</td>
                            <td>{val.exercise}</td>
                            <td>{val.count}</td>
                            <td>
                              <Button
                                variant="contained"
                                style={{
                                  backgroundColor: "#dfdfdf",
                                  color: "black",
                                }}
                                onClick={() => Delete(val._id)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  )}
                </Table>
              </div>
            </div>
            <div>
              <DataC dates={arr} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
