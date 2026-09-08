import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginFetch } from "../../services/authService";
import "./Login.css";

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
      navigate("/quiz");
    } catch (err) {
      setErro(err?.erro || err?.message || "Email ou senha inválidos");
    }
  };

  return (
    <div className="loginBox">
      <form className="loginData" onSubmit={handleSubmit}>
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

        <button type="submit">Entrar</button>

        <p style={{ marginTop: "10px" }}>
          <Link to="/forgot-password">Esqueci minha senha</Link>
        </p>

        {erro && <p style={{ color: "red" }}>{erro}</p>}
      </form>
    </div>
  );
};

export default Login;
