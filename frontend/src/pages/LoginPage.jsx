import React from "react";
import LoginForm from "../components/ScriptsLoginPage/LoginForm";
import { useAuth } from "../auth/authContext";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const { user } = useAuth();

  if (user){
    return <Navigate to='/adminpage'/>
  }
  return (
    <>
      <LoginForm />
    </>
  );
}
