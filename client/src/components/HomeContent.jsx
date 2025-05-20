// myPortfolio/client/src/components/HomeContent.jsx
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import React from 'react';
import CounterCard from './CounterCard';

/**
 * Componente que muestra el contenido principal de la página de inicio.
 * @returns {React.JSX.Element} El contenido renderizado para la página de inicio.
 */
function HomeContent() {
    return (
        <>
            <div>
                <a href='https://vitejs.dev' target='_blank' rel='noopener noreferrer'>
                    <img src={viteLogo} className='logo' alt='Vite logo' />
                </a>
                <a href='https://react.dev' target='_blank' rel='noopener noreferrer'>
                    <img src={reactLogo} className='logo react' alt='React logo' />
                </a>
            </div>
            <h1>Vite + React</h1>
            <CounterCard /> {/* Renderiza el nuevo componente de la tarjeta */}
            <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
        </>
    );
}

export default HomeContent;
