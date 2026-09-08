import { useState } from "react";
import { forgotPassword } from "../../services/userService";
import "./ForgotPassword.css";

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
    <div className="forgotBox">
      <form className="forgotData" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar link de recuperação</button>
      </form>

      {msg && <p style={{ color: "green" }}>{msg}</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
};

export default ForgotPassword;
