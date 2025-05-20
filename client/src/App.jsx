// myPortfolio/client/src/App.jsx
import './App.css';
import HomeContent from './components/HomeContent';
import React from 'react';

/**
 * Componente principal de la aplicación.
 * @returns {React.JSX.Element} El componente React App.
 */
function App() {
    return (
        <>
            <HomeContent /> {/* Renderiza el nuevo componente aquí */}
        </>
    );
}

export default App;
