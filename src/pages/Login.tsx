import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    await login(email, password);
    navigate("/home");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-lg rounded-lg w-96 space-y-4">
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
        <Button type="submit" className="w-full">Entrar</Button>
        <p className="text-sm text-center mt-2">
                Não possui uma conta?{" "}
                <Link to="/register" className="underline">
                  Registrar
                </Link>
              </p>
      </form>
      
    </div>
  );
}
