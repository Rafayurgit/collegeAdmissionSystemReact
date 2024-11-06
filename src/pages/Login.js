import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "../app/slice";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [mail, setMail]= useState("");
  const [password, setPassword]= useState("");
  const [isAdmine, setIsAdmine]= useState(false)
  const [errorMessage, setErrorMessage] = useState("");


  const handelCheckBox= ()=> setIsAdmine(!isAdmine)

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*
    To get user credentials
    Use url-  /api/applicants?email=${email} with GET method 

    To get admin credentials
    Use url-  /api/admin?email=${email} with GET method 
    */

    try {
      const endpoint=isAdmine ? `/api/applicants?email=${email}` : `/api/admin?email=${email}`

      const data = await axios.get(endpoint);
  
      if(data && data.password === password){
        dispatch(setLoggedUser(data))
  
        navigate('/dashboard')
      }else{
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      setErrorMessage("Error logging in. try again")

    }


  };

  return (
    <div>
      <form className="container mt-5">
        <div className="form-header">
          <h3 id="loginHeader">Admin Login / Applicant Login</h3>
          <div className="float-right ">
            <input
              type="checkbox"
              id="userType"
              name="user"
              className="form-check-input"
            />
            <label className="form-check-label ps-2">Admin</label>
          </div>
          <br />
          <p>Enter your credentials here to Login</p>
        </div>

        <input
          type="email"
          name="email"
          id="userEmail"
          placeholder="your email"
          className="form-control mt-2"
          
          onChange={(e)=>setMail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="userPassword"
          placeholder="password"
          className="form-control mt-2"
          required

          onChange={(e)=>setPassword(e.target.value)}
        />
        <p className="text-danger" id="errorMessage">
          Display error message here
        </p>
        <button className="btn btn-primary" id="loginButton">
          Login
        </button>
        <div className="form-group pt-3">
          <p>
            Do not have an Account{" "}
            <Link id="signupLink" to="/signup">
              Signup
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
