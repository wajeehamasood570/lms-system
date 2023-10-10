import { Box, Button, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Form from 'react-bootstrap/Form';
import LMInput from '../../components/LMInput';
import LMSelect from '../../components/LMSelect';
import { fbLogin } from '../../config/FirebaseSetup/firebaseMethods';

const Login = () => {

  const [model, setModel] = useState<any>({});
  const navigate = useNavigate();

  const roleOptions = ["Admin", "User", "Instructor"];

  const fillModel = (key: any, val: any) => {
    model[key] = val;
    setModel({ ...model })
  }




  const loginUser = () => {
    console.log(model);
    fbLogin(model).then((
      (res: any) => {
        console.log(res);
        if (res.role == "User") {
          navigate("/user")
        }
        else if (res.role == "Institute") {
          navigate("/institute")
        }
        else {
          navigate("/admin")
        }
      }
    )).catch((err) => {
      console.log(err)
    })
  }



    //   const signupUser = () => {
    //     console.log(model);
    //     navigate(`/login`);
    //   }
    return (
      <>


        <Box
          sx={{ height: "100vh" }}
          className="d-flex bg-secondary justify-content-center align-items-center">
          <Paper className="p-4">
            <Container>
              <h1>Login</h1>
              <Form>
                
               
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
                
                {/* <Form.Group>
                  <LMSelect
                    label='role'
                    options={roleOptions}
                    onChange={(e:any) => fillModel("role", e.target.value)}


                  />
                </Form.Group> */}
                <Button variant='contained' onClick={() => loginUser()}>
                  Login
                </Button>
              </Form>

              Not Register? <Link to="/signup">Signup</Link>
            </Container>
          </Paper>
        </Box>





      </>
    )
  }

  export default Login;