import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail]= useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress]= useState("");
  const [markPercentage, setMarkPercentage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /*To add new user
      Use url-  /api/applicants with POST method 
      requestbody = {
        id: new Date().getTime(),
        email,
        password,
        name,
        age,
        mobile,
        address,
        markPercentage,
      };
    */

      const handleSubmit = async(e)=>{

        e.preventDefault();
        setErrorMessage("")

        if(password != confirmPassword){
          setErrorMessage("password do not match")
          return;
        }

        const emailExist= await checkEmailExist(email)
        if(emailExist){
          setErrorMessage("email already exist")
          return;
        }

        const newUser ={
          id: new Date().getTime(),
          email,
          password,
          name,
          age,
          mobile,
          address,
          markPercentage,
        };

        try {
          await axios.post(`/api/applicants`, newUser);
          alert("SignUp successfully");
        } catch (error) {
          setErrorMessage("SignUp failed, Try again later")
        }
      };

  /*To check whether entered email is already registered
      Use url-  /api/applicants?email=${<enteredEmail>} with GET method 
    */

      const checkEmailExist= async (email)=>{
        try {
          const response=await axios.get(`/api/applicants?email=${email}`);
          return response.data.length>0;
        } catch (error) {
          setErrorMessage("An Error occured while checking email")
          return false;
        }
      }

  return (
    <div>
      <form className="container mt-2" onSubmit={handleSubmit}>
        <div className="form-header">
          <h3>Signup</h3>
          <p>Create new account here</p>
        </div>

        <input
          type="text"
          name="email"
          id="email"
          placeholder="enter your email"
          className="form-control mt-2"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="choose password"
          className="form-control mt-2"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          name="confirmpassword"
          id="confirmpassword"
          placeholder="confirm password"
          className="form-control mt-2"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          required
        />
        <input
          type="text"
          name="name"
          id="name"
          placeholder="your name"
          className="form-control mt-2"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <input
          type="number"
          name="age"
          id="age"
          placeholder="your age"
          className="form-control mt-2"
          value={age}
          onChange={(e)=>setAge(e.target.value)}
        />
        <input
          type="number"
          name="mobile"
          id="mobile"
          placeholder="your mobile number"
          className="form-control mt-2"
          value={mobile}
          onChange={(e)=>setMobile(e.target.value)}
        />
        <textarea
          name="address"
          rows="2"
          cols="50"
          id="address"
          placeholder="your address"
          className="form-control mt-2"
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
        />
        <input
          type="number"
          name="markPercentage"
          id="markPercentage"
          placeholder="Mark Percentage in 12th grade"
          className="form-control mt-2"
          value={markPercentage}
          onChange={(e)=>setMarkPercentage(e.target.value)}
        />

        <p className="text-danger" id="errorMessage">
          Display error message here
        </p>
        <button className="btn btn-primary" id="submitButton">
          SIGN UP
        </button>
        <div className="form-group pt-3">
          <p>
            Already have an Account <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
