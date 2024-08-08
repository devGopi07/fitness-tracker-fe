import { BorderBottom } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react'
 
import Container from "react-bootstrap/Container"; 
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar"; 
import { Navigate, useNavigate } from 'react-router-dom';

export default function NavbarComp() {
  
  const navigate=useNavigate();

  return (
    <Navbar collapseOnSelect fixed="top" expand="lg" style={{backgroundColor:"white" ,borderBottom:"1px solid #bbbbbb"}} variant="light">
    <Container> 
      <Navbar.Brand onClick={()=>navigate("/home")}> <Button> <h2 className='brand-name'> Fitness Tracker </h2> </Button> </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="justify-content-end align-items-end flex-grow-1 pe-3">
              <Nav.Link onClick={()=>navigate("/home")}> <h6> Home </h6> </Nav.Link>
              <Nav.Link onClick={()=>navigate("/previousWorkout")}> <h6> Previous Workout </h6> </Nav.Link>
              <Nav.Link onClick={()=>navigate("/bmiCalculator")}> <h6> BMI Calculator </h6> </Nav.Link>
              <Nav.Link onClick={()=>navigate("/login")}> 
              <Button
                variant="contained" 
                style={{ backgroundColor: "#dfdfdf", color: "black" }}
              >
              Logout 
              </Button> 
              </Nav.Link>   
            </Nav>  
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
