import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { FileDown, FileSpreadsheet } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Conformidade() {
  const { token } = useAuth();
  const [relatorios, setRelatorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    axios.get(`${API}/conformidade`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setRelatorios(res.data))
      .catch(err => console.log('Erro:', err))
      .finally(() => setLoading(false));
  }, [token]);

  const downloadFile = async (id, type) => {
    setDownloading(`${id}-${type}`);
    try {
      const response = await axios.get(`${API}/conformidade/${id}/${type}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      const ext = type === 'pdf' ? 'pdf' : 'xlsx';
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `relatorio_anp_${id.slice(0, 8)}.${ext}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log('Erro ao baixar:', err);
      alert('Erro ao gerar arquivo. Tente novamente.');
    } finally {
      setDownloading(null);
    }
  };

  const statusBadge = (status) => {
    const map = { 'Aprovado': 'success', 'Pendente': 'warning', 'Em Revisao': 'info' };
    return <span className={`badge badge-${map[status] || 'default'}`}>{status}</span>;
  };

  return (
    <Layout>
      <div className="content-header">
        <h1 data-testid="conformidade-title">Conformidade ANP <small>Relatorios regulatorios</small></h1>
      </div>
      <div className="content">
        <div className="panel" data-testid="conformidade-panel">
          <div className="panel-heading">
            <h3 className="panel-title">Relatorios de Conformidade ({relatorios.length})</h3>
          </div>
          <div className="panel-body">
            {loading ? <p>Carregando...</p> : (
              <div className="table-responsive">
                <table className="table table-striped table-bordered" data-testid="conformidade-table">
                  <thead>
                    <tr>
                      <th>Tipo</th>
                      <th>Periodo</th>
                      <th>Data Geracao</th>
                      <th>No. ANP</th>
                      <th>Responsavel</th>
                      <th>Status</th>
                      <th>Acoes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relatorios.map(rel => (
                      <tr key={rel.id}>
                        <td><strong>{rel.tipo}</strong></td>
                        <td>{rel.periodo_inicio} a {rel.periodo_fim}</td>
                        <td>{rel.data_geracao}</td>
                        <td className="text-muted">{rel.numero_anp}</td>
                        <td>{rel.responsavel}</td>
                        <td>{statusBadge(rel.status)}</td>
                        <td>
                          <div className="btn-group">
                            <button
                              className="btn btn-danger btn-xs"
                              onClick={() => downloadFile(rel.id, 'pdf')}
                              disabled={downloading === `${rel.id}-pdf`}
                              data-testid={`export-pdf-${rel.id.slice(0,8)}`}
                            >
                              <FileDown size={12} /> PDF
                            </button>
                            <button
                              className="btn btn-success btn-xs"
                              onClick={() => downloadFile(rel.id, 'excel')}
                              disabled={downloading === `${rel.id}-excel`}
                              data-testid={`export-excel-${rel.id.slice(0,8)}`}
                            >
                              <FileSpreadsheet size={12} /> Excel
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="panel-footer">
            Relatorios gerados conforme regulamentacao ANP - Agencia Nacional do Petroleo
          </div>
        </div>
      </div>
    </Layout>
  );
}
