import React, { useState } from 'react'

export const AppContext = React.createContext()
const isStarted = localStorage.getItem('isStarted') === 'true'? true:false;
const surveyCompleted = localStorage.getItem('isCompleted') === 'YES'? true:false;

function AppProvider({children}) {
    const [showThankYou, setShowThankYou] = useState(false)
    const [isCompleted, setIsCompleted] = useState(surveyCompleted)
    const [startSurvey, setStartSurvey ] = useState(isStarted)
  return (
    <AppContext.Provider value={{showThankYou, setShowThankYou, startSurvey, setStartSurvey, isCompleted, setIsCompleted}}>
        {children}
    </AppContext.Provider>
  )
}

export default AppProvider