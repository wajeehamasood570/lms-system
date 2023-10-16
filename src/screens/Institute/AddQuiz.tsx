import { Avatar, Container, Grid, IconButton, MenuItem } from "@mui/material"
import { styled } from '@mui/material/styles';
import { Box, Button, Paper, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fbAdd, fbGet } from "../../config/FirebaseSetup/firebaseMethods";



const AddQuiz = () => {

    const [quizList, setQuizList] = useState<any>({});
    const [disabled, setDisabled] = useState<any>(false);
    const [quizModel, setquizModel] = useState<any>({});
    const [questionModel, setquestionModel] = useState<any>({});
    const [optionsList, setoptionsList] = useState<any>([]);
    const [option, setOption] = useState<any>('');
    const [correctOption, setCorrectOption] = useState<any>('');
    const [allQuiz, setAllQuiz] = useState<any>([]);
    const [question, setQuestion] = useState<any>([]);



    const navigate = useNavigate();


    const fillQuizDetails = (key: any, val: any) => {
        quizModel[key] = val;
        setquizModel({ ...quizModel })
    }


    const fillQuestionsDetails = (key: any, val: any) => {
        questionModel[key] = val;
        setquestionModel({ ...questionModel })
    }

    const lockquiz = () => {
        setDisabled(!disabled);
        console.log(quizModel);

    }

    const AddQuiz = () => {
        console.log(quizModel);
        quizModel.questions = [...question];
        fbAdd("quiz", quizModel)
            .then((res: any) => {
                console.log(res);
                setquizModel({});
            })
            .catch((err) => {
                console.log(err);
            });
        GetQuiz();
        // setModel({});
        // setDisabled(false);
    };


    //     console.log(question);
    //     fbAdd("question", question)
    //         .then((res: any) => {
    //             console.log(res);
    //             // setQuestion({});
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    //     GetQuestion();
    //     // setQuestion({});
    //     // setDisabled(false);
    // };

    const GetQuiz = () => {
        console.log(allQuiz)
        fbGet("quiz")
            .then((res: any) => {
                console.log(res);
                setAllQuiz([...res]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const AddOption = () => {
        optionsList.push(option)
        setoptionsList([...optionsList]);
        setOption('')

    }


    //     console.log(question)
    //     fbGet("question")
    //         .then((res: any) => {
    //             console.log(res);
    //             setQuestion([...res]);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };
    const addquestion = () => {
        questionModel.option = [...optionsList];
        questionModel.correctAnswer = correctOption;
        question.push(questionModel);
        setQuestion([...question])
        setquestionModel({});
        setCorrectOption('');
        setoptionsList([]);
        console.log(question);
    }

    useEffect(() => {
        GetQuiz();
    }, []);

    return (
        <div>

            <Container className="my-5">
                <Grid container spacing={2}>

                    <Grid item xs={12} >

                        <Box
                            sx={{ height: "100vh", width: "100%" }}
                            className="d-flex bg-secondary">
                            <Paper className="p-4 w-100 m-1">
                                <div className="d-flex">
                                    <Grid container spacing={2}>
                                        <Grid item xs={8} >

                                            <h2>Quiz App</h2>
                                        </Grid>

                                        <Grid item xs={4} >
                                            <Button variant="contained" className="mx-5"
                                                onClick={() => AddQuiz()}>Save Quiz</Button>
                                        </Grid>
                                    </Grid>
                                </div>
                                <Grid container spacing={2}>
                                    <Grid item xs={4} >
                                        <Box className="p-1">
                                            <TextField
                                                disabled={disabled}
                                                onChange={(e) => fillQuizDetails("quizname", e.target.value)}
                                                variant='standard'
                                                type='quizname'
                                                label="Quiz Name"
                                                value={quizModel.quizname}
                                            />
                                        </Box>
                                    </Grid>

                                    <Grid item xs={4} >
                                        <Box className="p-1">
                                            <TextField
                                                disabled={disabled}
                                                onChange={(e) => fillQuizDetails("quizduration", e.target.value)}
                                                variant='standard'
                                                type='quizduration'
                                                label="Quiz Duration In Min"
                                                value={quizModel.quizduration}
                                            />
                                        </Box>
                                    </Grid>


                                    <Grid item xs={4} >
                                        <Box className="p-1">
                                            <TextField
                                                disabled={disabled}
                                                onChange={(e) => fillQuizDetails("secretkey", e.target.value)}
                                                variant='standard'
                                                type='secretkey'
                                                label="Secret key"
                                                value={quizModel.secretkey}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>


                                <Grid container spacing={2}>
                                    <Grid item xs={4} >
                                        <Box className="p-1">
                                            <TextField
                                                disabled={disabled}
                                                onChange={(e) => fillQuizDetails("quizopen", e.target.value)}
                                                variant='standard'
                                                type='quizopen'
                                                label="Quiz Open"
                                                value={quizModel.quizopen}
                                            />
                                        </Box>
                                    </Grid>

                                    <Grid item xs={8} >
                                        <Box className="p-1">
                                            <TextField fullWidth
                                                disabled={disabled}
                                                onChange={(e) => fillQuizDetails("quizdescription", e.target.value)}
                                                variant='standard'
                                                type='quizdescription'
                                                label="Quiz Description"
                                                value={quizModel.quizdescription}

                                            />
                                        </Box>
                                    </Grid>
                                </Grid>



                                <Button variant="contained" className="my-4"
                                    onClick={() => lockquiz()}>Lock Quiz</Button>



                                <Box className="p-1">
                                    <TextField fullWidth
                                        onChange={(e) => fillQuestionsDetails("question", e.target.value)}
                                        variant='standard'
                                        type='question'
                                        label="Question"
                                        value={questionModel.question}
                                    />
                                </Box>

                                <Grid container spacing={2}>
                                    <Grid item xs={10} >
                                        <Box className="p-1">
                                            <TextField fullWidth
                                                onChange={(e) => setOption(e.target.value)}
                                                variant='standard'
                                                type='option'
                                                label="option"
                                                value={option}
                                            />
                                        </Box>
                                    </Grid>


                                    <Grid item xs={2} >
                                        <Button variant="contained" className="my-4"
                                            onClick={() => AddOption()}>Add</Button>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid md={8}>
                                        {optionsList.map((x: any, i: any) => {
                                            return (
                                                <>
                                                    <p onClick={() => setCorrectOption(x)}>{x}</p>
                                                </>
                                            )
                                        })}
                                    </Grid>

                                    <Grid md={4}>
                                        <Button>{correctOption}</Button>
                                    </Grid>
                                </Grid>




                                <Button onClick={() => addquestion()}>Add Question</Button>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>

            </Container>
        </div>
    )
}

export default AddQuiz