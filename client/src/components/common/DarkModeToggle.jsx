// myPortfolio/client/src/components/common/DarkModeToggle.jsx
import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

/**
 * Componente DarkModeToggle
 * Proporciona un switch para alternar entre el modo claro y oscuro.
 * Guarda la preferencia del usuario en localStorage.
 *
 * @returns {React.ReactElement} Botón para alternar entre modo claro y oscuro.
 */
const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const initialTheme = getInitialTheme();
        applyTheme(initialTheme, setIsDarkMode);
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => handleToggleDarkMode(prevMode, setIsDarkMode));
    };

    return (
        <button
            onClick={toggleDarkMode}
            className='dark-mode-toggle-button'
            aria-label={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
        >
            {isDarkMode ? <FaSun className='icon-sun' /> : <FaMoon className='icon-moon' />}
        </button>
    );
};

const applyTheme = (theme, setIsDarkMode) => {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        setIsDarkMode(true);
    } else {
        document.body.classList.remove('dark-mode');
        setIsDarkMode(false);
    }
};

const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const handleToggleDarkMode = (prevMode, setIsDarkMode) => {
    const newMode = !prevMode;
    const theme = newMode ? 'dark' : 'light';
    applyTheme(theme, setIsDarkMode);
    localStorage.setItem('theme', theme);
    return newMode;
};

export default DarkModeToggle;
