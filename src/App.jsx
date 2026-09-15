import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Quiz from "./pages/Quiz";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Delete from "./pages/delete/Delete";
import Level from "./pages/Level";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/quiz/:level" element={<Quiz />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/level" element={<Level />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
