import * as React from 'react';
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { fbGet } from '../../config/FirebaseSetup/firebaseMethods';
import { useNavigate } from 'react-router-dom';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);




export default function Quiz() {
    const [allQuiz, setAllQuiz] = useState<any>([]);

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


    const navigate = useNavigate();

  let getId = (id:any) => {
      navigate(`/user/quiz/${id}`)
  };

    useEffect(() => {
        GetQuiz();
    }, []);
    return (
        <Box>
            <Grid container spacing={2}>
                {allQuiz.map((x: any, i: any) => {
                    return (
                        <> 
                            <Grid item xs={4}>
                                <Card variant="outlined" >
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {x.quizname}
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {x.quizdescription}
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {x.quizduration}
                                        </Typography>
                                        <Button onClick={()=>getId(x.id)}>Start Quiz  </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </>
                    )
                })}

            </Grid>

        </Box>
    );
}