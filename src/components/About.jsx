import React from 'react';

const About = () => {
  const noiseTexture = "https://www.transparenttextures.com/patterns/stardust.png";
  const mainImage = "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?fm=jpg&auto=format&fit=crop&q=90&w=1200";
  const detailImage = "https://plus.unsplash.com/premium_photo-1661391423903-8b83639a6099?fm=jpg&auto=format&fit=crop&q=90&w=800";

  return (
    <section id="about" className="relative min-h-screen py-20 md:py-32 bg-[#050505] overflow-hidden">
      
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url(${noiseTexture})` }}
      />
      <div className="absolute top-0 left-1/4 w-[300px] md:w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        
        <div className="flex flex-col gap-4 mb-16 md:mb-24">
          <div className="flex items-center gap-4">
            <span className="text-amber-500 font-black text-xs uppercase tracking-[0.3em]">O Legado</span>
            <div className="h-px w-12 bg-amber-600/50"></div>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[0.85] tracking-tighter">
            The <span className="italic text-amber-500 font-light">Art</span> of <br className="hidden md:block"/> Precision
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative">
              
              <div className="relative z-10 p-2 md:p-4 border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm shadow-2xl">
                <img
                  src={mainImage}
                  alt="Barbershop Interior"
                  className="w-full aspect-[4/5] object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000"
                />
              </div>

              
              <div className="absolute -bottom-10 -right-4 md:-right-10 w-40 md:w-64 z-20 border-[6px] md:border-[12px] border-[#050505] shadow-2xl hidden sm:block">
                <img
                  src={detailImage}
                  alt="Razor Detail"
                  className="w-full h-auto object-cover sepia-[0.3] contrast-125"
                />
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-8 md:space-y-12">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl font-serif text-zinc-100 leading-snug italic border-l-2 border-amber-600 pl-6">
                "Uma navalha afiada exige respeito; um cliente satisfeito exige perfeição."
              </p>
              
              <div className="space-y-4 text-zinc-400 font-light leading-relaxed text-base md:text-lg">
                <p>
                  Na <span className="text-white font-medium">VintageCuts</span>, não apenas cortamos cabelo. Nós resgatamos a herança das barbearias de meados do século XX, fundindo-a com o minimalismo e a precisão técnica de 2026.
                </p>
                <p>
                  Cada toalha quente, cada movimento de navalha e cada aroma de sândalo é projetado para ser um interlúdio de calma e sofisticação na sua rotina.
                </p>
              </div>
            </div>

            
            <div className="grid grid-cols-2 gap-4 md:gap-12 pt-8 border-t border-zinc-900">
              <div>
                <span className="block text-4xl md:text-5xl font-serif text-amber-500">12+</span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Anos de Maestria</span>
              </div>
              <div>
                <span className="block text-4xl md:text-5xl font-serif text-amber-500">100%</span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Uso de Orgânicos</span>
              </div>
            </div>

            
            <div className="pt-4">
              <button className="w-full md:w-auto px-10 py-5 bg-transparent border border-amber-600/50 text-amber-500 font-black uppercase text-xs tracking-[0.2em] hover:bg-amber-600 hover:text-black transition-all duration-500 active:scale-95">
                Explore o Ritual
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <div className="absolute bottom-0 right-0 hidden xl:block pointer-events-none opacity-[0.03]">
        <span className="text-[20rem] font-black text-white leading-none select-none tracking-tighter">
          HERITAGE
        </span>
      </div>
    </section>
  );
};

export default About;