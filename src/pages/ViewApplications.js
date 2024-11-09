import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getApplications,
  modifyApplicationStatus,
  getCourses,
} from "../app/slice";
import { useNavigate } from "react-router-dom";

function ViewApplications() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* To Approve/ Reject an application dispatch 'modifyApplicationStatus'
     To get all user applications dispatch 'getApplications'
     To get all course details dispatch 'getCourses' to know seat availability
  */

  useEffect(() => {
    dispatch(getApplications());
    dispatch(getCourses());
  }, [dispatch]);

  const applications = useSelector((state) => state.applications.applications);
  const courses = useSelector((state) => applications.applications.courses);

  const newApplications = applications.filter(
    (app) => app.status === "Pending"
  );
  const approvedApplications = applications.filter(
    (app) => app.status === "Approved"
  );
  const rejectedApplication = applications.filter(
    (app) => app.status === "Rejected"
  );

  const handelStatusChange = async (id, newStatus) => {
    await dispatch(modifyApplicationStatus({ id, newStatus }));
    alert(
      `Application ${
        newStatus === "approved" ? "Approved" : rejected
      } successfully`
    );
  };

  return (
    <div className="container mt-3">
      <h4 className="text-primary">New Applications</h4>
      <table className="table table-hover mb-5" id="newApplicationsTable">
        <thead>
          <tr>
            <th scope="col">Application Id</th>
            <th scope="col">Course Id</th>
            <th scope="col">Course Name</th>
            <th scope="col">Applicant Name</th>
            <th scope="col">Applicant Email</th>
            <th scope="col">Mark Percentage</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {newApplications.length === 0 ? (
            <tr>
              <td colSpan="7">No new applications</td>
            </tr>
          ) : (
            newApplications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.courseId}</td>
                <td>{app.courseName}</td>
                <td>{app.applicantName}</td>
                <td>{app.applicantEmail}</td>
                <td>{app.markPercentage}</td>
                <td>
                  <button
                    className="btn btn-success mx-1"
                    onClick={() => handleStatusChange(app.id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger mx-1"
                    onClick={() => handleStatusChange(app.id, "Rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <hr></hr>
      <h4 className="text-primary">Approved Applications</h4>

      <table className="table table-hover mb-5" id="approvedApplicationsTable">
        <thead>
          <tr>
            <th scope="col">Application Id</th>
            <th scope="col">Course Id</th>
            <th scope="col">Course Name</th>
            <th scope="col">Applicant Name</th>
            <th scope="col">Applicant Email</th>
            <th scope="col">Mark Percentage</th>
          </tr>
        </thead>
        <tbody>
          {approvedApplications.length === 0 ? (
            <p>No approved applications</p>
          ) : (
            approvedApplications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.courseId}</td>
                <td>{app.courseName}</td>
                <td>{app.applicantName}</td>
                <td>{app.applicantEmail}</td>
                <td>{app.markPercentage}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <hr></hr>
      <h4 className="text-primary">Rejected Applications</h4>
      
      <table className="table table-hover mb-5" id="rejectedApplicationsTable">
        <thead>
          <tr>
            <th scope="col">Application Id</th>
            <th scope="col">Course Id</th>
            <th scope="col">Course Name</th>
            <th scope="col">Applicant Name</th>
            <th scope="col">Applicant Email</th>
            <th scope="col">Mark Percentage</th>
          </tr>
        </thead>

        <tbody>
          {rejectedApplication.length===0 ? (<p>No rejected applications</p>) 
          :(
            rejectedApplication.map((app)=>(
          <tr key={"unique-key"}>
            <td>{app.id}</td>
                <td>{app.courseId}</td>
                <td>{app.courseName}</td>
                <td>{app.applicantName}</td>
                <td>{app.applicantEmail}</td>
                <td>{app.markPercentage}</td>
          </tr>
            ))
            
          )}
          
        </tbody>
      </table>
    </div>
  );
}

export default ViewApplications;
