import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginFetch } from "../services/authService";
import "./Data.css";
import "./Buttons.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const data = await loginFetch(formData);
      localStorage.setItem("token", data.token);
      navigate("/level");
    } catch (err) {
      setErro(err?.erro || err?.message || "Email ou senha inválidos");
    }
  };

  return (
    <div className="dataContainer">
      <form className="dataForm" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="dataButton shortButton">
          Entrar
        </button>

        {erro && <p style={{ color: "red" }}>{erro}</p>}
      </form>

      <div className="dataNavigation">
        <Link to="/register">Criar Usuário</Link>
        <Link to="/forgot-password">Esqueci minha senha</Link>
      </div>
    </div>
  );
};

export default Login;
