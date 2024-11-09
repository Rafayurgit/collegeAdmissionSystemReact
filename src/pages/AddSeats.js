import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses, addSeats } from "../app/slice";
import { useNavigate } from "react-router-dom";

//Dispatch 'getCourses' to get available courses
//Dispatch 'addSeats' to modify the seat count for a course
const AddSeats = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedCourse, setSelectedCourse] = useState("")
  const [newSeatCount, setNewSeatCount] = useState("")

  const courses= useSelector((state)=>state.admissions.courses)



  useEffect(()=>{
    if(courses.length ===0){
      dispatch(getCourses())
    }
  },[dispatch, courses.length])


  const handleSubmit = (event) => {
    event.preventDefault();
    
  };

  return (
    <div>
      
        <form className="container mt-5" onSubmit={handleSubmit}>
          <label className="px-2">
            Course:
            <select
              className="form-select"
              id="courseSelect"
              value={selectedCourse}
              onChange={(e)=>setSelectedCourse(e.target.value)}
            >
              <option value="" disabled>
                Select Course
              </option>
              {
                courses.map((course)=>(
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))
              }
            </select>
          </label>
          <label className="px-2" id="availableSeats">
            Available Seats: {" "}
            {
              selectedCourse ? courses.find((course)=>course.id===selectedCourse)
              ?.availableSeats || "__"
              : "__"
            }
            <input
              type="number"
              className="form-control"
              id="newSeatCount"
              placeholder="New count"
              value={newSeatCount}
              onChange={(e)=>setNewSeatCount(e.target.value)}
            />
          </label>
          <input
            type="submit"
            className="btn btn-primary"
            id="submitButton"
            value="Submit"
          />
        </form>
    
    </div>
  );
};

export default AddSeats;
