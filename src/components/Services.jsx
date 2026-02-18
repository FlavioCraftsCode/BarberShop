import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Scissors, Brush, Droplet, Clock } from 'lucide-react';

const barberCuttingImage = "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&q=80&w=1200&h=1600";

const services = [
  {
    icon: <Scissors className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Signature Fade",
    description: "Degradê perfeito com acabamento detalhado. Skin, low, mid ou high fade — estilo que dura semanas.",
    duration: "45–60 min",
    price: "R$ 60",
  },
  {
    icon: <Brush className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Beard Sculpt & Care",
    description: "Modelagem completa da barba com fade, alinhamento preciso, hidratação e óleo premium.",
    duration: "35–50 min",
    price: "R$ 55",
  },
  {
    icon: <Droplet className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Hot Towel Razor",
    description: "Barba clássica com toalha quente, navalha reta e ritual de espuma natural. O ápice do cuidado masculino.",
    duration: "50 min",
    price: "R$ 80",
  },
];

const Services = () => {
  const navigate = useNavigate(); 

  const handleReserveClick = () => {
    navigate('/agendar'); 
  };

  return (
    <section id="service" className="relative py-16 md:py-28 bg-[#0a0a0a] overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6">
          <div className="max-w-xl text-left">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
              Nossos <span className="italic text-amber-500 font-light">Serviços</span>
            </h2>
            <div className="h-1 w-20 bg-amber-600 mt-4 hidden md:block"></div>
          </div>
          <p className="text-zinc-500 text-sm md:text-base max-w-xs uppercase tracking-widest font-bold border-l border-amber-600 pl-4">
            Excelência em cada detalhe, precisão em cada movimento.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          
          <div className="hidden lg:block lg:col-span-5 relative group">
            <div className="sticky top-28 overflow-hidden rounded-sm border border-zinc-800">
              <img
                src={barberCuttingImage}
                alt="Serviço Premium"
                className="w-full h-[650px] object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/40 backdrop-blur-md border border-white/10">
                <p className="text-amber-500 font-bold text-xs uppercase tracking-tighter">Premium Experience</p>
                <p className="text-white text-lg font-serif italic">"Qualidade que você sente na pele."</p>
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-7 space-y-4 md:space-y-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-6 md:p-8 bg-zinc-900/30 border border-zinc-800/50 hover:border-amber-600/40 transition-all duration-500"
              >
                
                <div className="flex gap-4 md:gap-6 items-start">
                  <div className="text-amber-600 p-3 bg-amber-600/5 rounded-sm group-hover:bg-amber-600 group-hover:text-black transition-all duration-500">
                    {service.icon}
                  </div>
                  <div className="max-w-md">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 uppercase tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-zinc-500 text-sm md:text-base leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {service.description}
                    </p>
                  </div>
                </div>

                
                <div className="mt-6 sm:mt-0 flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-zinc-800 pt-4 sm:pt-0">
                  <span className="text-2xl md:text-3xl font-black text-amber-500">
                    {service.price}
                  </span>
                  <div className="flex items-center gap-2 text-zinc-500 text-[10px] md:text-xs uppercase tracking-widest font-bold">
                    <Clock size={12} className="text-amber-600" />
                    {service.duration}
                  </div>
                </div>
              </div>
            ))}

            
            <div className="p-4 bg-amber-600/10 border border-amber-600/20 text-center flex flex-col items-center gap-2">
              <p className="text-amber-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                Atendimento com hora marcada
              </p>
              <p className="text-zinc-500 text-[9px] uppercase tracking-widest">
                Av. Blackwood, 1920 • Brooklyn, NY
              </p>
            </div>
          </div>
        </div>

        
        <div className="mt-16 flex flex-col items-center gap-6">
          <button
            onClick={handleReserveClick}
            className="w-full sm:w-auto px-12 py-5 bg-amber-600 hover:bg-white text-black font-black uppercase tracking-[0.2em] text-xs transition-all duration-500 active:scale-95 shadow-2xl shadow-amber-900/20"
          >
            Reservar Horário Agora
          </button>

          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-zinc-700 font-bold">
            <span className="italic">Crafted in Brooklyn</span>
            <div className="w-8 h-px bg-zinc-800"></div>
            <span>NY — USA</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;