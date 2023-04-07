import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../AppContext'

function ThankYou() {
  const {setShowThankYou, setStartSurvey, setIsCompleted} = useContext(AppContext)
  useEffect(() => {
    var timeOut = setTimeout(() => {
      setStartSurvey(false)
      setIsCompleted(true)
      setShowThankYou(false)
    }, 5000)
    return () => clearTimeout(timeOut)
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div className='thank-you-wrapper'>
      <h2>Thank You</h2>
      <p className='success'>You successully completed survey !</p>
    </div>
  )
}

export default ThankYou