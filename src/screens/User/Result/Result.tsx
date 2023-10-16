type ResultType = {
  score:number,
  try:any,
}
const QuizResult = (props:ResultType) => {
return (
  <>
  <h2>Result</h2>
  <p>Your Score: {props.score} </p>
  <button onClick={props.try}>Try Again</button>
  </>
)
}

export default QuizResult