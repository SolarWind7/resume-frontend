// src/components/ContactInfo.js

import React, { useState, useEffect } from 'react';
import api from '../api';

function SelfIntro() {
  const [selfIntro, setSelfIntro] = useState({
    id: '',
    intro: '',
  });

  useEffect(() => {
    api.get('/resume/selfintro/')
      .then(response => {
          if (response.data != null && response.data.length > 0)
            setSelfIntro(response.data[0]);
      })
      .catch(error => console.error("Error fetching contact info:", error));
  }, []);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setSelfIntro({ ...selfIntro, [name]: value });
  };

  const handleSaveSelfIntro = () => {
  if (selfIntro.id == '' || selfIntro.id == null) {
	    api.post('/resume/selfintro/', selfIntro)
		.then(response => setSelfIntro(response.data))
		.catch(error => {
			console.error("Error Details:", error.response?.data); // This will show field-specific errors
		});
  	}
	else {
//	    console.log(contactInfo);
            api.put(`/resume/selfintro/${selfIntro.id}/`, selfIntro)
                .then(response => setSelfIntro(response.data))
                .catch(error => {
                        console.error("Error Details:", error.response?.data); // This w>
                });
	}
  };

  return (
    <div>
      <h2>Self Summary/Introduction</h2>
      <textarea
        name="intro"
        value={selfIntro.intro}
        onChange={handleInputChange}
        placeholder="Self Summary/Introduction"
      />
      <button onClick={handleSaveSelfIntro}>Save</button>
    </div>
  );
}

export default SelfIntro;
