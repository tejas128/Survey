import React, { useContext } from 'react'
import Survey from './components/survey/Survey'
import './app.css'
import { AppContext } from './AppContext'
import Welcome from './components/welcome/Welcome'
import ThankYou from './components/thank-you/ThankYou'

function App() {
  const {showThankYou, startSurvey} = useContext(AppContext)

  return (
    <div className='surver-page'>
      {
        !showThankYou && !startSurvey ? <Welcome/> : null
      }
      {
        !showThankYou && startSurvey ? <Survey/> : null
      }
      {
        showThankYou ? <ThankYou/> : null
      }
    </div>
  )
}
    
export default App