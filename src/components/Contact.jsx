import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Send, MessageSquare, Loader2 } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      await axios.post('https://api-barbershop-zklu.onrender.com/api/contact', formData);
      
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      alert("Houve um erro ao enviar sua mensagem. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-32 bg-[#050505] text-white overflow-hidden">
      
      
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-600/20 to-transparent" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          
          
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-600/30 bg-amber-600/5 text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                <MessageSquare size={12} />
                Get in Touch
              </div>
              
              <h2 className="text-5xl md:text-7xl font-serif font-bold leading-[0.9] tracking-tighter">
                Onde a <br />
                <span className="italic text-amber-500 font-light">Tradição</span> mora.
              </h2>
              
              <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-sm">
                Agende seu horário ou tire dúvidas. O café está sempre quente e a navalha sempre afiada.
              </p>

              <div className="grid gap-6 pt-4">
                
                <div className="group flex items-start gap-4 p-4 rounded-xl border border-zinc-900 bg-zinc-900/20 hover:border-amber-600/50 transition-all duration-500 cursor-default">
                  <div className="p-3 bg-zinc-900 rounded-lg text-amber-500 group-hover:bg-amber-600 group-hover:text-black transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-widest text-zinc-400 mb-1">Visite-nos</h4>
                    <p className="text-zinc-200 text-sm leading-relaxed">
                      Av. Blackwood, 1920. <br/>
                      Old Town, Brooklyn - NY.
                    </p>
                  </div>
                </div>

                
                <div className="group flex items-start gap-4 p-4 rounded-xl border border-zinc-900 bg-zinc-900/20 hover:border-amber-600/50 transition-all duration-500 cursor-default">
                  <div className="p-3 bg-zinc-900 rounded-lg text-amber-500 group-hover:bg-amber-600 group-hover:text-black transition-all">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-widest text-zinc-400 mb-1">Ligue Agora</h4>
                    <p className="text-zinc-200 text-xl font-serif">+55 (11) 5555-0192</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-7 relative mt-12 lg:mt-0">
            <div className="absolute inset-0 bg-amber-600/5 blur-3xl rounded-full" />
            
            <div className="relative bg-[#0c0c0c] border border-zinc-800 p-8 md:p-12 shadow-2xl">
              
              {submitted ? (
                <div className="py-16 text-center animate-in fade-in zoom-in duration-500">
                  <div className="inline-flex p-6 rounded-full bg-amber-600/10 text-amber-500 mb-6">
                    <Send size={40} className="animate-bounce" />
                  </div>
                  <h3 className="text-3xl font-serif italic mb-4 text-white">Mensagem Enviada!</h3>
                  <p className="text-zinc-500">Obrigado por entrar em contato. Retornaremos em breve.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-amber-500 transition-all placeholder:text-zinc-700 text-white"
                        placeholder="Seu Nome Completo"
                      />
                      <label className="absolute left-0 -top-3.5 text-zinc-600 text-[10px] uppercase font-black tracking-widest transition-all group-focus-within:text-amber-500">Nome</label>
                    </div>

                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-amber-500 transition-all placeholder:text-zinc-700 text-white"
                        placeholder="email@exemplo.com"
                      />
                      <label className="absolute left-0 -top-3.5 text-zinc-600 text-[10px] uppercase font-black tracking-widest transition-all group-focus-within:text-amber-500">Email</label>
                    </div>
                  </div>

                  <div className="relative group">
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-amber-500 transition-all resize-none placeholder:text-zinc-700 text-white"
                      placeholder="Como podemos ajudar você hoje?"
                    />
                    <label className="absolute left-0 -top-3.5 text-zinc-600 text-[10px] uppercase font-black tracking-widest transition-all group-focus-within:text-amber-500">Mensagem</label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full py-6 bg-amber-600 hover:bg-white text-black font-black uppercase tracking-[0.3em] text-xs transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden disabled:opacity-70"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <>
                        <span className="relative z-10">Enviar Requisição</span>
                        <Send size={16} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                </form>
              )}
            </div>

            <div className="mt-12 flex items-center justify-between border-t border-zinc-900 pt-8">
              <span className="text-zinc-600 text-[10px] uppercase font-black tracking-[0.3em]">Siga o Legado</span>
              <div className="flex gap-6">
                <Instagram size={20} className="text-zinc-500 hover:text-amber-500 cursor-pointer transition-all" />
                <Facebook size={20} className="text-zinc-500 hover:text-amber-500 cursor-pointer transition-all" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;