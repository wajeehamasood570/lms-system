
import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { fbAdd } from '../../config/FirebaseSetup/firebaseMethods';

const CourseForm = () => {
    const [formData, setFormData] = useState({
        CourseName: '',
        Duration: 30,
        Fee: 0,
        TeacherName: '',
    });


    const handleInputChange = (
        e: any
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };





    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        fbAdd("course", formData)
            .then((res: any) => {
                console.log(res);
                // setFormData({""});
            })
            .catch((err) => {
                console.log(err);
            });
        // GetQuiz();
        // Handle form submission here
    };

    return (
        <Container className='p-5'>
            <h1>Course Form</h1>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col className='mb-3'>
                        <TextField
                            className='mb-3'
                            label="Course Name"
                            name="CourseName"
                            variant="outlined"
                            fullWidth
                            value={formData.CourseName}
                            onChange={handleInputChange}
                            required
                        />
                    </Col>
                    <Col className='mb-3'>
                        <TextField
                            label="Duration"
                            name="Duration"
                            type='number'
                            variant="outlined"
                            fullWidth
                            value={formData.Duration}
                            onChange={handleInputChange}
                        />
                    </Col>
                </Row>
                <Row>



                    <Col className='mb-3'>
                        <TextField
                            label="Fee"
                            name="Fee"
                            type="number"
                            variant="outlined"
                            fullWidth
                            value={formData.Fee}
                            onChange={handleInputChange}
                        />
                    </Col>


                    <Col className='mb-3'>
                        <TextField
                            label="TeacherName"
                            name="TeacherName"
                            variant="outlined"
                            fullWidth
                            value={formData.TeacherName}
                            onChange={handleInputChange}
                        />
                    </Col>
                </Row>

               
                <Button variant="primary" type="submit" size='lg' className='mt-3'>
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default CourseForm;
