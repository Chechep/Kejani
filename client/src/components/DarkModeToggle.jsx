import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-5 left-5 p-3 rounded-full 
      bg-white dark:bg-black 
      text-black dark:text-white 
      border border-gray-300 dark:border-gray-700 
      shadow-lg hover:scale-110 transition-all"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default DarkModeToggle;
