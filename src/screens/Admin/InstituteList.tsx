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
import { Image } from 'react-bootstrap';







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

const InstituteList = () => {

    const [allInstitute, setAllInstitute] = useState<any>([]);
    const [loader, setLoader] = useState<any>(false);
    const [rowData, setRowData] = useState<any>(' ');




    const GetInstitute = () => {
        setLoader(true);
        console.log(allInstitute)
        fbGet("institute")
            .then((res: any) => {
                console.log(res);
                setLoader(false);
                setAllInstitute([...res]);
            })
            .catch((err) => {
                setLoader(true);
                console.log(err);
            });
    };

    const navigate = useNavigate();
    const addInstitute = () =>{
     navigate('/admin/instituteform');
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
        GetInstitute();
    }, []
    );

    return (
        <div>
            <>
                <Button 
                sx={{marginBottom:"10px",
            marginRight:"auto"}}
                variant='contained' type="submit" onClick={()=>addInstitute()}>
                    Add Institute
                </Button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Institute Image</StyledTableCell>
                                <StyledTableCell align="center">Institute Name</StyledTableCell>
                                <StyledTableCell align="center">No. of Campus</StyledTableCell>
                                <StyledTableCell align="center">Contact</StyledTableCell>
                                <StyledTableCell align="center">Edit</StyledTableCell>
                                <StyledTableCell align="center">Remove</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>

                            </TableRow>
                        </TableHead>

                        {loader ? <h2>Loading <br /> No data found</h2> :
                            <>
                                {allInstitute.map((x: any, i: any) => {
                                    return (
                                        <>
                                            <TableBody>
                                                <StyledTableCell align="center"><Image style={{width:"50%", height:"50px",borderRadius:"100px"}} src={x.logoImage} alt="institute logo"/></StyledTableCell>
                                                <StyledTableCell align="center">{x.instituteName}</StyledTableCell>
                                                <StyledTableCell align="center">{x.numOfCampus}</StyledTableCell>
                                                <StyledTableCell align="center">{x.contact}</StyledTableCell>
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
                                                    <Image src={rowData.logoImage} />
                                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                                        Institute Name:{rowData.instituteName}
                                                    </Typography>
                                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                       Location: {rowData.location}
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

export default InstituteList