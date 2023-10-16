import React, { useState, useEffect } from 'react'
import { fbGet } from '../../config/FirebaseSetup/firebaseMethods';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Box, Button, Modal, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };




const CourseList = () => {

    const [allCourse, setAllCourse] = useState<any>([]);
    const [loader, setLoader] = useState<any>(false);
    const [rowData, setRowData] = useState<any>(' ');




    const GetCourse = () => {
        setLoader(true);
        console.log(allCourse)
        fbGet("course")
            .then((res: any) => {
                console.log(res);
                setLoader(false);
                setAllCourse([...res]);
            })
            .catch((err) => {
                setLoader(true);
                console.log(err);
            });
    };


    const navigate = useNavigate();
    const addCourse = () => {
        navigate('/institute/courseform');
    }

    const getId = (id: any) => {
        setOpen(true);
        console.log(id);
        console.log(rowData);
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    useEffect(() => {
        GetCourse();
    }, []
    );

    return (
        <div>
            <>
                <Button
                    sx={{
                        marginBottom: "10px",
                        marginRight: "auto"
                    }}
                    variant='contained' type="submit" onClick={() => addCourse()}>
                    Add Course
                </Button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Course Name</StyledTableCell>
                                <StyledTableCell align="center">Duration in mIns</StyledTableCell>
                                <StyledTableCell align="center">Fee</StyledTableCell>
                                <StyledTableCell align="center">Teacher Name</StyledTableCell>
                                <StyledTableCell align="center">Edit</StyledTableCell>
                                <StyledTableCell align="center">Remove</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>

                            </TableRow>
                        </TableHead>

                        {loader ? <h2>Loading <br /> No data found</h2> :
                            <>
                                {allCourse.map((x: any, i: any) => {
                                    return (
                                        <>
                                            <TableBody>
                                                <StyledTableCell align="center">{x.CourseName}</StyledTableCell>
                                                <StyledTableCell align="center">{x.Duration}</StyledTableCell>
                                                <StyledTableCell align="center">{x.Fee}</StyledTableCell>
                                                <StyledTableCell align="center">{x.TeacherName}</StyledTableCell>
                                                <StyledTableCell align="center"><Button>{<EditIcon />}</Button></StyledTableCell>
                                                <StyledTableCell align="center"><Button>{<DeleteIcon />}</Button></StyledTableCell>
                                                <StyledTableCell align="center"><Button onClick={() => {getId(x.id); setRowData(x);}} variant='contained'>Show Details</Button></StyledTableCell>
                                                {/* <StyledTableCell align="center">{x.body}</StyledTableCell> */}
                                            </TableBody>


                                            {/* // Modal */}
                                            <Modal
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                                        Course Name:{rowData.CourseName}
                                                    </Typography>
                                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                       Teacher Name: {rowData.TeacherName}
                                                    </Typography>
                                                </Box>
                                            </Modal>
                                        </>
                                    )

                                })}
                            </>
                        }

                    </Table>
                </TableContainer>
            </></div>
    )
}

export default CourseList