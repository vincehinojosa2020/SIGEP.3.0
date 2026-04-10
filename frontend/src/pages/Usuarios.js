import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Usuarios() {
  const { token } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/usuarios`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUsuarios(res.data))
      .catch(err => console.log('Erro:', err))
      .finally(() => setLoading(false));
  }, [token]);

  const roleBadge = (role) => {
    const map = {
      'admin': { cls: 'danger', label: 'Administrador' },
      'engenheiro': { cls: 'info', label: 'Engenheiro' },
      'geologo': { cls: 'primary', label: 'Geologo' },
      'operador': { cls: 'warning', label: 'Operador' },
      'ambiental': { cls: 'success', label: 'Ambiental' },
    };
    const info = map[role] || { cls: 'default', label: role };
    return <span className={`badge badge-${info.cls}`}>{info.label}</span>;
  };

  return (
    <Layout>
      <div className="content-header">
        <h1 data-testid="usuarios-title">Gerenciamento de Usuarios <small>Administracao do sistema</small></h1>
      </div>
      <div className="content">
        <div className="panel" data-testid="usuarios-panel">
          <div className="panel-heading">
            <h3 className="panel-title">Usuarios Cadastrados ({usuarios.length})</h3>
          </div>
          <div className="panel-body">
            {loading ? <p>Carregando...</p> : (
              <div className="table-responsive">
                <table className="table table-striped table-bordered" data-testid="usuarios-table">
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Nome Completo</th>
                      <th>E-mail</th>
                      <th>Cargo</th>
                      <th>Departamento</th>
                      <th>Perfil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map(u => (
                      <tr key={u.id}>
                        <td><strong>{u.username}</strong></td>
                        <td>{u.nome}</td>
                        <td className="text-muted">{u.email}</td>
                        <td>{u.cargo || '-'}</td>
                        <td>{u.departamento || '-'}</td>
                        <td>{roleBadge(u.role)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="panel-footer">
            Gerenciamento de acessos - Apenas administradores podem visualizar esta pagina
          </div>
        </div>
      </div>
    </Layout>
  );
}
