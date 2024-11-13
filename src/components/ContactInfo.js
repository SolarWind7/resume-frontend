// src/components/ContactInfo.js

import React, { useState, useEffect } from 'react';
import api from '../api';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
//import { parsePhoneNumberFromString } from 'libphonenumber-js';

function ContactInfo() {
  const [contactInfo, setContactInfo] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    linkedin: '',
    github: '',
  });

  useEffect(() => {
    api.get('/resume/contactinfo/')
      .then(response => {
          if (response.data != null && response.data.length > 0)
            setContactInfo(response.data[0]);
      })
      .catch(error => console.error("Error fetching contact info:", error));
  }, []);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  const setPhoneNumber = (phone) => {
    setContactInfo({ ...contactInfo, ['phone']: `+${phone}`});
  };

  const handleSaveContactInfo = () => {
  if (contactInfo.id == '') {
	    api.post('/resume/contactinfo/', contactInfo)
		.then(response => setContactInfo(response.data[0]))
		.catch(error => {
			console.error("Error Details:", error.response?.data); // This will show field-specific errors
		});
  	}
	else {
//	    console.log(contactInfo);
            api.put(`/resume/contactinfo/${contactInfo.id}/`, contactInfo)
                .then(response => setContactInfo(response.data))
                .catch(error => {
                        console.error("Error Details:", error.response?.data); // This w>
                });
	}
  };

  return (
    <div>
      <h2>Contact Information</h2>
      <input
        type="text"
        name="name"
        value={contactInfo.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={contactInfo.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <PhoneInput
	country={'us'}
        value={contactInfo.phone}
        onChange={(phone) => setPhoneNumber(phone)}
        enableSearch
      />
      <input
        type="text"
        name="linkedin"
        value={contactInfo.linkedin}
        onChange={handleInputChange}
        placeholder="LinkedIn"
      />
      <input
        type="text"
        name="github"
        value={contactInfo.github}
        onChange={handleInputChange}
        placeholder="GitHub"
      />

      <button onClick={handleSaveContactInfo}>Save</button>
    </div>
  );
}

export default ContactInfo;
