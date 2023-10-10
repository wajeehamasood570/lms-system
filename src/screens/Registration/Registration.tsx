import React, { useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
  FormHelperText,
} from '@mui/material';
import { fbAdd } from '../../config/FirebaseSetup/firebaseMethods';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    contact: '',
    cnic: '',
    lastQualification: '',
    course: '',
    institute: '',
    section: '',
    email: '',
    password: '',
    city: '',
    country: '',
    dateOfBirth: '',
    gender: 'male',
    address: '',
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenderChange = (e: any) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    fbAdd("student", formData)
    .then((res: any) => {
        console.log(res);
        // setFormData({""});
    })
    .catch((err) => {
        console.log(err);
    });
  };

  return (
    <Container maxWidth="sm" className='p-4'>
        <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Student Name"
              name="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Father Name"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="CNIC"
              name="cnic"
              value={formData.cnic}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Last Qualification</InputLabel>
              <Select
                label="Last Qualification"
                name="lastQualification"
                value={formData.lastQualification}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="High School">High School</MenuItem>
                <MenuItem value="Bachelor's Degree">Bachelor's Degree</MenuItem>
                <MenuItem value="Master's Degree">Master's Degree</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Course</InputLabel>
              <Select
                label="Course"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="Math">Math</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="History">History</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Institute"
              name="institute"
              value={formData.institute}
              onChange={handleInputChange}
              disabled
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Section</InputLabel>
              <Select
                label="Section"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>City</InputLabel>
              <Select
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="New York">New York</MenuItem>
                <MenuItem value="Los Angeles">Los Angeles</MenuItem>
                <MenuItem value="Chicago">Chicago</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
                <MenuItem value="UK">UK</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup name="gender" value={formData.gender} onChange={handleGenderChange}>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend">Address</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Home"
                name="address"
                value="Home"
                onChange={handleInputChange}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Work"
                name="address"
                value="Work"
                onChange={handleInputChange}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Other"
                name="address"
                value="Other"
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormHelperText>Choose all that apply</FormHelperText>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </form>
    </Container>
  );
};

export default RegistrationForm;
