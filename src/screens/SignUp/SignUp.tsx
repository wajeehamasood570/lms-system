import { Box, Button, Paper, TextField, Grid } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Form from "react-bootstrap/Form";
import LMInput from "../../components/LMInput";
import LMSelect from "../../components/LMSelect";
import { fbSigup } from "../../config/FirebaseSetup/firebaseMethods";

const Signup = () => {
  const [model, setModel] = useState<any>({});
  const navigate = useNavigate();

  const roleOptions = ["Admin", "User", "Institute"];

  const fillModel = (key: any, val: any) => {
    model[key] = val;
    setModel({ ...model });
  };

  const signupuser = () => {
    console.log(model);
    fbSigup(model)
      .then((res) => {
        navigate("/login");
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
            <Grid xs={6} className="p-3 signupoption">
              <div className="rightside">
                <h1>Welcome Back</h1>
                <h6
                  style={{
                    lineHeight: "20px",
                    fontSize: "14px",
                    margin: "20px",
                  }}
                >
                  To keep connected with us please login with your personal info
                </h6>

                <Button
                  variant="outlined"
                  className="m-2 bg-transperent"
                  style={{
                    border: "2px solid white",
                  }}
                >
                  <Link
                    style={{
                      color: "white",
                      textDecoration: "none",
                    }}
                    to="/login"
                  >
                    Sign In
                  </Link>
                </Button>
              </div>
            </Grid>

            <Grid xs={6} className="p-3 bg-white">
              <Form className="form-style p-3">
                <h2 style={{ fontSize: "24px" }}>
                Create account for registration

                </h2>
                <Form.Group >
                  <LMInput
                    label="User Name"
                    type="text"
                    onChange={(e: any) => fillModel("username", e)}
                  />
                </Form.Group>
                <Form.Group >
                  <LMInput
                    label="Email"
                    type="email"
                    onChange={(e: any) => fillModel("email", e)}
                  />
                </Form.Group>
                <Form.Group >
                  <LMInput
                    label="Password"
                    type="password"
                    onChange={(e: any) => fillModel("password", e)}
                  />
                </Form.Group>
                <Form.Group >
                  <LMInput
                    label="CNIC"
                    type="number"
                    onChange={(e: any) => fillModel("cnic", e)}
                  />
                </Form.Group>
                <Form.Group  style={{width:"50%"}}>
                  <LMSelect
                    label="role"
                    name="role"
                    options={roleOptions}
                    onChange={(e: any) => fillModel("role", e)}
                  />
                </Form.Group>
                <Button variant="contained" className="bg-danger mt-3" onClick={() => signupuser()}>
                  Sign Up
                </Button>
              </Form>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default Signup;


