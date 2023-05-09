import { Route, Routes } from "react-router-dom";
import "./App.css";

import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import userService from "./utils/userService"; 
import FeedPage from "./pages/FeedPage/FeedPage";
import { useState } from 'react'


function App() {

const[user, setUser] = useState(userService.getUser())

function handleSignUpOrLogin(){
  setUser(userService.getUser())
}

  return (
    <Routes>
      <Route path="/" element={<FeedPage />} />
      <Route path="/signup" element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      {/* <Route path="/*" element={<Navigate to="/login" />} /> */}
    </Routes>
  );
}

export default App;

