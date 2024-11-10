// src/components/Education.js

// src/components/Education.js

import React, { useState, useEffect } from 'react';
import api from '../api';

function Education() {
  const [education, setEducation] = useState([{
    school: '',
    degree: '',
    major: '',
    start_date: '',
    end_date: '',
}]);
  const [newEducation, setNewEducation] = useState({
    school: '',
    degree: '',
    major: '',
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = () => {
    api.get('/resume/education/')
      .then((response) => setEducation(response.data))
      .catch((error) => console.error("Error fetching education data:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEducation({ ...newEducation, [name]: value });
  };

  const handleUpdateChange = (id, e) => {
    const { name, value } = e.target;
    console.log(e.target);
    const updatedEducation = [...education];
    updatedEducation[id-1] = {
        ...updatedEducation[id-1],
        [name]: value,
    };
    setEducation(updatedEducation);
  };

  const handleAddEducation = () => {
//    console.log(newEducation);
    api.post('/resume/education/', newEducation)
      .then(fetchEducation)
      .catch((error) => console.error("Error adding education:", error));
  };

  const handleUpdateEducation = (id, updatedData) => {
    api.put(`/resume/education/${id}/`, updatedData)
      .then(fetchEducation)
      .catch((error) => console.error("Error updating education:", error));
  };

  const handleDeleteEducation = (id) => {
    api.delete(`/resume/education/${id}/`)
      .then(fetchEducation)
      .catch((error) => console.error("Error deleting education:", error));
  };

  return (
    <div>
      <h2>Education</h2>

      {/* Form to Add New Education Entry */}
      <div>
        <h3>Add Education</h3>
        <input type="text" name="school" placeholder="Institution" onChange={handleInputChange} />
        <input type="text" name="degree" placeholder="Degree" onChange={handleInputChange} />
	<input type="text" name="major" placeholder="Major" onChange={handleInputChange} />
        <input type="date" name="start_date" placeholder="Start Date" onChange={handleInputChange} />
        <input type="date" name="end_date" placeholder="End Date" onChange={handleInputChange} />
        <button onClick={handleAddEducation}>Add</button>
      </div>

      {/* List and Edit Existing Education Entries */}
      {education.length > 0 ? (
        <ul>
          {education.map((edu) => (
            <li key={edu.id}>
              <h3>{edu.school}</h3>
              <p>Degree: {edu.degree}</p>
	      <p>Major: {edu.major}</p>
              <p>Start Date: {edu.start_date}</p>
              <p>End Date: {edu.end_date || 'Present'}</p>

              {/* Form for Editing an Existing Entry */}
              <input type="text" name="school" placeholder="Institution" value={edu.school} onChange={(e) => {handleUpdateChange(edu.id, e)}} />
              <input type="text" name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => {handleUpdateChange(edu.id, e)}} />
	      <input type="text" name="major" placeholder="Major" value={edu.major} onchange={(e) => {handleUpdateChange(edu.id, e)}} />
              <input type="date" name="start_date" value={edu.start_date} onChange={(e) => {handleUpdateChange(edu.id, e)}} />
              <input type="date" name="end_date" value={edu.end_date} onChange={(e) => {handleUpdateChange(edu.id, e)}} />
              <button onClick={() => {handleUpdateEducation(edu.id, education[edu.id-1])}}>Save</button>
              <button onClick={() => {handleDeleteEducation(edu.id)}}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No education data available.</p>
      )}
    </div>
  );
}

export default Education;
