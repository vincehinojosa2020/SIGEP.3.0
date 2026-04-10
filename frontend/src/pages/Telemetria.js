import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Telemetria() {
  const [docs, setDocs] = useState(null);
  const [testResult, setTestResult] = useState(null);
  const [testForm, setTestForm] = useState({
    sensor_id: 'SENS-P52-PRESS-001',
    tipo: 'pressao',
    valor: '245.7',
    unidade: 'PSI'
  });

  useEffect(() => {
    axios.get(`${API}/telemetria/docs`)
      .then(res => setDocs(res.data))
      .catch(err => console.log('Erro:', err));
  }, []);

  const handleTest = async (e) => {
    e.preventDefault();
    setTestResult(null);
    try {
      const payload = {
        ...testForm,
        valor: parseFloat(testForm.valor)
      };
      const res = await axios.post(`${API}/telemetria/api`, payload);
      setTestResult({ success: true, data: res.data });
    } catch (err) {
      setTestResult({ success: false, data: err.response?.data || err.message });
    }
  };

  return (
    <Layout>
      <div className="content-header">
        <h1 data-testid="telemetria-title">API de Telemetria <small>Documentacao SCADA</small></h1>
      </div>
      <div className="content">
        <div className="panel" data-testid="telemetria-docs-panel">
          <div className="panel-heading panel-dark">
            <h3 className="panel-title">
              {docs?.nome || 'API de Telemetria SCADA'} - v{docs?.versao || '1.2'}
            </h3>
          </div>
          <div className="panel-body">
            <p className="text-muted" style={{marginBottom: '16px'}}>
              {docs?.descricao || 'Interface para recepcao de dados telemetricos de sensores SCADA.'}
            </p>

            {docs?.endpoints?.map((ep, i) => (
              <div key={i} style={{marginBottom: '20px'}}>
                <div style={{marginBottom: '8px'}}>
                  <span className={`method-badge method-${ep.metodo?.toLowerCase()}`}>{ep.metodo}</span>
                  <span className="endpoint-url">{ep.url}</span>
                </div>
                <p style={{fontSize: '13px', color: '#666', margin: '4px 0 8px'}}>{ep.descricao}</p>
                <p style={{fontSize: '12px', color: '#888'}}>Autenticacao: {ep.autenticacao}</p>

                <div style={{marginTop: '8px'}}>
                  <strong style={{fontSize: '12px'}}>Corpo da Requisicao:</strong>
                  <div className="api-doc-block" data-testid="api-request-body">
                    {JSON.stringify(ep.corpo, null, 2)}
                  </div>
                </div>

                <div>
                  <strong style={{fontSize: '12px'}}>Codigos HTTP:</strong>
                  <div className="api-doc-block">
                    {JSON.stringify(ep.codigos_http, null, 2)}
                  </div>
                </div>
              </div>
            ))}

            {docs?.exemplo_curl && (
              <div>
                <strong style={{fontSize: '12px'}}>Exemplo cURL:</strong>
                <div className="api-doc-block" data-testid="curl-example">
                  {docs.exemplo_curl}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="panel" data-testid="telemetria-test-panel">
          <div className="panel-heading">
            <h3 className="panel-title">Testar Endpoint</h3>
          </div>
          <div className="panel-body">
            <form onSubmit={handleTest} data-testid="telemetria-test-form">
              <div className="test-form">
                <div className="form-group">
                  <label>Sensor ID</label>
                  <input
                    className="form-control"
                    value={testForm.sensor_id}
                    onChange={e => setTestForm({...testForm, sensor_id: e.target.value})}
                    data-testid="test-sensor-id"
                  />
                </div>
                <div className="form-group">
                  <label>Tipo</label>
                  <select
                    className="form-control"
                    value={testForm.tipo}
                    onChange={e => setTestForm({...testForm, tipo: e.target.value})}
                    data-testid="test-tipo"
                  >
                    <option value="pressao">Pressao</option>
                    <option value="vazao">Vazao</option>
                    <option value="temperatura">Temperatura</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Valor</label>
                  <input
                    className="form-control"
                    type="number"
                    step="0.1"
                    value={testForm.valor}
                    onChange={e => setTestForm({...testForm, valor: e.target.value})}
                    data-testid="test-valor"
                  />
                </div>
                <div className="form-group">
                  <label>Unidade</label>
                  <input
                    className="form-control"
                    value={testForm.unidade}
                    onChange={e => setTestForm({...testForm, unidade: e.target.value})}
                    data-testid="test-unidade"
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" data-testid="test-submit-button">
                    Enviar Dados
                  </button>
                </div>
              </div>
            </form>

            {testResult && (
              <div className={`test-response ${testResult.success ? 'text-success' : 'text-danger'}`} data-testid="test-response">
                {JSON.stringify(testResult.data, null, 2)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
