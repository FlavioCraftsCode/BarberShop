import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Scissors, CheckCircle2, Loader2, Trash2, ExternalLink, Phone, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingSection = ({ user, onOpenAuth }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [myAppointments, setMyAppointments] = useState([]);

  
  const API_URL = 'https://api-barbershop-zklu.onrender.com';

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    service: 'Corte Clássico',
  });

  const services = [
    { name: 'Corte Clássico', price: 'R$ 50', time: '45 min' },
    { name: 'Barba Imperial', price: 'R$ 40', time: '30 min' },
    { name: 'Combo (Corte + Barba)', price: 'R$ 80', time: '1h 15min' },
    { name: 'Corte Kids', price: 'R$ 40', time: '30 min' },
  ];

  
  const fetchAppointments = async () => {
    if (!user?.id) return;
    setFetchLoading(true);
    setErrorMsg('');
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token não encontrado');
      
      const { data } = await axios.get(`${API_URL}/api/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyAppointments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Erro ao carregar agendamentos:', err);
      setErrorMsg('Não foi possível carregar seus agendamentos.');
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchAppointments();
    window.scrollTo(0, 0);
  }, [user, success]);

  
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      if (!formData.date) throw new Error('Selecione uma data');
      if (!formData.time) throw new Error('Selecione um horário');

      const timeFormatted = formData.time.length === 5 ? formData.time : `${formData.time}:00`;
      const selectedDateTime = new Date(`${formData.date}T${timeFormatted}`);

      if (isNaN(selectedDateTime.getTime())) throw new Error('Data ou horário inválido');

      const now = new Date();
      if (selectedDateTime < now) throw new Error('Não é possível agendar para o passado');

      const token = localStorage.getItem('token');
      if (!token) throw new Error('Sessão expirada. Faça login novamente.');

      await axios.post(
        `${API_URL}/api/appointments`,
        {
          date: selectedDateTime.toISOString(),
          service: formData.service,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess(true);
      setFormData({ date: '', time: '', service: 'Corte Clássico' });
      setTimeout(() => setSuccess(false), 7000);
      fetchAppointments();
    } catch (err) {
      console.error('Erro no agendamento:', err);
      let msg = 'Erro ao agendar. Tente novamente.';
      if (err.response) {
        msg = err.response.data?.message || err.response.data?.error || msg;
      } else {
        msg = err.message;
      }
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  
  const deleteAppointment = async (id) => {
    if (!window.confirm('Deseja realmente cancelar este agendamento?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAppointments();
    } catch (err) {
      alert('Erro ao cancelar. Tente novamente.');
      console.error(err);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];
  const isFormValid = formData.date && formData.time;

  return (
    <section className="min-h-screen bg-[#050505] relative overflow-hidden pt-12 pb-12 lg:pt-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-zinc-500 hover:text-amber-500 transition-all mb-6 lg:mb-10 uppercase text-[11px] lg:text-xs font-bold tracking-widest"
        >
          <ArrowLeft size={18} /> Voltar para a Home
        </button>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <div className="animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="text-amber-500 font-bold tracking-[0.3em] text-xs lg:text-sm uppercase">
              Reserva Online
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mt-2 mb-6 italic">
              Agende seu <span className="text-amber-600">Momento</span>
            </h2>

            <div className="space-y-6">
              <p className="text-zinc-400 leading-relaxed mb-6 max-w-lg text-sm sm:text-base lg:text-lg">
                Escolha o melhor horário e serviço. Nossa equipe está pronta para manter seu estilo impecável com o padrão de excelência que você merece.
              </p>
              <div className="flex items-center gap-5 text-white">
                <div className="p-4 bg-zinc-900 border border-amber-600/20 rounded-xl">
                  <Phone size={24} className="text-amber-500" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase font-bold tracking-tighter">Telefone</p>
                  <p className="font-bold text-base lg:text-xl">(84) 99999-8888</p>
                </div>
              </div>
            </div>

            {user && (
              <div className="mt-10 lg:mt-14">
                <h3 className="text-white font-bold text-xs lg:text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
                  <ExternalLink size={18} className="text-amber-500" /> Seus Agendamentos
                </h3>

                {fetchLoading ? (
                  <div className="text-center py-10">
                    <Loader2 className="animate-spin mx-auto text-amber-500" size={32} />
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[350px] lg:max-h-[450px] overflow-y-auto pr-3 custom-scrollbar">
                    {myAppointments.length === 0 ? (
                      <p className="text-zinc-600 text-base italic">Nenhum agendamento encontrado.</p>
                    ) : (
                      myAppointments.map((app) => (
                        <div
                          key={app.id || app._id}
                          className="bg-zinc-900/50 border border-zinc-800 p-5 flex justify-between items-center group hover:border-amber-600/40 transition-all rounded-xl"
                        >
                          <div>
                            <p className="text-amber-500 font-bold text-xs lg:text-sm uppercase">{app.service}</p>
                            <p className="text-white text-sm lg:text-base mt-1">
                              {new Date(app.date).toLocaleDateString('pt-BR')} às{' '}
                              {new Date(app.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          <button
                            onClick={() => deleteAppointment(app.id || app._id)}
                            className="text-zinc-600 hover:text-red-500 transition-colors p-2"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-[#0a0a0a] border border-amber-600/10 p-8 sm:p-10 lg:p-12 shadow-2xl relative rounded-2xl flex items-center justify-center lg:mt-4">
            {!user ? (
              <div className="text-center max-w-md mx-auto py-10">
                <Scissors size={64} className="text-zinc-800 mx-auto mb-6 opacity-40" />
                <h3 className="text-2xl font-serif font-bold text-white mb-4">Área Exclusiva</h3>
                <p className="text-zinc-400 mb-8 text-base">Faça login para reservar seu horário.</p>
                <button
                  onClick={onOpenAuth}
                  className="bg-amber-600 text-black px-10 py-5 font-black uppercase text-sm tracking-widest rounded hover:bg-amber-500 transition-all shadow-lg"
                >
                  Fazer Login Agora
                </button>
              </div>
            ) : success ? (
              <div className="text-center py-12 animate-in fade-in zoom-in duration-500 w-full">
                <CheckCircle2 size={72} className="text-green-500 mx-auto mb-6" />
                <h3 className="text-2xl lg:text-3xl text-white font-serif font-bold mb-4">Agendado com Sucesso!</h3>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-amber-500 text-sm lg:text-base font-bold uppercase tracking-widest hover:underline"
                >
                  Novo agendamento
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-7 w-full">
                {errorMsg && (
                  <div className="bg-red-950/40 border border-red-800 text-red-300 px-5 py-4 rounded text-sm lg:text-base text-center">
                    {errorMsg}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] lg:text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-3 block">Data</label>
                    <input
                      type="date"
                      required
                      min={minDate}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 p-4 lg:p-5 text-white text-sm lg:text-base outline-none focus:border-amber-600 transition-all rounded-lg [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] lg:text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-3 block">Horário</label>
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 p-4 lg:p-5 text-white text-sm lg:text-base outline-none focus:border-amber-600 transition-all rounded-lg [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] lg:text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-3 block">Serviço</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 p-4 lg:p-5 text-white text-sm lg:text-base outline-none appearance-none cursor-pointer rounded-lg"
                  >
                    {services.map((s) => (
                      <option key={s.name} value={s.name} className="bg-zinc-950">
                        {s.name} — {s.price}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className={`w-full py-5 lg:py-6 font-black uppercase text-xs lg:text-sm tracking-[0.3em] transition-all rounded-lg shadow-xl ${
                    isFormValid && !loading
                      ? 'bg-amber-600 text-black hover:bg-amber-500'
                      : 'bg-amber-800/30 text-zinc-500 cursor-not-allowed'
                  }`}
                >
                  {loading ? <Loader2 className="animate-spin mx-auto" size={24} /> : 'Confirmar Agendamento'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;