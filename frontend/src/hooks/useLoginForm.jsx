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
        },
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        // Tenta ler a mensagem de erro do backend ou define uma genérica (talvez mudar depois)
        const errorData = await response.json();
        setError(errorData.detail || "Erro ao fazer login");
        return;
      }
      
      navigate("/adminpage");

    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError('Não foi possivel fazer login no momento');
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