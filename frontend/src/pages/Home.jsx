import { useState, useEffect } from 'react';
import { authAPI, infoAPI } from '../services/api';
import './Home.css';

function Home() {
    const [apiInfo, setApiInfo] = useState(null);
    const [health, setHealth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadInfo();
    }, []);

    const loadInfo = async () => {
        try {
            const [infoData, healthData] = await Promise.all([
                infoAPI.getInfo(),
                infoAPI.healthCheck(),
            ]);
            setApiInfo(infoData);
            setHealth(healthData);
        } catch (error) {
            console.error('Error loading API info:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = () => {
        authAPI.login();
    };

    if (loading) {
        return (
            <div className="home-container">
                <div className="loading">Cargando...</div>
            </div>
        );
    }

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>🎮 KICK API Integration</h1>
                <p className="subtitle">Integración segura con KICK usando OAuth2</p>
            </header>

            <main className="home-main">
                <section className="info-section">
                    <h2>Estado del Sistema</h2>
                    {health && (
                        <div className="status-card">
                            <div className="status-indicator active"></div>
                            <div>
                                <strong>Estado:</strong> {health.status}
                            </div>
                            <div>
                                <strong>Uptime:</strong> {Math.floor(health.uptime)}s
                            </div>
                        </div>
                    )}
                </section>

                {apiInfo && (
                    <section className="info-section">
                        <h2>Información de la API</h2>
                        <div className="info-card">
                            <p>
                                <strong>Nombre:</strong> {apiInfo.name}
                            </p>
                            <p>
                                <strong>Versión:</strong> {apiInfo.version}
                            </p>
                            <p>
                                <strong>Descripción:</strong> {apiInfo.description}
                            </p>
                        </div>

                        <h3>Scopes de OAuth2</h3>
                        <div className="scopes-list">
                            {apiInfo.oauth?.scopes.map((scope, index) => (
                                <span key={index} className="scope-badge">
                                    {scope}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                <section className="action-section">
                    <h2>Comenzar</h2>
                    <p>Inicia sesión con tu cuenta de KICK para acceder a los datos de streaming</p>
                    <button className="login-button" onClick={handleLogin}>
                        🔐 Iniciar Sesión con KICK
                    </button>
                </section>

                <section className="features-section">
                    <h2>Características</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <span className="feature-icon">🔒</span>
                            <h3>OAuth2 Seguro</h3>
                            <p>Autenticación segura usando el estándar OAuth2</p>
                        </div>
                        <div className="feature-card">
                            <span className="feature-icon">🛡️</span>
                            <h3>Protección CSRF</h3>
                            <p>Validación de state para prevenir ataques</p>
                        </div>
                        <div className="feature-card">
                            <span className="feature-icon">🍪</span>
                            <h3>Cookies Firmadas</h3>
                            <p>Almacenamiento seguro de tokens y datos</p>
                        </div>
                        <div className="feature-card">
                            <span className="feature-icon">📡</span>
                            <h3>API Completa</h3>
                            <p>Acceso a datos de usuario, canal y streaming</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="home-footer">
                <p>&copy; 2025 KICK API Integration - Desarrollado con React + Vite</p>
            </footer>
        </div>
    );
}

export default Home;
