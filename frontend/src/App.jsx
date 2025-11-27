import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/App.css";
import { AuthProvider } from "./auth/authContext.jsx";
import PrivateRoute from "./auth/privateRouter.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          
          <Route element={<PrivateRoute />}>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/adminpage/*" element={<AdminPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
