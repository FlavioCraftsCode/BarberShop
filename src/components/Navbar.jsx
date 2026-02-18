import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Scissors, Menu, X, User, LogOut, Calendar } from 'lucide-react';
import AuthModal from './AuthModal';

const Navbar = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showDropdown, setShowDropdown] = useState(false); 

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowDropdown(false);
    setIsOpen(false);
    navigate('/');
  };

  const scrollToSection = (sectionId) => {
    setIsOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 400);
    }
  };

  const handleBookingClick = () => {
    if (!user) {
      setAuthMode('register');
      setShowAuthModal(true);
    } else {
      navigate('/agendar');
      setIsOpen(false);
    }
  };

  const handleMyAppointmentsClick = () => {
    if (!user) {
      setAuthMode('login');
      setShowAuthModal(true);
    } else {
      navigate('/my-appointments');
      setShowDropdown(false);
      setIsOpen(false);
    }
  };

  const handleAuthClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-dropdown')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          scrolled || isOpen ? 'bg-[#0a0a0a] border-b border-amber-600/20 py-4' : 'bg-transparent py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between relative z-[120]">
            
            <div
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-4 cursor-pointer group"
            >
              <div className="bg-amber-600 p-2.5 rounded-lg group-hover:rotate-12 transition-all">
                <Scissors className="text-black" size={24} />
              </div>
              <span className="text-2xl font-serif font-black text-white uppercase tracking-tight">
                Vintage<span className="text-amber-500">Cuts</span>
              </span>
            </div>

            
            <div className="hidden md:flex items-center gap-10">
              <div className="flex gap-10 text-[13px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                <button onClick={() => scrollToSection('home')} className="hover:text-amber-500 transition-all">
                  Home
                </button>
                <button onClick={() => scrollToSection('about')} className="hover:text-amber-500 transition-all">
                  Sobre
                </button>
                <button onClick={() => scrollToSection('service')} className="hover:text-amber-500 transition-all">
                  Serviços
                </button>
                <button onClick={() => scrollToSection('contact')} className="hover:text-amber-500 transition-all">
                  Contato
                </button>
              </div>

              <div className="flex items-center gap-8 border-l border-zinc-800 pl-8">
                {!user ? (
                  <button
                    onClick={handleAuthClick}
                    className="text-white text-[12px] font-bold uppercase tracking-widest hover:text-amber-500 transition-all flex items-center gap-2.5"
                  >
                    <User size={18} /> Entrar / Cadastrar
                  </button>
                ) : (
                  <div className="relative user-dropdown">
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center gap-2.5 text-amber-500 text-[12px] font-bold uppercase tracking-widest hover:text-amber-400 transition-all"
                    >
                      <User size={18} />
                      <span className="max-w-[120px] truncate">Olá, {user.name?.split(' ')[0] || 'Cliente'}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {showDropdown && (
                      <div className="absolute right-0 mt-4 w-60 bg-[#141414] border border-zinc-800 rounded-xl shadow-2xl py-2.5 z-50">
                        <button
                          onClick={handleMyAppointmentsClick}
                          className="w-full text-left px-5 py-3.5 text-[13px] text-zinc-300 hover:bg-zinc-800 hover:text-amber-400 transition-all flex items-center gap-3"
                        >
                          <Calendar size={18} />
                          Meus Agendamentos
                        </button>
                        <div className="border-t border-zinc-800 my-1.5 opacity-50"></div>
                        <button
                          onClick={() => {
                            handleLogout();
                            setShowDropdown(false);
                          }}
                          className="w-full text-left px-5 py-3.5 text-[13px] text-red-400 hover:bg-zinc-800 hover:text-red-300 transition-all flex items-center gap-3"
                        >
                          <LogOut size={18} />
                          Sair da conta
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={handleBookingClick}
                  className="bg-amber-600 hover:bg-white hover:text-black text-black px-8 py-3.5 font-black uppercase text-[11px] tracking-[0.25em] transition-all rounded-lg shadow-lg"
                >
                  Agendar
                </button>
              </div>
            </div>

            
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none p-2 relative z-[130]">
                {isOpen ? <X size={32} className="text-amber-500" /> : <Menu size={32} />}
              </button>
            </div>
          </div>
        </div>

        
        <div
          className={`fixed inset-0 bg-[#0a0a0a] transition-all duration-500 md:hidden z-[110] flex flex-col ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 invisible'
          }`}
        >
          <div className="flex-1 overflow-y-auto w-full pt-24 pb-12 px-6">
            <div className="flex flex-col items-center space-y-5 min-h-full">
              {user && (
                <div className="text-center mb-4">
                  <p className="text-amber-500 font-serif text-2xl italic">Olá, {user.name?.split(' ')[0] || 'Cliente'}</p>
                  <div className="h-px w-10 bg-amber-600/30 mx-auto mt-2" />
                </div>
              )}
              <button onClick={() => scrollToSection('home')} className="text-2xl font-serif font-bold text-white hover:text-amber-500 transition-all uppercase">HOME</button>
              <button onClick={() => scrollToSection('about')} className="text-2xl font-serif font-bold text-white hover:text-amber-500 transition-all uppercase">SOBRE</button>
              <button onClick={() => scrollToSection('service')} className="text-2xl font-serif font-bold text-white hover:text-amber-500 transition-all uppercase">SERVIÇOS</button>
              <button onClick={() => scrollToSection('contact')} className="text-2xl font-serif font-bold text-white hover:text-amber-500 transition-all uppercase">CONTATO</button>
              <div className="w-full max-w-[200px] h-px bg-zinc-900 my-4" />
              {!user ? (
                <button onClick={() => { setIsOpen(false); handleAuthClick(); }} className="text-amber-500 text-sm font-bold uppercase tracking-widest border border-amber-600/20 px-10 py-4 rounded-full w-full max-w-xs text-center">Login / Cadastro</button>
              ) : (
                <div className="flex flex-col items-center space-y-4 w-full max-w-xs">
                  <button onClick={handleMyAppointmentsClick} className="text-amber-400 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 bg-zinc-900/50 w-full py-4 rounded-lg"><Calendar size={18} /> Meus Agendamentos</button>
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-red-500 flex items-center justify-center gap-3 font-bold uppercase text-sm w-full py-4 border border-red-600/30 rounded-lg"><LogOut size={18} /> Sair da Conta</button>
                </div>
              )}
              <button onClick={() => { handleBookingClick(); setIsOpen(false); }} className="bg-amber-600 text-black w-full max-w-xs py-5 font-black uppercase tracking-[0.2em] text-[11px] transition-all rounded shadow-xl mt-4">Agendar Agora</button>
            </div>
          </div>
        </div>
      </nav>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} setUser={setUser} defaultTab={authMode} />
      )}
    </>
  );
};

export default Navbar;