import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getApplicationStatus } from "../app/slice";

//Dispatch 'getApplicationStatus' to get all user applications.
function ApplicationStatus() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state)=> state.user.email)
  const applications= useSelector((state)=> state.admission.applications)

  useEffect(()=>{
    if(email && applications.length===0){
      dispatch(getApplicationStatus(email))
    }
  },[email, dispatch, applications.length])


  return (
    <div className="container">
      <h3>Your Applications</h3>
      {/* If user haven't applied for any course*/}
      
      {/* If any application is available, display data in table*/}
      { applications.length==0 ? (<p>You have not applied for any course.</p>
      ):(
       <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Application Id</th>
            <th scope="col">Course Id</th>
            <th scope="col">Course Name</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app)=>(
            <tr key={app.id}>
            <td>{app.id}</td>
            <td>{app.courseId}</td>
            <td>{app.courseName}</td>
            <td>{app.status}</td>
          </tr>
          ))}
        </tbody>
      </table>
    )}
      
    </div>
  );
}

export default ApplicationStatus;
