import React, { useState } from "react";
import {postRequest} from "../../utils/api.js"
import axios from "axios";
import "../../styles/loginsignup.css"

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    schoolEmail: "",
    schoolID: "",
    schoolName: "",
    department: "",
    course: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Replace with your backend API endpoint
      const response = await postRequest("/api/register", formData);
      console.log("User registered:", response.data);
      setSuccess("Registration successful!");
      setFormData({
        first_name: "",
        last_name: "",
        school_email: "",
        student_id: "",
        school_name: "",
        department: "",
        course_program: "",
        year_level: "",
        password: "",
        user_type: "",
      });
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="container">
    <h2 className="title">Sign Up</h2>

    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
        className="input"
        required
      />

      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        className="input"
        required
      />

      <input
        type="email"
        name="school_email"
        placeholder="School Email"
        value={formData.schoolEmail}
        onChange={handleChange}
        className="input"
        required
      />

      <input
        type="text"
        name="student_id"
        placeholder="Student ID"
        value={formData.student_id}
        onChange={handleChange}
        className="input"
        required
      />

      <input
        type="text"
        name="school_name"
        placeholder="School Name"
        value={formData.schoolName}
        onChange={handleChange}
        className="input"
        required
      />

      <input
        type="text"
        name="department"
        placeholder="College Department"
        value={formData.department}
        onChange={handleChange}
        className="input"
        required
      />

      <input
        type="text"
        name="course_program"
        placeholder="Course / Program"
        value={formData.course_program}
        onChange={handleChange}
        className="input"
        required
      />

      <input
        type="text"
        name="year_level"
        placeholder="Year Level"
        value={formData.year_level}
        onChange={handleChange}
        className="input"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="input"
        required
      />

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <button type="submit" className="button" disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  </div>
);
};

export default SignUpForm;