import React, { useState } from "react";

const LoginPage = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de autenticação
    alert(`Usuário: ${usuario}\nSenha: ${senha}`);
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      background: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Poppins, sans-serif",
    }}>
      <div style={{
        width: 324,
        minHeight: 641,
        background: "#fff",
        borderRadius: 10,
        border: "0.5px solid #878787",
        boxShadow: "0px 4px 64px rgba(0, 0, 0, 0.05)",
        padding: 0,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          color: "#000",
          fontSize: 19,
          fontWeight: 300,
          marginBottom: 8,
          fontFamily: "Poppins, sans-serif",
          textAlign: "center",
          width: "100%"
        }}>
          Sistema de Gestão
        </div>
        <div style={{
          color: "#000",
          fontSize: 16,
          fontWeight: 400,
          marginBottom: 24,
          fontFamily: "Poppins, sans-serif",
          textAlign: "center",
          width: "100%"
        }}>
          BARBEARIA VSM
        </div>
        {/* Campo Usuário */}
        <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: "100%", marginBottom: 24, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ color: "#000", fontSize: 16, fontWeight: 400, marginBottom: 8, textAlign: "left", width: 278.84 }}>Usuário</div>
            <input
              type="text"
              placeholder="Digite seu usuário"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              style={{
                width: 278.84,
                height: 59,
                borderRadius: 6,
                border: "0.6px solid #282828",
                background: "#fff",
                color: "#000",
                fontSize: 16,
                fontFamily: "Poppins, sans-serif",
                paddingLeft: 18,
                outline: "none",
                fontWeight: 300,
                boxSizing: "border-box",
                textAlign: "left"
              }}
            />
          </div>
          {/* Campo Senha */}
          <div style={{ width: "100%", marginBottom: 14, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ color: "#000", fontSize: 16, fontWeight: 400, marginBottom: 8, textAlign: "left", width: 278.84 }}>Senha</div>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={{
                width: 278.84,
                height: 59,
                borderRadius: 6,
                border: "0.6px solid #282828",
                background: "#fff",
                color: "#000",
                fontSize: 16,
                fontFamily: "Poppins, sans-serif",
                paddingLeft: 18,
                outline: "none",
                fontWeight: 300,
                boxSizing: "border-box",
                textAlign: "left"
              }}
            />
          </div>
          <div style={{ width: "100%", color: "#4D4D4D", fontSize: 12, fontWeight: 300, cursor: "pointer", marginBottom: 28, textAlign: "center" }}>
            Esqueceu a senha?
          </div>
          {/* Botão Login */}
          <button
            type="submit"
            style={{
              width: 278.84,
              height: 57,
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 16,
              fontWeight: 500,
              fontFamily: "Poppins, sans-serif",
              cursor: "pointer",
              letterSpacing: 1,
              transition: "background 0.2s, color 0.2s",
              marginBottom: 24,
            }}
          >
            Login
          </button>
        </form>
        <div style={{
          color: "#7D7D7D",
          fontSize: 12,
          fontWeight: 700,
          fontFamily: "Poppins, sans-serif",
          cursor: "pointer",
          textAlign: "center",
          width: "100%"
        }}>
          REALIZAR CADASTRO
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 