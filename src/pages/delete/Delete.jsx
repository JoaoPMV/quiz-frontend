import { useNavigate } from "react-router-dom";
import "./Delete.css";

const API_BASE_URL = "http://localhost:5000";

const Delete = () => {
  const navigate = useNavigate();
  const getUserIdFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.user_id;
    } catch {
      return null;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const userId = getUserIdFromToken(token);
      if (!userId) return;

      const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) return;

      localStorage.removeItem("token");
      navigate("/register");
    } catch {
      // sem mensagem na UI
    }
  };

  return (
    <div className="loginBox">
      <form className="loginData" onSubmit={onSubmit}>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};

export default Delete;
