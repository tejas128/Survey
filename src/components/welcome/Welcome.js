import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'


function Welcome() {
  const {setStartSurvey, isCompleted} = useContext(AppContext)
  const handleStartSurvey = () => {
    setStartSurvey(true)
    localStorage.setItem('isStarted', true)
  }
  return (
    <div className='welcome-wrapper'>
      <h2>Welcome</h2>
      {
        isCompleted ?
        <p className='success'>You already submitted survey !</p>:
        <div className='survey-info'>
          <p>This survey will help us to improve our service.</p>
          <button onClick={handleStartSurvey}>Start Survey</button>
        </div>
      }
    </div>
  )
}

export default Welcome