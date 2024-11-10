// src/components/Skills.js

import React, { useState, useEffect } from 'react';
import api from '../api';

function Skills() {
  const [skills, setSkills] = useState([{
    name: '',
    proficiency: '',
  }]);
  const [newSkill, setNewSkill] = useState({
    name: '',
    proficiency: '',
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = () => {
    api.get('/resume/skills/')
      .then(response => setSkills(response.data))
      .catch(error => console.error("Error fetching skills:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSkill({ ...newSkill, [name]: value });
  };
  const handleUpdateChange = (id, e) => {
    const { name, value } = e.target;
    //console.log(e.target);
    const updatedSkills = [...skills];
    updatedSkills[id-1] = {
        ...updatedSkills[id-1],
        [name]: value,
    };
    setSkills(updatedSkills);
  };

  const handleAddSkill = () => {
    api.post('/resume/skills/', newSkill)
      .then(fetchSkills)
      .catch(error => console.error("Error adding skill:", error));
  };

  const handleUpdateSkill = (id, updatedData) => {
    api.put(`/resume/skills/${id}/`, updatedData)
      .then(fetchSkills)
      .catch(error => console.error("Error updating skill:", error));
  };

  const handleDeleteSkill = (id) => {
    api.delete(`/resume/skills/${id}/`)
      .then(fetchSkills)
      .catch(error => console.error("Error deleting skill:", error));
  };

  return (
    <div>
      <h2>Skills</h2>
      <div>
        <h3>Add Skill</h3>
        <input type="text" name="name" placeholder="Skill Name" onChange={handleInputChange} />
        <input type="text" name="proficiency" placeholder="Proficiency" onChange={handleInputChange} />
        <button onClick={handleAddSkill}>Add</button>
      </div>
      <ul>
        {skills.map((skill) => (
          <li key={skill.id}>
              {/* List and Edit Existing Skill Entries */}
              <h3>{skill.name}</h3>
              <p>{skill.proficiency}</p>
            <input
              type="text"
              name="name"
              value={skill.name}
              onChange={(e) => {handleUpdateChange(skill.id, e)}}
            />
            <input
              type="text"
              name="proficiency"
              value={skill.proficiency}
              onChange={(e) => {handleUpdateChange(skill.id, e)}}
            />
            <button onClick={() => handleUpdateSkill(skill.id, skill)}>Save</button>
            <button onClick={() => handleDeleteSkill(skill.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Skills;
