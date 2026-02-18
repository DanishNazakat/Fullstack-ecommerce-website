import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignupForm from './containers/signup/signup'
import LoginForm from './containers/loign/login'

function App() {

  return (
    <>
    
      <SignupForm />
      <LoginForm />
    </>
  )
}

export default App
