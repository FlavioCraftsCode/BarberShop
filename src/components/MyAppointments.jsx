import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Scissors, Trash2, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyAppointments = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  const API_URL = 'https://api-barbershop-zklu.onrender.com';

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      
      const { data } = await axios.get(`${API_URL}/api/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAppointments(Array.isArray(data) ? data : data.appointments || []);
      
    } catch (err) {
      console.error("Erro ao carregar agendamentos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/'); 
    } else {
      fetchAppointments();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja cancelar este agendamento?")) return;
    try {
      const token = localStorage.getItem('token');
      
      
      await axios.delete(`${API_URL}/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setAppointments(prev => prev.filter(app => (app.id || app._id) !== id));
      
      alert("Agendamento cancelado com sucesso.");
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir agendamento.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <Loader2 className="text-amber-500 animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-zinc-500 hover:text-amber-500 transition-all mb-4 uppercase text-[10px] font-bold tracking-widest"
            >
              <ArrowLeft size={16} /> Voltar para o Início
            </button>
            <h1 className="text-4xl font-serif font-bold text-white italic">
              Meus <span className="text-amber-600">Agendamentos</span>
            </h1>
          </div>
          <button 
            onClick={() => navigate('/agendar')}
            className="bg-amber-600 text-black px-6 py-3 font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all"
          >
            Novo Agendamento
          </button>
        </div>

        <div className="grid gap-4">
          {appointments.length === 0 ? (
            <div className="bg-zinc-900/30 border border-zinc-800 p-12 text-center rounded-lg">
              <Calendar className="mx-auto text-zinc-700 mb-4" size={48} />
              <p className="text-zinc-500 italic">Você ainda não possui horários marcados.</p>
            </div>
          ) : (
            appointments.map((app) => (
              <div 
                key={app.id || app._id} 
                className="bg-zinc-900/50 border border-zinc-800 p-6 flex flex-col md:flex-row justify-between items-center group hover:border-amber-600/30 transition-all rounded-sm"
              >
                <div className="flex items-center gap-6">
                  <div className="bg-amber-600/10 p-4 rounded-full text-amber-500">
                    <Scissors size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold uppercase tracking-wider">
                      {app.service || app.servico}
                    </h3>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <div className="flex items-center gap-2 text-zinc-400 text-sm">
                        <Calendar size={14} className="text-amber-600" />
                        {new Date(app.date || app.data).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center gap-2 text-zinc-400 text-sm">
                        <Clock size={14} className="text-amber-600" />
                        {new Date(app.date || app.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => handleDelete(app.id || app._id)}
                  className="mt-6 md:mt-0 flex items-center gap-2 text-zinc-600 hover:text-red-500 transition-colors p-2 text-xs uppercase font-bold tracking-tighter"
                >
                  <Trash2 size={18} /> Cancelar
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;