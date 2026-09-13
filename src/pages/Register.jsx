import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerFetch } from "../services/userService";
import "./Data.css";
import "./Buttons.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await registerFetch(formData);

      console.log("Sucesso:", result);
      alert("Usuário cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro:", error);
      alert(error?.erro || "Erro ao cadastrar");
    }
  };

  return (
    <div className="dataContainer">
      <form className="dataForm" onSubmit={handleSubmit}>
        <input
          name="firstName"
          type="text"
          placeholder="Primeiro Nome"
          onChange={handleChange}
        />
        <input
          name="lastName"
          type="text"
          placeholder="Sobrenome"
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Senha"
          onChange={handleChange}
        />
        <button type="submit" className="dataButton shortButton">
          Cadastrar
        </button>
      </form>

      <div className="dataNavigation">
        <Link to="/">Fazer login</Link>
        <Link to="/forgot-password">Esqueci minha senha</Link>
      </div>
    </div>
  );
};

export default Register;
