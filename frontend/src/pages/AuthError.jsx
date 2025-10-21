import { useNavigate, useSearchParams } from 'react-router-dom';
import './AuthSuccess.css';

function AuthError() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const errorMessage = searchParams.get('message') || 'Error desconocido durante la autenticación';

    const handleRetry = () => {
        navigate('/');
    };

    return (
        <div className="auth-container error">
            <div className="auth-card">
                <div className="error-icon">❌</div>
                <h1>Error de Autenticación</h1>
                <p className="message">
                    Lo sentimos, hubo un problema durante el proceso de autenticación con KICK.
                </p>
                <div className="error-details">
                    <strong>Error:</strong> {errorMessage}
                </div>
                <div>
                    <button className="retry-button" onClick={handleRetry}>
                        Reintentar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthError;
