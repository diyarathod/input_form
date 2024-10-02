import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [inputFields, setInputFields] = useState([{ name: '', email: '', pno: '', isAbove18: false, aadhaar: '', pan: '' }]);

  // Handle input changes for name, email, and phone number
  const handleInputChange = (index, event, fieldName) => {
    const values = [...inputFields];
    values[index][fieldName] = event.target.value;
    setInputFields(values);
  };

  // Handle dropdown change for whether the user is above 18
  const handleSelectChange = (index, event) => {
    const values = [...inputFields];
    values[index].isAbove18 = event.target.value === "Yes"; // Set true if "Yes" is selected, false otherwise
    setInputFields(values);
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission behavior

    const isFormValid = inputFields.every((inputField) => {
      const { name, email, pno, isAbove18, aadhaar, pan } = inputField;


      if (!name || !email || !pno) return false;
      if (pno !== 10) return false;
      if (isAbove18 && (!aadhaar || !pan)) return false;

      return true;
    });

    if (isFormValid) {
      alert("Form submitted successfully!");
    } else {
      alert("Form submission unsuccessful. Please fill all required fields.");
    }
  };



  return (
    <div className="form">
      <div className="title">Welcome</div>
      <div className="subtitle">Enter Your Details</div>
      {inputFields.map((inputField, index) => (
        <div key={index}>
          <div className="input-container ic1">
            <label className="lab"> Name</label>
            <input type="text" id="name" className="input"
              value={inputField.name}
              onChange={(e) => handleInputChange(index, e, 'name')}
            />
          </div>
          <div className="input-container ic2">
            <label className="lab">Email</label>
            <input type="email" id="email" className="input"
              value={inputField.email}
              onChange={(e) => handleInputChange(index, e, 'email')} />
          </div>
          <div className="input-container ic2">
            <label className="lab">Phone Number</label>
            <input type="text" id="pno" className="input"
              maxLength={10}
              value={inputField.pno}
              onChange={(e) => handleInputChange(index, e, 'pno')} />
          </div>

          <label className="lab">Are You 18 Above?</label>
          <select
            className="input select-input"
            value={inputField.isAbove18 ? "Yes" : "No"}
            onChange={(e) => handleSelectChange(index, e)}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          {/* Conditionally render Aadhaar and pan fields only if 18+ */}
          {inputField.isAbove18 && (
            <>
              <div className="input-container ic2">
                <label className="lab">Aadhaar Number</label>
                <input type="text" id="aadhaar" className="input"
                  value={inputField.aadhaar}
                  onChange={(e) => handleInputChange(index, e, 'aadhaar')} />
              </div>
              <div className="input-container ic2">
                <label className="lab">Pan Number</label>
                <input type="text" id="pan" className="input"
                  value={inputField.pan}
                  onChange={(e) => handleInputChange(index, e, 'pan')} />
              </div>
            </>
          )}
        </div>
      ))}
      <br></br>
      <button type="text" className="submit" onClick={handleSubmit}>Submit</button>
    </div >
  );
};

export default App;
