import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { Plus, Edit, Trash2, X } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const emptyForm = {
  especie: '', data_observacao: '', plataforma: '',
  coordenadas_lat: '', coordenadas_lon: '', observador: '', notas: ''
};

export default function Fauna() {
  const { token } = useAuth();
  const [fauna, setFauna] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const headers = { Authorization: `Bearer ${token}` };

  const fetchFauna = () => {
    axios.get(`${API}/fauna`, { headers })
      .then(res => setFauna(res.data))
      .catch(err => console.log('Erro:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchFauna(); }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      coordenadas_lat: parseFloat(form.coordenadas_lat),
      coordenadas_lon: parseFloat(form.coordenadas_lon)
    };
    try {
      if (editId) {
        await axios.put(`${API}/fauna/${editId}`, payload, { headers });
      } else {
        await axios.post(`${API}/fauna`, payload, { headers });
      }
      setShowForm(false);
      setEditId(null);
      setForm(emptyForm);
      fetchFauna();
    } catch (err) {
      alert('Erro ao salvar: ' + (err.response?.data?.detail || err.message));
    }
  };

  const handleEdit = (obs) => {
    setForm({
      especie: obs.especie,
      data_observacao: obs.data_observacao,
      plataforma: obs.plataforma,
      coordenadas_lat: String(obs.coordenadas_lat),
      coordenadas_lon: String(obs.coordenadas_lon),
      observador: obs.observador,
      notas: obs.notas || ''
    });
    setEditId(obs.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Confirma exclusao desta observacao?')) return;
    try {
      await axios.delete(`${API}/fauna/${id}`, { headers });
      fetchFauna();
    } catch (err) {
      alert('Erro ao excluir');
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm);
  };

  return (
    <Layout>
      <div className="content-header">
        <h1 data-testid="fauna-title">SisFauna <small>Monitoramento ambiental</small></h1>
      </div>
      <div className="content">
        <div className="mb-10">
          <button
            className="btn btn-primary"
            onClick={() => { setShowForm(!showForm); setEditId(null); setForm(emptyForm); }}
            data-testid="fauna-add-button"
          >
            <Plus size={14} /> Nova Observacao
          </button>
        </div>

        {showForm && (
          <div className="panel" data-testid="fauna-form-panel">
            <div className="panel-heading panel-green">
              <h3 className="panel-title">
                {editId ? 'Editar Observacao' : 'Nova Observacao de Fauna'}
                <button onClick={cancelForm} style={{marginLeft: 'auto', background: 'none', border: 'none', color: '#fff', cursor: 'pointer'}}>
                  <X size={16} />
                </button>
              </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={handleSubmit} data-testid="fauna-form">
                <div className="fauna-form">
                  <div className="form-group">
                    <label>Especie</label>
                    <input className="form-control" value={form.especie} onChange={e => setForm({...form, especie: e.target.value})} placeholder="Ex: Chelonia mydas (Tartaruga-verde)" required data-testid="fauna-especie-input" />
                  </div>
                  <div className="form-group">
                    <label>Data Observacao</label>
                    <input className="form-control" type="date" value={form.data_observacao} onChange={e => setForm({...form, data_observacao: e.target.value})} required data-testid="fauna-data-input" />
                  </div>
                  <div className="form-group">
                    <label>Plataforma</label>
                    <select className="form-control" value={form.plataforma} onChange={e => setForm({...form, plataforma: e.target.value})} required data-testid="fauna-plataforma-input">
                      <option value="">Selecione...</option>
                      <option value="P-52">P-52</option>
                      <option value="P-56">P-56</option>
                      <option value="P-48">P-48</option>
                      <option value="FPSO Cidade de Angra">FPSO Cidade de Angra</option>
                      <option value="FPSO Cidade de Paraty">FPSO Cidade de Paraty</option>
                      <option value="FPSO Capixaba">FPSO Capixaba</option>
                      <option value="PCH-2">PCH-2</option>
                      <option value="FPSO Buzios">FPSO Buzios</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Latitude</label>
                    <input className="form-control" type="number" step="0.0001" value={form.coordenadas_lat} onChange={e => setForm({...form, coordenadas_lat: e.target.value})} placeholder="-22.3700" required data-testid="fauna-lat-input" />
                  </div>
                  <div className="form-group">
                    <label>Longitude</label>
                    <input className="form-control" type="number" step="0.0001" value={form.coordenadas_lon} onChange={e => setForm({...form, coordenadas_lon: e.target.value})} placeholder="-40.0200" required data-testid="fauna-lon-input" />
                  </div>
                  <div className="form-group">
                    <label>Observador</label>
                    <input className="form-control" value={form.observador} onChange={e => setForm({...form, observador: e.target.value})} placeholder="Nome do observador" required data-testid="fauna-observador-input" />
                  </div>
                  <div className="form-group" style={{gridColumn: 'span 2'}}>
                    <label>Notas</label>
                    <textarea className="form-control" value={form.notas} onChange={e => setForm({...form, notas: e.target.value})} placeholder="Observacoes adicionais..." data-testid="fauna-notas-input" />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary" data-testid="fauna-submit-button">
                      {editId ? 'Salvar Alteracoes' : 'Registrar Observacao'}
                    </button>
                    <button type="button" className="btn btn-default" onClick={cancelForm}>Cancelar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="panel" data-testid="fauna-list-panel">
          <div className="panel-heading">
            <h3 className="panel-title">Registros de Observacao ({fauna.length})</h3>
          </div>
          <div className="panel-body">
            {loading ? <p>Carregando...</p> : (
              <div className="table-responsive">
                <table className="table table-striped table-bordered" data-testid="fauna-table">
                  <thead>
                    <tr>
                      <th>Especie</th>
                      <th>Data</th>
                      <th>Plataforma</th>
                      <th>Coordenadas</th>
                      <th>Observador</th>
                      <th>Notas</th>
                      <th>Acoes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fauna.map(obs => (
                      <tr key={obs.id}>
                        <td><strong>{obs.especie}</strong></td>
                        <td>{obs.data_observacao}</td>
                        <td>{obs.plataforma}</td>
                        <td className="text-muted" style={{fontSize: '11px'}}>
                          {obs.coordenadas_lat?.toFixed(4)}, {obs.coordenadas_lon?.toFixed(4)}
                        </td>
                        <td>{obs.observador}</td>
                        <td className="text-muted" style={{fontSize: '12px', maxWidth: '200px'}}>{obs.notas}</td>
                        <td>
                          <div className="btn-group">
                            <button className="btn btn-info btn-xs" onClick={() => handleEdit(obs)} data-testid={`fauna-edit-${obs.id.slice(0,8)}`}>
                              <Edit size={11} />
                            </button>
                            <button className="btn btn-danger btn-xs" onClick={() => handleDelete(obs.id)} data-testid={`fauna-delete-${obs.id.slice(0,8)}`}>
                              <Trash2 size={11} />
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
            SisFauna - Sistema de Monitoramento de Fauna | IBAMA/ICMBio
          </div>
        </div>
      </div>
    </Layout>
  );
}
