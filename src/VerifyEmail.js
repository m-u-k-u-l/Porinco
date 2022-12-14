import {useState, useEffect} from 'react'
import {auth} from './firebase'
import {sendEmailVerification} from 'firebase/auth'

const [buttonDisabled, setButtonDisabled] = useState(false)
const [time, setTime] = useState(60)
const [timeActive, setTimeActive] = useState(false)

useEffect(() => {
    let interval = null
    if(timeActive && time !== 0 ){
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    }else if(time === 0){
      setTimeActive(false)
      setTime(60)
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [timeActive, time])

const resendEmailVerification = () => {
    setButtonDisabled(true)
    sendEmailVerification(auth.currentUser)
    .then(() => {
      setButtonDisabled(false)
    }).catch((err) => {
      alert(err.message)
      setButtonDisabled(false)
    })
  }