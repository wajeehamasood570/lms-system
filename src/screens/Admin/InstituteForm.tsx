import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { fbAdd } from '../../config/FirebaseSetup/firebaseMethods';
import { imgDB } from "../../config/FirebaseSetup/firebaseConfig";
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { addDoc, collection, getDocs } from "firebase/firestore";

const InstituteForm = () => {
    const [formData, setFormData] = useState({
        instituteName: '',
        shortName: '',
        logoImage: {},
        numOfCampus: 0,
        campusDetails: [''],
        location: '',
        address: '',
        contact: '',
        ownerContact: '',
        ownerEmail: '',
        userType: 'Institute',
        instituteType: '',
    });
    const [image, setimage] = useState('');


    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };





    const handleLogoImageChange = (e: any) => {
        console.log(e.target.files[0]);
        const imgs = ref(imgDB, `Imgs/${v4()}`)
        uploadBytes(imgs, e.target.files[0]).then(res => {
            console.log(res, "imgs")
            getDownloadURL(res.ref).then(val => {
                setimage(val);
                console.log(val);
                formData.logoImage = image;
                setFormData({ ...formData });
            })
        })

    };

    const handleCampusDetailChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
         const updatedCampusDetails = [...formData.campusDetails];
        updatedCampusDetails[parseInt(e.target.name)] = e.target.value;
        setFormData({
            ...formData,
            campusDetails: updatedCampusDetails,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        fbAdd("institute", formData)
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
            <h1>Institute Form</h1>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col className='mb-3'>
                        <TextField
                            className='mb-3'
                            label="Institute Name"
                            name="instituteName"
                            variant="outlined"
                            fullWidth
                            value={formData.instituteName}
                            onChange={handleInputChange}
                            required
                        />
                    </Col>
                    <Col className='mb-3'>
                        <TextField
                            label="Short Name"
                            name="shortName"
                            variant="outlined"
                            fullWidth
                            value={formData.shortName}
                            onChange={handleInputChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className='mb-3'>
                        <TextField
                            label="Logo Image"
                            name=''
                            variant="outlined"
                            type='file'
                            fullWidth
                            // value={formData.logoImage}
                            onChange={(e) => handleLogoImageChange(e)}
                        />
                    </Col>
                    <Col className='mb-3'>
                        <TextField
                            label="Number of Campus"
                            name="numOfCampus"
                            type="number"
                            variant="outlined"
                            fullWidth
                            value={formData.numOfCampus}
                            onChange={handleInputChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className='mb-3'>
                        <TextField
                            label="Location"
                            name="location"
                            variant="outlined"
                            fullWidth
                            value={formData.location}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col className='mb-3'>
                        <TextField
                            label="Address"
                            name="address"
                            variant="outlined"
                            fullWidth
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className='mb-3'>
                        <TextField
                            label="Contact"
                            name="contact"
                            variant="outlined"
                            fullWidth
                            value={formData.contact}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col className='mb-3'>
                        <TextField
                            label="Owner Contact"
                            name="ownerContact"
                            variant="outlined"
                            fullWidth
                            value={formData.ownerContact}
                            onChange={handleInputChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className='mb-3'>
                        <TextField
                            label="Owner Email"
                            name="ownerEmail"
                            type="email"
                            variant="outlined"
                            fullWidth
                            value={formData.ownerEmail}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col className='mb-3'>
                        <TextField
                            label="User Type"
                            name="userType"
                            variant="outlined"
                            select
                            fullWidth
                            value={formData.userType}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="Institute">Institute</MenuItem>
                        </TextField>
                    </Col>
                </Row>
                <Row>
                    <Col className='mb-3'>
                        <TextField
                            label="Institute Type"
                            name="instituteType"
                            variant="outlined"
                            select
                            fullWidth
                            value={formData.instituteType}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="School">School</MenuItem>
                            <MenuItem value="College">College</MenuItem>
                            <MenuItem value="University">University</MenuItem>
                            <MenuItem value="Institute">Institute</MenuItem>
                        </TextField>
                    </Col>
                </Row>
                <h2>Campus Details</h2>
                {Array.from({ length: formData.numOfCampus }).map((_, index) => (
                    <TextField
                        key={index}
                        label={`Campus ${index + 1}`}
                        name={index.toString()}
                        variant="outlined"
                        fullWidth
                        value={formData.campusDetails[index]}
                        onChange={handleCampusDetailChange}
                        className='mb-3'
                    />
                ))}
                <Button variant="primary" type="submit" size='lg' className='mt-3'>
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default InstituteForm;
