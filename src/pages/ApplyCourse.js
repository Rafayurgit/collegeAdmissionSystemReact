import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCourses, getApplicationStatus } from "../app/slice";

//Dispatch 'getCourses' to get available courses
//Dispatch 'getApplicationStatus' to get user applications. Prevent user to reapply for same course.
import axios from "axios";

function ApplyCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const courses= useSelector((state)=>state.admissiom.courses)
  const applications= useSelector((state)=>state.admissiom.applications)
  const email=useSelector((state)=>state.user.email)

  useEffect(()=>{
    if(courses.length===0){
      dispatch(getCourses())
    }
    if(applications.length===0 && email){
      dispatch(getApplicationStatus(email))
    }
  },[dispatch, courses.length, applications.length, email])

  const applyCourse = async () => {
    /*
    To submit user application 
    Use url-  /api/applications with POST method 

    
    requestbody = {
        id:new Date().getTime(),
        applicantEmail,
        applicantName,
        courseId,
        courseName,
        status: "Pending",
        markPercentage,
      };
      
      On success display the alert - 'Your application submitted successfully' */

      try {
        const applicationData={
          id:new Date().getTime(),
          applicantEmail:email,
          applicantName:"Peter parker",
          courseId:courseId,
          courseName:courseName,
          status: "Pending",
          markPercentage:90,
        };
  
        const response= await axios.post("/api/applications", applicationData)
        if(response.status===200){
          alert("Your application submitted successfully")
          dispatch(getApplicationStatus(email))
        }
      } catch (error) {
        alert("Failed to submit the application. Try again.")
      }
  };

  return (
    <div className="container">
      {courses.length===0 ? <p>Loading courses</p>
      :(
        <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Course Id</th>
            <th scope="col">Course Name</th>
            <th scope="col">Available Seats</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course)=>{
            const alreadyApplied =applications.some((app)=>app.courseId===course.id);
            return (
              <tr key={course.id}>
            <td>{course.id}</td>
            <td>{course.name}</td>
            <td>{course.availableSeats}</td>
            <td>
              <button className="btn btn-outline-success mx-1"
              onClick={()=>applyCourse(course) }disabled={alreadyApplied}
              >{alreadyApplied ? "Already Applied": "Apply"}</button>
            </td>
          </tr>
            );
        })}
          
        </tbody>
      </table>
      )}
      
    </div>
  );
}

export default ApplyCourse;
