import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Form from "react-bootstrap/Form";
import LMInput from "../../components/LMInput";
import LMSelect from "../../components/LMSelect";
import { fbLogin } from "../../config/FirebaseSetup/firebaseMethods";
import "./Login.css";

const Login = () => {
  const [model, setModel] = useState<any>({});
  const navigate = useNavigate();

  const roleOptions = ["Admin", "User", "Instructor"];

  const fillModel = (key: any, val: any) => {
    model[key] = val;
    setModel({ ...model });
  };

  const loginUser = () => {
    console.log(model);
    fbLogin(model)
      .then((res: any) => {
        console.log(res);
        if (res.role == "User") {
          navigate("/user");
        } else if (res.role == "Institute") {
          navigate("/institute");
        } else {
          navigate("/admin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   const signupUser = () => {
  //     console.log(model);
  //     navigate(`/login`);
  //   }
  return (
    <>
      <Box
        sx={{ height: "100vh", background: "#f6f5f7" }}
        className="d-flex  justify-content-center align-items-center"
      >
        <Paper>
          <Grid container spacing={2}>
            <Grid xs={6} className="p-3 bg-white">
              <Form className="form-style p-3">
                <h2 style={{ fontSize: "24px" }}>
                  Sign In To Use Your Account
                </h2>
                <Form.Group className="mb-3" style={{ border: "none" }}>
                  <LMInput
                    label="Email"
                    type="email"
                    onChange={(e: any) => fillModel("email", e)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <LMInput
                    label="Password"
                    type="password"
                    onChange={(e: any) => fillModel("password", e)}
                  />
                </Form.Group>

                {/* <Form.Group>
                  <LMSelect
                    label='role'
                    options={roleOptions}
                    onChange={(e:any) => fillModel("role", e.target.value)}


                  />
                </Form.Group> */}
                <Button
                  variant="contained"
                  className="m-2 bg-danger"
                  onClick={() => loginUser()}
                >
                  Login
                </Button>
              </Form>
            </Grid>

            <Grid xs={6} className="p-3 signupoption">
              <div className="rightside">
                <h1>Hello, Friend!</h1>
                <h6
                  style={{
                    lineHeight: "20px",
                    fontSize: "14px",
                    margin: "20px",
                  }}
                >
                  Enter your personal details and start journey with us
                </h6>

                <Button
                  variant="outlined"
                  className="m-2 bg-transperent"style={{
                    border:"2px solid white"
                  }}
                 
                >
                  <Link  style={{
                    color: "white",
                    textDecoration: "none",
                    
                  }}
                  to="/signup">Sign Up</Link>
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
