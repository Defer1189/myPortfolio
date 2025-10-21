import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import './AuthSuccess.css';

function AuthSuccess() {
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

    const handleGoToDashboard = () => {
        navigate('/dashboard');
    };

    if (loading) {
        return (
            <div className="auth-container">
                <div className="loading">Cargando...</div>
            </div>
        );
    }

    return (
        <div className="auth-container success">
            <div className="auth-card">
                <div className="success-icon">✅</div>
                <h1>¡Autenticación Exitosa!</h1>
                {user && (
                    <div className="user-info">
                        <p>
                            <strong>Usuario:</strong> {user.username}
                        </p>
                        {user.email && (
                            <p>
                                <strong>Email:</strong> {user.email}
                            </p>
                        )}
                        <p>
                            <strong>ID:</strong> {user.id}
                        </p>
                    </div>
                )}
                <p className="message">Has iniciado sesión correctamente con tu cuenta de KICK.</p>
                <button className="dashboard-button" onClick={handleGoToDashboard}>
                    Ir al Dashboard
                </button>
            </div>
        </div>
    );
}

export default AuthSuccess;
