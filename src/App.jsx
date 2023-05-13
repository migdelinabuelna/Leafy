import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import userService from "./utils/userService"; 
import FeedPage from "./pages/FeedPage/FeedPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useState } from 'react'


function App() {

const[user, setUser] = useState(userService.getUser())

function handleSignUpOrLogin(){
  setUser(userService.getUser())
}

function handleLogout() {
  console.log('LOGGIN OUT')
  userService.logout();
  setUser(null);
}

if (user) {

  return (
    <Routes>
      <Route path="/" element={<FeedPage loggedUser={user} handleLogout={handleLogout}/>} />
      <Route path="/signup" element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      <Route path="/:username" element={<ProfilePage />} />
    </Routes>
  );
}

return (
  <Routes>
      <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      <Route path="/signup" element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      <Route path="/*" element={<Navigate to="/login" />} />
  </Routes>
);



}



export default App;

