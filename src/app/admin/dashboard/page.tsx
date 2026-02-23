import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { User, Scissors, Trash2, Clock, Calendar as CalendarIcon, Loader2 } from "lucide-react";

interface Appointment {
  id: string;
  date: string;
  service: string;
  user: {
    name: string;
    email: string;
    phone?: string;
  };
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const API_URL = 'https://api-barbershop-zklu.onrender.com';

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${API_URL}/api/appointments/admin/all`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (response.ok) {
        const data = await response.json();
        const sorted = (Array.isArray(data) ? data : []).sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setAppointments(sorted);
      }
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/");
      return;
    }

    try {
      const user = JSON.parse(userData);
      const hasPermission = 
        (user.role && user.role.toLowerCase() === 'admin') || 
        user.email === 'futbrasss@gmail.com';

      if (!hasPermission) {
        navigate("/"); 
        return;
      }

      fetchAppointments();
    } catch (e) {
      navigate("/");
    }
  }, [navigate]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Confirmar exclusão?")) return;

    setDeletingId(id);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/appointments/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setAppointments(prev => prev.filter(app => app.id !== id));
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-4">
        <Loader2 className="text-amber-500 animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans antialiased">
      
      <nav className="border-b border-white/[0.02] bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
             <div className="flex items-center">
                
             </div>
             <button 
                onClick={() => navigate('/')} 
                className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
                title="Sair"
             >
                
             </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-16 pb-16">
        <div className="flex flex-col mb-12 text-center md:text-left">
          <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.8em] mb-4 opacity-60">
            Overview Administrativo
          </span>
          <h1 className="text-white text-5xl font-light tracking-tighter leading-none">
            Gestão de <span className="font-bold italic text-white/90">Agenda</span>
          </h1>
          <div className="h-1 w-12 bg-amber-500/30 mt-8 hidden md:block rounded-full"></div>
        </div>

        <div className="bg-[#080808] border border-white/[0.04] rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.04] bg-white/[0.01]">
                  <th className="px-8 py-6 text-[9px] uppercase font-black tracking-[0.3em] text-zinc-600">Cliente</th>
                  <th className="px-8 py-6 text-[9px] uppercase font-black tracking-[0.3em] text-zinc-600">Serviço</th>
                  <th className="px-8 py-6 text-[9px] uppercase font-black tracking-[0.3em] text-zinc-600">Data e Hora</th>
                  <th className="px-8 py-6 text-right text-[9px] uppercase font-black tracking-[0.3em] text-zinc-600">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {appointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-white/[0.015] transition-all group">
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center border border-white/[0.05] text-zinc-500 group-hover:text-amber-500 transition-all">
                          <User size={20} />
                        </div>
                        <div>
                          <p className="text-white font-bold text-base tracking-tight">{appt.user?.name || "Desconhecido"}</p>
                          <p className="text-[11px] text-zinc-600 font-mono tracking-tight mt-1 uppercase">{appt.user?.email || "Sem email"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-lg text-[10px] font-black bg-zinc-900 border border-white/[0.03] text-amber-500 uppercase tracking-widest">
                        {appt.service}
                      </span>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3 text-zinc-100">
                          <Clock size={14} className="text-amber-500/50" />
                          <span className="text-sm font-black tracking-tight group-hover:text-amber-500 transition-colors">
                            {new Date(appt.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-zinc-600">
                          <CalendarIcon size={14} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">
                            {new Date(appt.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8 text-right">
                      <button 
                        onClick={() => handleDelete(appt.id)}
                        disabled={deletingId === appt.id}
                        className="p-4 text-zinc-800 hover:text-red-500 hover:bg-red-500/[0.05] rounded-2xl transition-all disabled:opacity-30"
                      >
                        {deletingId === appt.id ? <Loader2 className="animate-spin" size={20} /> : <Trash2 size={20} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {appointments.length === 0 && (
              <div className="py-32 text-center flex flex-col items-center justify-center">
                <Scissors size={32} className="text-zinc-800 mb-4 opacity-20" />
                <p className="text-zinc-700 font-black uppercase tracking-[0.6em] text-[10px]">Agenda em Aberto</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}