// src/components/Education.js

// src/components/Education.js

import React, { useState, useEffect, useMemo } from 'react';
import api from '../api';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
//import axios from 'axios';

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

  const degreeOptions = useMemo(() => [
    { value: "None", label: "No Degree"},
    { value: 'AA', label: 'Associate of Arts' },
    { value: 'AS', label: 'Associate of Science'},
    { value: 'BA', label: 'Bachelor of Arts' },
    { value: 'BS', label: 'Bachelor of Science' },
    { value: "BAS", label: "Bachelor of Applied Science" },
    { value: "BTech", label: "Bachelor of Technology" },
    { value: "BFA", label: "Bachelor of Fine Arts" }, 
    { value: 'MA', label: 'Master of Arts' },
    { value: 'MS', label: 'Master of Science' },
    { value: 'MCS', label: 'Master of Computer Science' },
    { value: 'MEng', label: 'Master of Engineering' },
    { value: "MArch", label: "Master of Architecture" },
    { value: "MES", label: "Master of Environmental Science" },
    { value: 'MCJ', label: 'Master of Criminal Justice' },
    { value: 'MSF', label: 'Master of Science in Finance' },
    { value: 'MSIT', label: 'Master of Science in Information Technology' },
    { value: 'MBA', label: 'Master of Business Administration' },
    { value: 'EMBA', label: 'Executive MBA' },
    { value: "MUP", label: "Master of Urban Planning" },
    { value: 'MPH', label: 'Master of Public Health' },
    { value: 'MHA', label: 'Master of Health Administration' },
    { value: 'MAC', label: 'Master of Arts in Counseling' },
    { value: 'MEd', label: 'Master of Education' },
    { value: 'MPhil', label: 'Master of Philosophy'},
    { value: 'MRes', label: 'Master of Research'},
    { value: 'LLM', label: 'Master of Laws'},
    { value: "MFA", label: "Master of Fine Arts" },
    { value: "MSW", label: "Master of Social Work" },
    { value: "MPP", label: "Master of Public Policy" },
    { value: "MIA", label: "Master of International Affairs" },
    { value: "EdS", label: 'Educational Specialist'},
    { value: 'PhD', label: 'Doctor of Pholosophy' },
    { value: 'DSc', label: 'Doctor of Science' },
    { value: 'DEng', label: 'Doctor of Engineering' },
    { value: 'DTech', label: 'Doctor of Technology' },
    { value: "DESE", label: "Doctor of Environmental Science and Engineering" },
    { value: 'EdD', label: 'Doctor of Education' },
    { value: 'DBA', label: 'Doctor of Business Administration' },
    { value: 'JD', label: 'Juris Doctor' },
    { value: 'SJD/JSD', label: 'Doctor of Juridical Science'},
    { value: 'MD', label: 'Doctor of Medicine' },
    { value: 'DO', label: 'Doctor of Osteopathic Medicine'},
    { value: 'DVM', label: 'Doctor of Veterinary Medicine' },
    { value: 'DNP', label: 'Doctor of Nursing Practice'},
    { value: 'PharmD', label: 'Doctor of Pharmacy'},
    { value: 'DDS/DMD', label: 'Doctor of Dental Surgery/Medicine' },
    { value: "DSW", label: "Doctor of Social Work"},
    { value: "DMA", label: "Doctor of Musical Arts"},
  ]);
  /*const degreeOptions = [
    { value: 'High School', label: 'High School Diploma or Equivalent'},
    { value: 'Some College', label: 'Some College'},
    { value: 'UCert', label: 'Undergraduate Certificate'},
    { value: 'Associate', label: 'Associate Degree' },
    { value: 'Bachelor', label: "Bachelor's Degree" },
    { value: 'GCert', label: "Graduate Certificate" },
    { value: 'Master', label: "Master's Degree" },
    { value: 'PMCert', label: "Post-Master's Certificate" },
    { value: 'Doctorate', label: 'Doctorate Degree' },
  ];*/
  var Degree_Label_Map = {};
  var Degree_Option_Index_Map = {};
  
  for (var i=0; i<degreeOptions.length; i++) {
    Degree_Label_Map[degreeOptions[i].value] = degreeOptions[i].label;
    Degree_Option_Index_Map[degreeOptions[i].value] = i;
  }

  //console.log(Degree_Label_Map);
  const DegreeSelect = ({ degreelevel, onChange }) => {
    //console.log(Degree_Option_Index_Map[degreelevel]);
    //console.log(degreelevel);
    if (degreelevel != null && degreelevel!='')
      return (
        <Select
            defaultValue={degreeOptions[Degree_Option_Index_Map[degreelevel]]}
            onChange={(e) => onChange(e)}
            options={degreeOptions}
            placeholder="Select degree type"
            isSearchable={true}
        />
      );
    else {
      //console.log('no defaultValue');
      return (
        <Select
          onChange={(e) => onChange(e)}
          options={degreeOptions}
          placeholder="Select degree type"
          isSearchable={true}
        />
      );
    }
  };
  
  function formatDegree(degree) {
    //console.log(degree, Degree_Label_Map[degree]);
    if (Degree_Label_Map[degree]!=null)
      return Degree_Label_Map[degree];
    else
      return '';
  
  }

  const loadOptions = async (inputValue) => {
    if (!inputValue) return [];
    try {
        //console.log(inputValue);
        var response = await api.get(`resume/search_universities/?q=${inputValue}`);
        //console.log(response.data);
        return response.data.map((item) => ({
            label: item.name,  // Text displayed in dropdown
            value: item.name,    // Unique identifier for the item
        }));
    } catch (error) {
        console.error("Error fetching options:", error);
        return [];
    }
  };

  const SchoolSelect = ({school, onChange}) => {
    if (school != null && school != '') {
      var mySchool = [{label: school, value: school}];
      return (
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          onChange = {(e) => onChange(e)}
          placeholder = "Search for Universities"
          defaultOptions = {mySchool}
          value = {mySchool[0]}
        />
      );
    }
    else {
      return (
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          onChange = {(e) => onChange(e)}
          placeholder = "Search for Universities"
        />
      );
    }
  }



  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = () => {
    api.get('/resume/education/')
      .then((response) => setEducation(response.data))
      .catch((error) => console.error("Error fetching education data:", error));
  };

  const handleInputChange = (name, value) => {
    //const { name, value } = e.target;
    console.log(name, value);
    setNewEducation({ ...newEducation, [name]: value });
  };

  const handleUpdateChange = (id, name, value) => {
    //const { name, value } = e.target;
    //console.log(id, name, value);
    const updatedEducation = [...education];
    updatedEducation[id] = {
        ...updatedEducation[id],
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

  var education_id_count_map = {};

  for (var i=0; i < education.length; i++) {
    education_id_count_map[education[i].id] = i;
  }
  //console.log(education_id_count_map);

  return (
    <div>
      <h2>Education</h2>

      {/* Form to Add New Education Entry */}
      <div>
        <h3>Add Education</h3>
        <SchoolSelect onChange={(e) => {handleInputChange("school", e.value)}} />
        <DegreeSelect degreelevel={newEducation.degree} onChange={(e) => {handleInputChange('degree', e.value)}} />
	<input type="text" name="major" placeholder="Major" onChange={(e) => {handleInputChange(e.target.name, e.target.value)}} />
        <input type="date" name="start_date" placeholder="Start Date" onChange={(e) => {handleInputChange(e.target.name, e.target.value)}} />
        <input type="date" name="end_date" placeholder="End Date" onChange={(e) => {handleInputChange(e.target.name, e.target.value)}} />
        <button onClick={handleAddEducation}>Add</button>
      </div>

      {/* List and Edit Existing Education Entries */}
      {education.length > 0 ? (
        <ul>
          {education.map((edu) => (
            <li key={education_id_count_map[edu.id]}>
              <h3>{edu.school}</h3>
              <p>Degree: {formatDegree(edu.degree)}</p>
	            <p>Major: {edu.major}</p>
              <p>Start Date: {edu.start_date}</p>
              <p>End Date: {edu.end_date || 'Present'}</p>

              {/* Form for Editing an Existing Entry */}
              <SchoolSelect school={edu.school} onChange={(e) => {handleUpdateChange(education_id_count_map[edu.id], "school", e.value)}} />
              <DegreeSelect degreelevel={edu.degree} onChange={(e) => {handleUpdateChange(education_id_count_map[edu.id], 'degree', e.value)}} />
	            <input type="text" name="major" placeholder="Major" value={edu.major} onchange={(e) => {handleUpdateChange(education_id_count_map[edu.id], e.target.name, e.target.value)}} />
              <input type="date" name="start_date" value={edu.start_date} onChange={(e) => {handleUpdateChange(education_id_count_map[edu.id], e.target.name, e.target.value)}} />
              <input type="date" name="end_date" value={edu.end_date} onChange={(e) => {handleUpdateChange(education_id_count_map[edu.id], e.target.name, e.target.value)}} />
              <button onClick={() => {handleUpdateEducation(edu.id, education[education_id_count_map[edu.id]])}}>Save</button>
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
