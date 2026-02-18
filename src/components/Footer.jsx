import React from 'react';
import { Scissors, Instagram, Facebook, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] text-zinc-500 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="bg-amber-600 p-2 rounded-lg group-hover:rotate-12 transition-transform duration-500">
                <Scissors className="text-black" size={24} />
              </div>
              <h3 className="text-2xl font-serif font-black text-white tracking-tighter uppercase">
                Vintage<span className="text-amber-500">Cuts</span>
              </h3>
            </div>
            <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed max-w-xs">
              Redefinindo o conceito de estética masculina através do equilíbrio entre a herança clássica e a visão contemporânea.
            </p>
            <div className="flex gap-5">
              {[Instagram, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="p-3 rounded-full border border-zinc-800 text-zinc-400 hover:border-amber-500 hover:text-amber-500 transition-all duration-300">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          
          <div className="lg:col-span-2">
            <h4 className="text-white text-[10px] uppercase tracking-[0.3em] font-black mb-8">Navegação</h4>
            <ul className="space-y-4 text-sm">
              {['Home', 'About', 'Service', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="hover:text-amber-500 transition-colors duration-300 flex items-center group">
                    {item}
                    <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          
          <div className="lg:col-span-3">
            <h4 className="text-white text-[10px] uppercase tracking-[0.3em] font-black mb-8">Reservas</h4>
            <div className="space-y-6">
              <div className="block group cursor-default">
                <span className="text-[10px] text-zinc-600 uppercase block mb-1">Telefone / WhatsApp</span>
                <span className="text-white text-lg font-serif">+55 (11) 5555-0192</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-600 shrink-0" />
                <p className="text-sm leading-relaxed text-zinc-400">
                  Av. Blackwood, 1920. <br />
                  Old Town, Brooklyn - NY.
                </p>
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-3">
            <h4 className="text-white text-[10px] uppercase tracking-[0.3em] font-black mb-8">Disponibilidade</h4>
            <div className="space-y-4 bg-zinc-900/30 p-6 border border-zinc-800/50">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-2 text-sm">
                <span>Seg — Sex</span>
                <span className="text-white font-medium">09h - 20h</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-800 pb-2 text-sm">
                <span>Sábado</span>
                <span className="text-white font-medium">08h - 18h</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Domingo</span>
                <span className="text-amber-600 font-bold uppercase text-[10px]">Closed</span>
              </div>
            </div>
          </div>

        </div>

        
        <div className="mt-20 pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-[10px] uppercase tracking-widest font-bold">
            <p>© {currentYear} VintageCuts</p>
            <span className="hidden md:block text-zinc-800">|</span>
            <p className="text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer">Privacy Policy</p>
            <p className="text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer">Terms of Service</p>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
            <span className="text-zinc-700 font-black italic">Crafted in Brooklyn</span>
            <div className="w-8 h-px bg-amber-600/30"></div>
            <span className="text-amber-500/50">NY — USA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;