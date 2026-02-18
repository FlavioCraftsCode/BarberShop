import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Loader2 } from 'lucide-react';
import axios from 'axios';

const AuthModal = ({ onClose, setUser, defaultTab = 'login' }) => {
  const API_BASE_URL = 'https://api-barbershop-zklu.onrender.com';

  const [isLogin, setIsLogin] = useState(defaultTab === 'login');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (defaultTab === 'register') {
      setIsLogin(false);
    }
  }, [defaultTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { ...formData };

      const { data } = await axios.post(`${API_BASE_URL}${endpoint}`, payload);

      if (isLogin) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        onClose();
      } else {
        alert('Conta criada com sucesso! Agora faça login para continuar.');
        setIsLogin(true);
        setFormData({ name: '', email: '', password: '', phone: '' });
      }
    } catch (err) {
      console.error("Erro na autenticação:", err);
      const msg = err.response?.data?.msg 
        || err.response?.data?.error 
        || 'Erro ao conectar com o servidor.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>

      
      <div className="relative bg-[#121212] border border-amber-600/30 w-full max-w-md rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
        
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-zinc-500 hover:text-white transition-all bg-[#121212]/50 p-1 rounded-full"
        >
          <X size={24} />
        </button>

        
        <div className="p-8 overflow-y-auto custom-scrollbar">
          <h2 className="text-3xl font-serif font-bold text-white mb-1 italic">
            {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta na VintageCuts'}
          </h2>

          <p className="text-zinc-400 text-sm mb-6">
            {isLogin
              ? 'Entre para agendar seu horário.'
              : 'Cadastre-se gratuitamente para reservar seu momento.'}
          </p>

          {error && (
            <p className="bg-red-900/30 border border-red-600/50 text-red-300 p-3 text-xs mb-6 text-center rounded">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600" size={18} />
                <input
                  type="text"
                  required={!isLogin}
                  placeholder="Nome completo"
                  className="w-full bg-zinc-900 border border-zinc-800 p-4 pl-11 text-white text-sm rounded focus:border-amber-600 outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600" size={18} />
              <input
                type="email"
                required
                placeholder="Seu email"
                className="w-full bg-zinc-900 border border-zinc-800 p-4 pl-11 text-white text-sm rounded focus:border-amber-600 outline-none transition-all"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600" size={18} />
              <input
                type="password"
                required
                placeholder="Senha"
                className="w-full bg-zinc-900 border border-zinc-800 p-4 pl-11 text-white text-sm rounded focus:border-amber-600 outline-none transition-all"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-500 text-black py-4 font-black uppercase text-xs tracking-[0.25em] transition-all rounded flex justify-center items-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : isLogin ? (
                'ENTRAR'
              ) : (
                'CADASTRAR'
              )}
            </button>
          </form>

          <div className="mt-6 text-center pb-2">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-amber-500 hover:text-amber-400 text-xs font-bold uppercase tracking-widest transition-all"
            >
              {isLogin
                ? 'Ainda não tem conta? Cadastre-se'
                : 'Já tem conta? Faça login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;