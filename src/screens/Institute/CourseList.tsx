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
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));




const CourseList = () => {

    const [allCourse, setAllCourse] = useState<any>([]);
    const [loader, setLoader] = useState<any>(false);



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


    useEffect(() => {
        GetCourse();
    }, []
    );

    return (
        <div>
            <>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Course Name</StyledTableCell>
                                <StyledTableCell align="center">Duration in mIns</StyledTableCell>
                                <StyledTableCell align="center">Fee</StyledTableCell>
                                <StyledTableCell align="center">Teacher Name</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>

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
                                                {/* <StyledTableCell align="center">{x.body}</StyledTableCell> */}
                                            </TableBody>
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