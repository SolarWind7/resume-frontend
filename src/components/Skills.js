// src/components/Skills.js

import React, { useState, useEffect } from 'react';
import api from '../api';
import Select from 'react-select';

const skillOptions = [
  { value: 'Novice', label: 'Fundamental Awareness (Novice): Limited experience or introductory exposure.' },
  { value: 'Intermediate', label: 'Working Knowledge (Intermediate): Practical experience and a working understanding.' },
  { value: 'Advanced', label: 'Extensive Experience (Advanced): Strong experience with significant practical exposure.' },
  { value: 'Expert', label: 'Subject Matter Expert (Expert): Recognized authority, often with specialized or niche expertise.' },
];

const Skill_Options_Map = {'Novice': skillOptions[0],
  'Intermediate': skillOptions[1],
  'Advanced': skillOptions[2],
  'Expert': skillOptions[3],
}

const SkillDropdown = ({ skilllevel, onChange }) => {
    const levels = ['Novice', 'Intermediate', 'Advanced', 'Expert'];

    return (
        <div style={{ marginBottom: '20px' }}>
            <select value={skilllevel} onChange={(e) => onChange(e)}>
                {levels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {Skill_Options_Map[lvl]}
                    </option>
                ))}
            </select>
        </div>
    );
};

function formatSkillLevel(skill) {
  //console.log(skill)
  if (skill != null && skill != '' && Skill_Options_Map[skill] != null)
    return formatOptionLabel(Skill_Options_Map[skill]);
  else
    return skill;
}

const formatOptionLabel = ({ label }) => {
  const [firstPart, rest] = label.split("(");
  const [boldPart, lastPart] = rest.split(")");
  
  return (<span>{firstPart}<strong>{boldPart}</strong>{lastPart}</span>)
};

const SkillSelect = ({ skilllevel, onChange }) => {
  return (
      <Select
          value={Skill_Options_Map[skilllevel]}
          onChange={(e) => onChange(e)}
          options={skillOptions}
          formatOptionLabel={formatOptionLabel}
          placeholder="Select skill level"
      />
  );
};

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

  const handleInputChange = (name, value) => {
    //const { name, value } = e.target;
    setNewSkill({ ...newSkill, [name]: value });
  };
  const handleUpdateChange = (id, name, value) => {
    //const { name, value } = e.target;
    //console.log(e.target);
    const updatedSkills = [...skills];
    updatedSkills[id] = {
        ...updatedSkills[id],
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

  var skill_id_count_map = {};

  for (var i=0; i < skills.length; i++) {
    skill_id_count_map[skills[i].id] = i;
  }

  return (
    <div>
      <h2>Skills</h2>
      <div>
        <h3>Add Skill</h3>
        <input type="text" name="name" placeholder="Skill Name" onChange={(e) => {handleInputChange("name", e.target.value)}} />
        <SkillSelect onChange={(e) => {handleInputChange("proficiency", e.value)}} />
        <button onClick={handleAddSkill}>Add</button>
      </div>
      <ul>
        {skills.map((skill) => (
          <li key={skill_id_count_map[skill.id]}>
              {/* List and Edit Existing Skill Entries */}
              <h3>{skill.name}</h3>
              <p>{formatSkillLevel(skill.proficiency)}</p>
            <input
              type="text"
              name="name"
              value={skill.name}
              onChange={(e) => {handleUpdateChange(skill_id_count_map[skill.id], "name", e.target.value)}}
            />
            <SkillSelect
              skilllevel={skill.proficiency}
              onChange={(e) => {handleUpdateChange(skill_id_count_map[skill.id], "proficiency", e.value)}}
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
