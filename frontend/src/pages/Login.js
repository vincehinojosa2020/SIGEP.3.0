import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/painel');
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(typeof detail === 'string' ? detail : 'Erro ao realizar login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" data-testid="login-page">
      <div className="login-box">
        <div className="login-logo">
          <span className="oil-drop-large">&#9679;</span>
          <h1>PetroNac</h1>
          <p>SIGEP - Sistema Integrado de Gestao<br/>de Exploracao e Producao</p>
        </div>
        <div className="login-card" data-testid="login-card">
          <div className="login-card-header">Acesso ao Sistema</div>
          <div className="login-card-body">
            {error && <div className="alert alert-danger" data-testid="login-error">{error}</div>}
            <form onSubmit={handleSubmit} data-testid="login-form">
              <div className="form-group">
                <label htmlFor="username">Usuario</label>
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Digite seu usuario"
                  data-testid="login-username-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  data-testid="login-password-input"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={loading} data-testid="login-submit-button">
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          </div>
          <div className="login-card-footer">
            PetroNac &copy; 2018 - Todos os direitos reservados
          </div>
        </div>
      </div>
    </div>
  );
}
