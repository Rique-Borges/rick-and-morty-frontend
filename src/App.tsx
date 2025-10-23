import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./routes/PrivateRoutes.tsx";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Personagens from "./pages/Personagens";
import PersonagemDetalhe from "./pages/PersonagemDetalhe";
import MeusPersonagens from "./pages/MeusPersonagens";
import { AppLayout } from "./layout/AppLayout";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas com layout global */}
          <Route
            path="/home"
            element={
              <AppLayout>
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              </AppLayout>
            }
          />
          <Route
            path="/personagens"
            element={
              <AppLayout>
                <Personagens />
              </AppLayout>
            }
          />
          <Route
            path="/personagens/:id"
            element={
              <AppLayout>
                <PersonagemDetalhe />
              </AppLayout>
            }
          />
          <Route
            path="/meus-personagens"
            element={
              <AppLayout>
                <PrivateRoute>
                  <MeusPersonagens />
                </PrivateRoute>
              </AppLayout>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
