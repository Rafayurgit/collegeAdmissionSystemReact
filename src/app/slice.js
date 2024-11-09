import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getApplications = createAsyncThunk("getApplications", async () => {
  /* Get applications of all user  
     Use url-  /api/applications with GET method */

     const response = await axios.get("/api/applications")
     return response.data;

});

export const modifyApplicationStatus = createAsyncThunk(
  "modifyApplicationStatus",
  async ({id, newStatus}) => {
    /* To modify the status of Application  
       Use url-  /api/applications/${id} with PATCH method 
       Req body - { status: <newStatus> },  newstatus can be Approved/Rejected*/

       const response = await axios.patch(`/api/applications/${id}`, {status:newStatus});
       return response.data;


});

export const getCourses = createAsyncThunk("getCourses", async () => {
   /* Get all courses offered 
     Use url-  /api/courses with GET method */

     const response = await axios.get("/api/courses")
     return response.data;

});

export const addSeats = createAsyncThunk("addSeats", async (id, updatedSeats) => {
  /* To modify seatCount of Course 
    Use url-  /api/courses/${id} with PATCH method 
    Req body - { availableSeats: <updatedSeatCount> } */

    const response = await axios.patch(`/api/courses/${id}`, {availableSeats:updatedSeats})
    return response.data
});

export const getApplicationStatus = createAsyncThunk(
  "getApplicationStatus",
  async (args) => {
    /* Get applications of logged user  
     Use url-  /api/applications?applicantEmail=${email} with GET method */

     const response= await axios.get(`/api/applications?applicantEmail=${email}`)
     return response.data;
  }
);

const initialState = {
  courses: [],
  applications:[]
};

export const slice = createSlice({
  name: "admissions",
  initialState,
  reducers: {
    setLoggedUser: (state, action) => {

    },
  },

  extraReducers: (builder) => {
    builder.addCase(getApplications.fulfilled, (state, action) => {
      state.applications= action.payload;
    });

    builder.addCase(getApplicationStatus.fulfilled, (state, action) => {
      state.applications=action.payload;
    });

    builder.addCase(getCourses.fulfilled, (state, action) => {
      state.courses=action.payload;
    });
  },
});

const { actions, reducer } = slice;
export const { setLoggedUser } = actions;
export default reducer;
