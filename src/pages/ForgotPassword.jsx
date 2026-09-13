import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/userService";
import "./Buttons.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErro("");

    try {
      const data = await forgotPassword(email);
      setMsg(data.mensagem || "Se o email existir, você receberá instruções");
    } catch (err) {
      setErro(err?.erro || err?.message || "Erro ao solicitar recuperação");
    }
  };

  return (
    <div className="dataContainer">
      <p>Você receberá em seu email um link para redefinir a sua senha</p>
      <form className="dataForm" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="dataButton shortButton">
          Enviar Link
        </button>
      </form>

      <div className="dataNavigation">
        <Link to="/">Fazer login</Link>
        <Link to="/register">Criar Usuário</Link>
      </div>

      {msg && <p style={{ color: "green" }}>{msg}</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
};

export default ForgotPassword;
