// src/components/Experience.js

import React, { useState, useEffect } from 'react';
import api from '../api';

function Experience() {
  const [experience, setExperience] = useState([{
    job_title: '',
    company: '',
    start_date: '',
    end_date: '',
    description: '',
  }]);
  const [newExperience, setNewExperience] = useState({
    job_title: '',
    company: '',
    start_date: '',
    end_date: '',
    description: '',
  });

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = () => {
    api.get('/resume/experience/')
      .then(response => setExperience(response.data))
      .catch(error => console.error("Error fetching experience:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //console.log(e.target);
    setNewExperience({ ...newExperience, [name]: value });
  };

  const handleUpdateChange = (id, e) => {
    const { name, value } = e.target;
    //console.log(e.target.name);
    //console.log(e.target.value);
    const updatedExperience = [...experience];
    updatedExperience[id-1] = {
        ...updatedExperience[id-1],
        [name]: value,
    };
    setExperience(updatedExperience);
  };

  const handleAddExperience = () => {
    api.post('/resume/experience/', newExperience)
      .then(fetchExperience)
      .catch(error => console.error("Error adding experience:", error));
  };

  const handleUpdateExperience = (id, updatedData) => {
    api.put(`/resume/experience/${id}/`, updatedData)
      .then(fetchExperience)
      .catch(error => console.error("Error updating experience:", error));
  };

  const handleDeleteExperience = (id) => {
    api.delete(`/resume/experience/${id}/`)
      .then(fetchExperience)
      .catch(error => console.error("Error deleting experience:", error));
  };

  return (
    <div>
      <h2>Experience</h2>
      <div>
        <h3>Add Experience</h3>
        <input type="text" name="job_title" placeholder="Job Title" onChange={handleInputChange} />
        <input type="text" name="company" placeholder="Company" onChange={handleInputChange} />
        <input type="date" name="start_date" placeholder="Start Date" onChange={handleInputChange} />
        <input type="date" name="end_date" placeholder="End Date" onChange={handleInputChange} />
       <div><textarea name="description" placeholder="Description" onChange={handleInputChange}></textarea></div>
        <button onClick={handleAddExperience}>Add</button>
      </div>
      <ul>
        {experience.map((exp) => (
          <li key={exp.id}>
              {/* List and Edit Existing Experience Entries */}
              <h3>{exp.job_title}</h3>
              <p>{exp.company}</p>
              <p>Start Date: {exp.start_date}</p>
              <p>End Date: {exp.end_date || 'Present'}</p>
              <p>{exp.description}</p>
              <input
              type="text"
              name="job_title"
              value={exp.job_title}
              onChange={(e) => {handleUpdateChange(exp.id, e)}}
            />
            <input
              type="text"
              name="company"
              value={exp.company}
              onChange={(e) => {handleUpdateChange(exp.id, e)}}
            />
            <input
              type="date"
              name="start_date"
              value={exp.start_date}
              onChange={(e) => {handleUpdateChange(exp.id, e)}}
            />
            <input
              type="date"
              name="end_date"
              value={exp.end_date || ''}
              onChange={(e) => {handleUpdateChange(exp.id, e)}}
            />
            <div>
            <textarea name="description" placeholder="Description" value={exp.description} onChange={(e) => {handleUpdateChange(exp.id, e)}}></textarea>
            </div>
            <button onClick={() => handleUpdateExperience(exp.id, exp)}>Save</button>
            <button onClick={() => handleDeleteExperience(exp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Experience;
