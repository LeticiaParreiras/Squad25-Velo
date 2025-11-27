import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext"; // Importe do passo anterior

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; 
  }

  // commente essas linhas para desativar a autenticação
  // if (!user) {
    // return <Navigate to="/" replace />;
  //}
  //
  return <Outlet />;
};

export default PrivateRoute;