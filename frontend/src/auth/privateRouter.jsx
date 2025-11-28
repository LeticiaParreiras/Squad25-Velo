import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext"; // Importe do passo anterior

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; 
  }

  // commente essas linhas para desativar a autenticação
<<<<<<< HEAD
   /* if (!user) {
    return <Navigate to="/" replace />;
  } */
=======
  if (!user) {
    return <Navigate to="/" replace />;
  }
>>>>>>> e6e0ff05f6449309ac2dfe4cb8a263a65fe9debe
  //
  return <Outlet />;
};

export default PrivateRoute;