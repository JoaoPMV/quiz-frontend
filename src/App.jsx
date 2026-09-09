import { BrowserRouter, Route, Routes } from "react-router-dom";
import Quiz from "./pages/quiz/Quiz";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Delete from "./pages/delete/Delete";
import Level from "./pages/level/Level";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/level" element={<Level />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
