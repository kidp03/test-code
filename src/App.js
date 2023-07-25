import logo from './logo.svg';
import './App.css';
import { useReducer, useRef, useState } from 'react';
const initState = {
  job: '',
  jobs:[]
};
const SET_JOB  = 'set_job';
const ADD_JOB  = 'add_job';
const DELETE_JOB  = 'delete_job';

const setJob = payload => {
  return {
    type: SET_JOB,
    payload: payload
  }
}
const addJob = payload => {
  return {
    type: ADD_JOB,
    payload: payload
  }
}
const deleteJob = payload => {
  return {
    type: DELETE_JOB,
    payload: payload
  }
}
const reducer = (state, action) => {
  let newState
  switch (action.type) {
    case SET_JOB:
      newState = {
        ...state,
        job: action.payload
      }
      break;
    case ADD_JOB:
      newState = {
        ...state,
        jobs: [...state.jobs, action.payload]
      }
      break;
    case DELETE_JOB:
      const newJob = [...state.jobs]
      newJob.splice(action.payload, 1)
      newState = {
        ...state,
        jobs: newJob
      }
      break;
   
    default:
      throw new Error("loi");
  }
  console.log(newState);
  return newState;
}
function App() {
  const inputRef = useRef()
  const [state, dispatch] = useReducer(reducer, initState);
  const {job, jobs} = state;
  const handleAdd = () => {
    dispatch(addJob(job));
    dispatch(setJob(''));
    inputRef.current.focus();
  }
  return (
    <div className="App">
      <input 
        ref={inputRef}
          value={job}
          onChange={(e) => {
            dispatch(setJob(e.target.value))
          }}
      />
      <button onClick={handleAdd}>ADD</button>
      <ul>
        {jobs.map((job,index) => (
          <li key={index}>{job}
              <span onClick={() => dispatch(deleteJob(index))}>&times;</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
