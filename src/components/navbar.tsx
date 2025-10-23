import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, X, Home, Users, Heart, LogOut, UserPlus, LogIn } from "lucide-react";
import { useState } from "react";
import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/home", label: "Home", icon: Home },
    { path: "/personagens", label: "Personagens", icon: Users },
    ...(user ? [{ path: "/meus-personagens", label: "Meus Personagens", icon: Heart }] : []),
  ];

  return (
    <nav className="w-full glass border-b border-border/50 backdrop-blur-md sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer select-none group"
            onClick={() => navigate("/home")}
          >
            <div className="w-8 h-8 gradient-rm rounded-lg flex items-center justify-center text-white font-bold text-sm animate-pulse-glow">
              R&M
            </div>
            <span className="text-xl font-bold gradient-rm-text group-hover:scale-105 transition-transform duration-200">
              Rick & Morty
            </span>
          </div>

          {/* Links desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover-lift ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User actions */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate("/login")}
                  className="hover-glow"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => navigate("/register")}
                  className="gradient-rm hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Registrar
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
                  <Avatar className="w-8 h-8 gradient-rm text-white text-sm">
                    <AvatarFallback>{user?.name?.[0] ?? "?"}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="hover-glow"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setOpen(!open)}
              className="hover-glow"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      } overflow-hidden`}>
        <div className="px-4 pb-4 space-y-2 bg-card/50 backdrop-blur-md border-t border-border/50">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover-lift ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
          
          <div className="pt-4 border-t border-border/50 space-y-2">
            {!user ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full hover-glow"
                  onClick={() => {
                    setOpen(false);
                    navigate("/login");
                  }}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button
                  size="sm"
                  className="w-full gradient-rm hover:shadow-lg transition-all duration-200"
                  onClick={() => {
                    setOpen(false);
                    navigate("/register");
                  }}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Registrar
                </Button>
              </>
            ) : (
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8 gradient-rm text-white text-sm">
                    <AvatarFallback>{user?.name?.[0] ?? "?"}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="hover-glow"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* More visible theme switch (pill with moving knob) */}
      <div className="absolute right-4 top-4 md:top-3">
        <button
          role="switch"
          aria-checked={theme === "dark"}
          aria-label="Toggle theme"
          title="Toggle theme"
          onClick={toggle}
          className={`relative inline-flex items-center w-14 h-8 p-1 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            theme === "dark" ? "bg-slate-700" : "bg-yellow-100"
          }`}
        >
          {/* Sun (left) and Moon (right) indicators */}
          <span className="absolute left-1 text-xs pointer-events-none select-none">☀️</span>
          <span className="absolute right-1 text-xs pointer-events-none select-none">🌙</span>

          {/* Knob */}
          <span
            className={`inline-block w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-200 ${
              theme === "dark" ? "translate-x-6" : "translate-x-0"
            }`}
          />
          <span className="sr-only">Toggle theme</span>
        </button>
      </div>
    </nav>
  );
}
