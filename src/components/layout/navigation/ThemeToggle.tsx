
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from "@/components/ui/switch";

interface ThemeToggleProps {
  minimal?: boolean;
}

const ThemeToggle = ({ minimal = false }: ThemeToggleProps) => {
  const [isDark, setIsDark] = useState(false);

  // Check for user's preferred color scheme on component mount
  useEffect(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial state based on localStorage or system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    
    if (isDark) {
      // Switch to light mode
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      // Switch to dark mode
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <div className="flex items-center gap-2">
      {!minimal && (
        <>
          <Sun className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-blue-500'}`} />
          <Switch 
            checked={isDark} 
            onCheckedChange={toggleTheme} 
            aria-label="Toggle dark mode"
          />
          <Moon className={`h-4 w-4 ${isDark ? 'text-blue-400' : 'text-gray-400'}`} />
        </>
      )}
      
      {minimal && (
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-blue-500" />
          ) : (
            <Moon className="h-5 w-5 text-blue-500" />
          )}
        </button>
      )}
    </div>
  );
};

export default ThemeToggle;
