import { Box, Button, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Form from 'react-bootstrap/Form';
import LMInput from '../../components/LMInput';
import LMSelect from '../../components/LMSelect';
import { fbSigup } from '../../config/FirebaseSetup/firebaseMethods';

const UserRegister = () => {

  const [model, setModel] = useState<any>({});
  const navigate = useNavigate();

  const roleOptions = ["Admin", "User", "Institute"];

  const fillModel = (key: any, val: any) => {
    model[key] = val;
    setModel({ ...model })
  }




  const signupuser = () => {
    console.log(model);
    fbSigup(model).then((
        res => {navigate("/login")}
    )).catch((err)=>{
        console.log(err)
    })
}



    //   const signupUser = () => {
    //     console.log(model);
    //     navigate(`/login`);
    //   }
    return (
      <>


        
            <Container>
              <h1>User Register</h1>
              <Form>
                <Form.Group className="mb-3">
                  <LMInput
                    label="User Name"
                    type='text'
                    onChange={(e:any) => fillModel("username",e)}


                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <LMInput
                    label="Email"
                    type='email'
                    onChange={(e:any) => fillModel("email", e)}


                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <LMInput
                    label="Password"
                    type='password'
                    onChange={(e:any) => fillModel("password", e)}


                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <LMInput
                    label="CNIC"
                    type='number'
                    onChange={(e:any) => fillModel("cnic", e)}


                  />
                </Form.Group>
                <Form.Group className='mb-3' >
                  <LMSelect
                    label='role'
                    name="role"
                    options={roleOptions}
                    onChange={(e:any) => fillModel("role", e)}


                  />
                </Form.Group>
                <Button  variant='contained' onClick={() => signupuser()}>
                  Register
                </Button>
              </Form>

            </Container>
      </>
    )
  }

  export default UserRegister;