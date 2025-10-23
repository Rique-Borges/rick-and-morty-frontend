import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="text-xl font-bold cursor-pointer select-none"
            onClick={() => navigate("/home")}
          >
            Innovitas Test
          </div>

          {/* Links desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/home" className="hover:text-blue-500">
              Home
            </Link>
            <Link to="/personagens" className="hover:text-blue-500">
              Personagens
            </Link>
            {user && (
              <Link to="/meus-personagens" className="hover:text-blue-500">
                Meus Personagens
              </Link>
            )}
          </div>

          {/* Ações */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate("/register")}>
                  Registrar
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8 bg-blue-500 text-white text-sm">
                  <AvatarFallback>{user?.name?.[0] ?? "?"}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{user.name}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  Sair
                </Button>
              </div>
            )}
          </div>

          {/* Menu mobile */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Dropdown mobile */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-neutral-900 border-t">
          <Link to="/home" onClick={() => setOpen(false)} className="block">
            Home
          </Link>
          <Link to="/personagens" onClick={() => setOpen(false)} className="block">
            Personagens
          </Link>
          {user && (
            <Link to="/meus-personagens" onClick={() => setOpen(false)} className="block">
              Meus Personagens
            </Link>
          )}
          <div className="pt-2 border-t">
            {!user ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setOpen(false);
                    navigate("/login");
                  }}
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => {
                    setOpen(false);
                    navigate("/register");
                  }}
                >
                  Registrar
                </Button>
              </>
            ) : (
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Sair
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
