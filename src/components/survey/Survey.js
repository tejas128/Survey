import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../AppContext'
import questionsData from '../../data/questionsData'


function Survey() {
  const {setShowThankYou} = useContext(AppContext)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [currentAnswer, setCurrentAnswer] = useState(null)
  const [answers, setAnswers] = useState([])
  const [text, setText] = useState('')

  //Setting first question 
  useEffect(() => {
    if(questionsData.length){
      setCurrentQuestion(questionsData[0])
    }
  },[])
  
  //This is handling current question answer, if user submitted answer previously.
  useEffect(() => {
    if(currentQuestion && answers.length){
      const answer = answers.find(ans => ans.questionNo === currentQuestion.no)
      if(answer){
        setCurrentAnswer(answer.answer)
        setText(answer.answer)
      }else{
        setCurrentAnswer(null)
        setText('')
      }
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentQuestion])

  // This fuction will create range for rating inputs base on maxRating value 
  const ratingRange = (end = 5) => {
    var arr = []
    for(let i = 1; i <= end; i++){
      arr.push(i)
    }
    return arr
  }

  //Handling answer storing logic here
  const handleAnswerSelect = (option) => {
    var tempAnswers = [...answers]
    const isPresent = answers.findIndex(ans => ans.questionNo === currentQuestion.no)
    if(isPresent === -1){
      tempAnswers.push({
        questionNo: currentQuestion.no,
        question: currentQuestion.question,
        answer: option
      })
      setAnswers(tempAnswers)
    }else{
      tempAnswers = tempAnswers.filter(ans =>ans.questionNo !== currentQuestion.no )
      tempAnswers.push({
        questionNo: currentQuestion.no,
        question: currentQuestion.question,
        answer: option
      })
      setAnswers(tempAnswers)
    }
    setCurrentAnswer(option)
  }

  //Handling previous button logic here
  const handlePrev = () => {
    if(currentQuestion.type === 'text' && text){ // For text type questions only, To Store answer 
      handleAnswerSelect(text)
    }
    const prevQuestion = currentQuestion.no - 1 
    setCurrentQuestion(questionsData[prevQuestion - 1])

  }

  //Handling next button logic here
  const handleNext = () => {
    if(currentQuestion.type === 'text' && text){ // For text type questions only, To Store answer 
      handleAnswerSelect(text)
    }
    const nextQuestion = currentQuestion.no + 1
    setCurrentQuestion(questionsData[nextQuestion - 1])
  }

  //Handling input change for text type input 
  const handleTextInputChange = (e) => {
    setText(e.target.value)
  }

  //Handling Submit survey
  const handleSubmit = () => {
    localStorage.setItem('isCompleted', 'YES')
    localStorage.setItem('isStarted', false)
    localStorage.setItem('answers', JSON.stringify(answers))
    setShowThankYou(true)

  }

  return (
    <div className='survey-wrapper'>
      {
        currentQuestion ? 
        <div>
          <p className='question'>{currentQuestion.question} ?</p>
          {
            currentQuestion.type === 'rating' ? 
            <div className='options-wrapper'>
              {
                ratingRange(currentQuestion.maxRating).map((option,i) => (
                  <div 
                    key={i} 
                    className={`option ${currentAnswer === option ? 'option-selected': ''}`} 
                    onClick = {() => handleAnswerSelect(option)}
                  >
                    {option}
                  </div>
                ))
              }
            </div>
            :
            <textarea className='text-input' rows={5} maxLength={250} value={text} onChange={handleTextInputChange}></textarea>
          }
          <div className={`buttons-flex ${currentQuestion.no > 1 ? 'flex-between':'flex-end'}`}>
            {
              currentQuestion.no > 1 ? 
                <button className='button' onClick={handlePrev}>
                  Prev
                </button>
                :
                null
            }
            {
              currentQuestion.no < questionsData.length ? 
                <button className='button' onClick={handleNext}>
                  Next
                </button> 
                :
                <button className='button' onClick={handleSubmit}>
                  Submit
                </button> 
            }
          </div>
        </div>
        : 
        null
      }
        
    </div>
  )
}

export default Survey