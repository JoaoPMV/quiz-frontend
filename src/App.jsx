import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Quiz from "./pages/Quiz";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Delete from "./pages/delete/Delete";
import Level from "./pages/Level";

function App() {
  const [level, setLevel] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/quiz" element={<Quiz level={level} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/level" element={<Level onSelectLevel={setLevel} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
