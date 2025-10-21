import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Dashboard.css';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadUser = async () => {
        try {
            const userData = await authAPI.getUser();
            setUser(userData.user);
        } catch (error) {
            console.error('Error loading user:', error);
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = async () => {
        try {
            await authAPI.logout();
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-container">
                <div className="loading">Cargando...</div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>🎮 Dashboard KICK</h1>
                <button className="logout-button" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </header>

            <main className="dashboard-main">
                <section className="user-section">
                    <h2>Información del Usuario</h2>
                    {user && (
                        <div className="user-card">
                            <div className="user-avatar">
                                {user.username?.charAt(0).toUpperCase()}
                            </div>
                            <div className="user-details">
                                <h3>{user.username}</h3>
                                {user.email && <p className="user-email">{user.email}</p>}
                                <p className="user-id">ID: {user.id}</p>
                            </div>
                        </div>
                    )}
                </section>

                <section className="streaming-section">
                    <h2>Datos de Streaming</h2>
                    <div className="info-grid">
                        <div className="info-card">
                            <div className="info-icon">📺</div>
                            <h3>Canal</h3>
                            <p className="info-value">Próximamente</p>
                            <p className="info-desc">
                                Información del canal disponible a través de la API de KICK
                            </p>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">💬</div>
                            <h3>Chat</h3>
                            <p className="info-value">Próximamente</p>
                            <p className="info-desc">
                                Gestión del chat con permisos de escritura
                            </p>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">🔑</div>
                            <h3>Stream Key</h3>
                            <p className="info-value">Protegido</p>
                            <p className="info-desc">
                                Clave de streaming disponible con permisos adecuados
                            </p>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">🛡️</div>
                            <h3>Moderación</h3>
                            <p className="info-value">Activa</p>
                            <p className="info-desc">
                                Herramientas de moderación y gestión de bans
                            </p>
                        </div>
                    </div>
                </section>

                <section className="features-section">
                    <h2>Scopes Disponibles</h2>
                    <div className="scopes-grid">
                        <div className="scope-item">
                            <span className="scope-icon">👤</span>
                            <span>user:read</span>
                        </div>
                        <div className="scope-item">
                            <span className="scope-icon">📺</span>
                            <span>channel:read</span>
                        </div>
                        <div className="scope-item">
                            <span className="scope-icon">✏️</span>
                            <span>channel:write</span>
                        </div>
                        <div className="scope-item">
                            <span className="scope-icon">💬</span>
                            <span>chat:write</span>
                        </div>
                        <div className="scope-item">
                            <span className="scope-icon">🔑</span>
                            <span>streamkey:read</span>
                        </div>
                        <div className="scope-item">
                            <span className="scope-icon">🔔</span>
                            <span>events:subscribe</span>
                        </div>
                        <div className="scope-item">
                            <span className="scope-icon">🛡️</span>
                            <span>moderation:ban</span>
                        </div>
                    </div>
                </section>

                <section className="info-box">
                    <h3>ℹ️ Nota Importante</h3>
                    <p>
                        Este es un proyecto de demostración de integración con KICK API usando OAuth2.
                        Los datos de streaming mostrados son ejemplos. Para implementar funcionalidad
                        completa, deberás consultar la documentación oficial de KICK API y realizar las
                        llamadas correspondientes.
                    </p>
                </section>
            </main>

            <footer className="dashboard-footer">
                <p>&copy; 2025 KICK API Integration</p>
            </footer>
        </div>
    );
}

export default Dashboard;
