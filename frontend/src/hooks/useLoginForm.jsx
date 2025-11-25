import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // tranformando para o padrão oauth2
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      // trocar a url para o endereço do backend
      // talver criar hooks para uma melhor escalabilidade
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "credentials": "include",
        },
        body: formData,
      });

      if (!response.ok) {
        // Tenta ler a mensagem de erro do backend ou define uma genérica (talvez mudar depois)
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Email ou senha incorretos");
      }

      const data = await response.json();
      console.log(data);

      // Salva o usuario no localStorage e redireciona
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/adminpage");

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    isLoading,
    error,
  };
};

export default useLoginForm;