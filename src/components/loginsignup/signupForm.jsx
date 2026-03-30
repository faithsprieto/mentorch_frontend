import React, { useState } from "react";
import { postRequest } from "../../utils/api.js";

// ✅ MUI
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
} from "@mui/material";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    school_email: "",
    student_id: "",
    school_name: "",
    department: "",
    course_program: "",
    year_level: "",
    password: "",
    user_type: 2,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await postRequest("/user/register", formData);

      setSuccess("Registration successful!");

      // Reset form
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
        user_type: 2,
      });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Registration failed. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "grid", gap: 2 }}
        >
          <TextField
            required
            id="first_name"
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            required
            id="last_name"
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            required
            id="school_email"
            label="School Email"
            name="school_email"
            type="email"
            value={formData.school_email}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            required
            id="student_id"
            label="Student ID"
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            required
            id="school_name"
            label="School Name"
            name="school_name"
            value={formData.school_name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            required
            id="department"
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            required
            id="course_program"
            label="Course / Program"
            name="course_program"
            value={formData.course_program}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            required
            id="year_level"
            label="Year Level"
            name="year_level"
            value={formData.year_level}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            required
            id="password"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
          />

          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUpForm;