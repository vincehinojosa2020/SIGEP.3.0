import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { Droplets, Flame, Gauge, Activity } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Painel() {
  const { token } = useAuth();
  const [resumo, setResumo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    axios.get(`${API}/producao/resumo`, { headers })
      .then(res => setResumo(res.data))
      .catch(err => console.log('Erro ao carregar resumo:', err))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <Layout>
      <div className="content-header">
        <h1 data-testid="painel-title">Painel de Controle <small>Monitoramento em Tempo Real</small></h1>
      </div>
      <div className="content" data-testid="painel-content">
        {loading ? (
          <p>Carregando dados de producao...</p>
        ) : (
          <>
            <div className="stat-boxes" data-testid="stat-boxes">
              <div className="stat-box stat-green" data-testid="stat-barris">
                <div className="stat-icon"><Droplets size={36} /></div>
                <div className="stat-info">
                  <span className="stat-number">{resumo?.total_barris_dia?.toLocaleString('pt-BR') || '0'}</span>
                  <span className="stat-label">Barris/dia (Total)</span>
                </div>
              </div>
              <div className="stat-box stat-blue" data-testid="stat-gas">
                <div className="stat-icon"><Flame size={36} /></div>
                <div className="stat-info">
                  <span className="stat-number">{resumo?.total_gas_m3_dia?.toLocaleString('pt-BR') || '0'}</span>
                  <span className="stat-label">Gas m3/dia (Total)</span>
                </div>
              </div>
              <div className="stat-box stat-yellow" data-testid="stat-agua">
                <div className="stat-icon"><Gauge size={36} /></div>
                <div className="stat-info">
                  <span className="stat-number">{resumo?.media_corte_agua || '0'}%</span>
                  <span className="stat-label">Corte de Agua (Media)</span>
                </div>
              </div>
              <div className="stat-box stat-red" data-testid="stat-pressao">
                <div className="stat-icon"><Activity size={36} /></div>
                <div className="stat-info">
                  <span className="stat-number">{resumo?.media_pressao_psi?.toLocaleString('pt-BR') || '0'}</span>
                  <span className="stat-label">Pressao PSI (Media)</span>
                </div>
              </div>
            </div>

            <div className="panel" data-testid="producao-panel">
              <div className="panel-heading panel-dark">
                <h3 className="panel-title">Producao por Poco - Ultimo Registro</h3>
              </div>
              <div className="panel-body">
                <div className="table-responsive">
                  <table className="table table-striped" data-testid="producao-table">
                    <thead>
                      <tr>
                        <th>Poco</th>
                        <th>Bacia</th>
                        <th>Status</th>
                        <th>Barris/dia</th>
                        <th>Gas m3/dia</th>
                        <th>Agua %</th>
                        <th>PSI</th>
                        <th>Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resumo?.registros?.map((reg, i) => (
                        <tr key={i}>
                          <td><strong>{reg.poco_nome}</strong></td>
                          <td>{reg.bacia}</td>
                          <td>
                            <span className={`badge badge-${reg.poco_status === 'Ativo' ? 'success' : reg.poco_status === 'Manutencao' ? 'warning' : 'danger'}`}>
                              {reg.poco_status}
                            </span>
                          </td>
                          <td>{reg.barris_por_dia?.toLocaleString('pt-BR')}</td>
                          <td>{reg.gas_m3_dia?.toLocaleString('pt-BR')}</td>
                          <td>{reg.corte_agua_pct}%</td>
                          <td>{reg.pressao_psi?.toLocaleString('pt-BR')}</td>
                          <td>{reg.data}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="panel-footer">
                {resumo?.total_pocos_ativos || 0} pocos ativos | Dados atualizados automaticamente
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
