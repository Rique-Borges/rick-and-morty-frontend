import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Mail, Lock, Sparkles } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate("/home");
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-primary animate-bounce-gentle" />
            <h1 className="text-3xl font-bold gradient-rm-text">Bem-vindo de volta!</h1>
            <Sparkles className="w-8 h-8 text-primary animate-bounce-gentle" />
          </div>
          <p className="text-muted-foreground">
            Entre na sua conta para continuar explorando o multiverso
          </p>
        </div>

        {/* Login Form */}
        <Card className="glass hover-lift">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Entrar</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    type="email" 
                    placeholder="Seu email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    className="pl-10 hover-glow"
                    required
                  />
                </div>
                
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    type="password" 
                    placeholder="Sua senha" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    className="pl-10 hover-glow"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full gradient-rm hover:shadow-lg hover:scale-105 transition-all duration-200"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Entrando...
                  </div>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Não possui uma conta?{" "}
                <Link 
                  to="/register" 
                  className="text-primary hover:underline font-medium"
                >
                  Criar conta
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="glass">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">
              Ao entrar, você concorda com nossos termos de serviço e política de privacidade
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
