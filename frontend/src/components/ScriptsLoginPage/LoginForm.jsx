import React from "react";
import useLoginForm from "../../hooks/useLoginForm";
import "../../assets/styles/login.css";

const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    isLoading,
    error,
  } = useLoginForm();

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Velo Escolas</h1>
        

        <form onSubmit={handleSubmit}>
          {error && (
            <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>
          )}

          <div className="form-group">
            <label className="login-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label className="login-label" htmlFor="password">
              Senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="forgot-password">
            <a href="" className="login-link">
              Esqueci minha senha
            </a>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="login-footer">
          &copy; 2025 Velo Tecnologia Educacional – Todos os direitos reservados
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
