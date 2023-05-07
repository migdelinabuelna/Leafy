import { Route, Routes } from "react-router-dom";
import "./App.css";

import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Leafy</h1>} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
