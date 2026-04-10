import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { Ship, Building2, ArrowRight } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Dutos() {
  const { token } = useAuth();
  const [dutos, setDutos] = useState([]);
  const [leituras, setLeituras] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    axios.get(`${API}/dutos`, { headers })
      .then(async (res) => {
        setDutos(res.data);
        const leiturasMap = {};
        for (const duto of res.data.slice(0, 8)) {
          try {
            const lr = await axios.get(`${API}/leituras/duto/${duto.id}?limit=1`, { headers });
            if (lr.data.length > 0) leiturasMap[duto.id] = lr.data[0];
          } catch (e) { /* ignore */ }
        }
        setLeituras(leiturasMap);
      })
      .catch(err => console.log('Erro:', err))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <Layout>
      <div className="content-header">
        <h1 data-testid="dutos-title">Monitoramento de Dutos <small>Rede de oleodutos e gasodutos</small></h1>
      </div>
      <div className="content">
        {loading ? <p>Carregando...</p> : (
          <>
            <div className="panel" data-testid="pipeline-schematic-panel">
              <div className="panel-heading panel-dark">
                <h3 className="panel-title">Diagrama de Dutos</h3>
              </div>
              <div className="panel-body">
                <div className="pipeline-grid" data-testid="pipeline-schematic">
                  {dutos.map(duto => {
                    const leitura = leituras[duto.id];
                    return (
                      <div key={duto.id} className="pipeline-segment" data-testid={`pipeline-${duto.nome}`}>
                        <div className="pipeline-node origin">
                          <span className="node-icon"><Ship size={18} /></span>
                          <span className="node-name">{duto.origem}</span>
                        </div>
                        <div className={`pipeline-line ${duto.status !== 'Operacional' ? 'maintenance' : ''}`}>
                          <span className="pipeline-info">
                            {duto.nome} &mdash; {duto.extensao_km}km | &oslash;{duto.diametro_pol}"
                          </span>
                          {leitura && (
                            <div className="pipeline-stats">
                              <span>Vazao: {leitura.vazao} m3/h</span>
                              <span>Pressao: {leitura.pressao} bar</span>
                              <span>Temp: {leitura.temperatura}&deg;C</span>
                            </div>
                          )}
                        </div>
                        <div className="pipeline-node destination">
                          <span className="node-icon"><Building2 size={18} /></span>
                          <span className="node-name">{duto.destino}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="panel" data-testid="dutos-table-panel">
              <div className="panel-heading">
                <h3 className="panel-title">Detalhamento de Dutos</h3>
              </div>
              <div className="panel-body">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered" data-testid="dutos-table">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Origem</th>
                        <th>Destino</th>
                        <th>Extensao (km)</th>
                        <th>Diametro (pol)</th>
                        <th>Pressao Op. (bar)</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dutos.map(duto => (
                        <tr key={duto.id}>
                          <td><strong>{duto.nome}</strong></td>
                          <td>{duto.origem}</td>
                          <td>{duto.destino}</td>
                          <td>{duto.extensao_km}</td>
                          <td>{duto.diametro_pol}"</td>
                          <td>{duto.pressao_operacao}</td>
                          <td>
                            <span className={`badge badge-${duto.status === 'Operacional' ? 'success' : 'warning'}`}>
                              {duto.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
