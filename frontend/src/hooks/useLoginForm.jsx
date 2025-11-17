import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    console.log("Dados submetidos para login:", { email, password });

    setTimeout(() => {
      if (email === "gestor@siged.com" && password === "12345") {
        console.log("Login bem-sucedido!");
        navigate("/adminpage");
      } else {
        setError("Credenciais inválidas. Tente novamente.");
      }
      setIsLoading(false);
    }, 1500);
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
