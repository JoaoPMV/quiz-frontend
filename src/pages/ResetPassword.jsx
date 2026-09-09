import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/userService";
import "./Data.css";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token") || "";
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErro("");

    try {
      const data = await resetPassword(token, newPassword);
      setMsg(data.mensagem || "Senha redefinida com sucesso");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setErro(err?.erro || err?.message || "Erro ao redefinir senha");
    }
  };

  if (!token) {
    return <p>Token inválido ou ausente.</p>;
  }

  return (
    <div className="dataContainer">
      <form className="dataForm" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nova senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Redefinir senha</button>
      </form>

      {msg && <p style={{ color: "green" }}>{msg}</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
};

export default ResetPassword;
