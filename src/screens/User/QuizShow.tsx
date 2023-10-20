import { useEffect, useState } from 'react'
// import QuizResult from '../Data/QuizResult';
import { fbAdd, fbGet } from '../../config/FirebaseSetup/firebaseMethods';
// import allQuiz from '../Data/allQuiz';
// import Box from '@mui/material/Box';
import Result from './Result/Result'
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';


const Quiz = () => {
  const [allQuiz, setAllQuiz] = useState<any>([]);
  const [loader, setLoader] = useState<any>(false);
  const params = useParams<any>();
  const [Quiz, setQuiz] = useState<any>({});
  const [questionList, setQuestionList] = useState<any>([]);


  const GetQuiz = () => {
    setLoader(true);
    console.log(allQuiz)
    fbGet("quiz")
      .then((res: any) => {
        console.log(res);
        setLoader(false);
        setAllQuiz([...res]);
        const quizMatch = res.find((quiz: any) => quiz.id === params.id);
        console.log(quizMatch);
        if (quizMatch) {
          setQuiz(quizMatch);
        }
        setQuestionList([...quizMatch.questions]);
        console.log(questionList);

      })
      .catch((err) => {
        setLoader(true);
        console.log(err);
      });
  };


  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [clicked, setClicked] = useState(0);
  const [checkAns, setCheckAns] = useState<any>('');
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [saveResult,setSaveResult] = useState<any>({
    quizName:"",
    quizScore: score,
  });
  // const [clickedOption, setClickedOption] = useState<number>(0);

  const updateScore = () => {
    setScore(score + 1);
    console.log("score", score)
  }


  const fillQuizAnswer = (key: string, value: any) => {
    setCheckAns(value);
    updateScore();
  }

  const updateValue = () => {
    console.log(score);
    saveResult.quizName = Quiz.quizname;
    saveResult.score = score;  
    setSaveResult({...saveResult});
    console.log(saveResult);
    // saveResult.score = Quiz.score;
    // setSaveResult({...saveResult})
    // updateScore();
    setShowResult(true);
    fbAdd('Resullt', saveResult)
    .then((res: any) => {
      console.log(res);
    })
      .catch((err) => {
        console.log(err);
      });

  }

  const reset = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClicked(0);
    setScore(0);
    // setClickedOption(0);
  }


  useEffect(() => {
    GetQuiz()
  }, [])
  return (
    <>

      {showResult ? (
        <Result score={score} try={reset} />
      )
        :
        (
          <>
            <div className="container">
              {/* <span>{Quiz.id} </span> */}
              <h1 className='text-center'>{Quiz.quizname}</h1>
              <h4>Description: {Quiz.quizdescription}</h4>
              <h4>Duration: {Quiz.quizduration}</h4>
            </div>



            <div className="container mb-3">
              {questionList.map((question: any, i: number) => {
                return (
                  <div className='mb-3'>
                    <div className='p-3'>
                      <h2 style={{
                        textTransform: "capitalize",
                      }}>  <Button variant='contained' color="success" fullWidth>
                          Question: {question.question}
                        </Button>
                      </h2>
                    </div>


                    {question.option.map((val: any, key: any) => {
                      return (
                        <div className='p-3 mb-3' style={{ display: "flex", flexDirection: "column" }}>
                          <Button variant='contained'
                            key={i}
                            onClick={() => {
                              if (question.correctAnswer !== val) {
                                console.log("wrong answer");
                              }
                              else {
                                updateScore()
                              }
                            }
                            }>
                            {val}
                          </ Button>
                        </div>
                      )
                    }
                    )
                    }
                  </div>
                )
              })}
            </div>
            <input type="button" value="Submit " onClick={updateValue} />
          </>
        )}
    </>
  )
}

export default Quiz