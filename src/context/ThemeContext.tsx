import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeContextType = {
    theme: Theme;
    toggle: () => void;
    setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggle: () => {},
    setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        const stored = localStorage.getItem("theme");
        return stored === "dark" || stored === "light" ? (stored as Theme) : "light";
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") root.classList.add("dark");
        else root.classList.remove("dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggle = () => setThemeState((t) => (t === "dark" ? "light" : "dark"));

    return <ThemeContext.Provider value={{ theme, toggle, setTheme: setThemeState }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);