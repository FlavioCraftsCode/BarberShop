import React from 'react';

const Hero = () => {
  
  const barberBgUrl = "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=2000";

  
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black pt-20 lg:pt-0">
      
      
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105"
          style={{ backgroundImage: `url(${barberBgUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black lg:bg-gradient-to-r lg:from-black lg:via-black/70 lg:to-transparent z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-12 gap-12 items-center">
        
        
        <div className="hidden lg:block lg:col-span-5 relative group">
          <div className="relative z-10 p-3 border border-amber-600/20 bg-zinc-900/10 backdrop-blur-sm transform transition-transform duration-700 group-hover:scale-[1.02]">
            <img
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1000"
              alt="Barbeiro Profissional"
              className="w-full h-[450px] xl:h-[550px] object-cover grayscale brightness-75 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100"
            />
          </div>
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-[1px] bg-amber-600/50" />
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-[1px] bg-amber-600/50" />
          <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-amber-600/30 -mr-4 -mt-4" />
        </div>

        
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8 md:w-12 bg-amber-600"></div>
            <h2 className="text-amber-500 font-serif italic text-lg md:text-2xl tracking-wide">
              Estilo Autêntico
            </h2>
          </div>

          <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase drop-shadow-2xl">
            THE BARBER'S <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-600 to-amber-700">
              HOUSE
            </span>
          </h1>

          <p className="text-zinc-400 text-base md:text-lg lg:text-xl max-w-lg mb-10 leading-relaxed font-light px-4 lg:px-0">
            Onde a tradição encontra a modernidade. Experimente um serviço premium 
            com profissionais especialistas em estética masculina.
          </p>

          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 lg:px-0">
            <button 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="w-full sm:w-auto bg-amber-600 hover:bg-white text-black px-10 py-5 font-black uppercase tracking-[0.2em] text-[10px] md:text-xs transition-all duration-500 shadow-xl shadow-amber-900/20 active:scale-95"
            >
              Agendar Horário
            </button>
            <button 
              onClick={(e) => scrollToSection(e, 'service')}
              className="w-full sm:w-auto border border-zinc-700 hover:border-amber-500 text-white px-10 py-5 font-black uppercase tracking-[0.2em] text-[10px] md:text-xs transition-all duration-500 bg-black/40 backdrop-blur-md active:scale-95"
            >
              Ver Serviços
            </button>
          </div>
        </div>

      </div>

      
      <div className="hidden xl:block absolute -right-20 top-1/2 -translate-y-1/2 rotate-90">
        <span className="text-[10rem] font-black text-white/[0.03] select-none tracking-[0.2em]">
          VINTAGE
        </span>
      </div>
    </section>
  );
};

export default Hero;