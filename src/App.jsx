import { Route, Routes } from "react-router-dom";
import "./App.css";

import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import userService from "./utils/userService"; 
import { useState } from 'react'

function App() {

const[user, setUser] = useState(userService.getUser())

function handleSignUpOrLogin(){
  setUser(userService.getUser())
}

  return (
    <Routes>
      <Route path="/" element={<h1>Leafy</h1>} />
      <Route path="/signup" element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
