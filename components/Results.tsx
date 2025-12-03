import React from 'react';
import { AnalysisResult, Property } from '../types';
import PropertyCard from './PropertyCard';
import { RefreshCcw, ArrowRight, TrendingUp, MessageCircle } from 'lucide-react';

interface ResultsProps {
  result: AnalysisResult;
  allProperties: Property[];
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ result, allProperties, onRestart }) => {
  // Cyberpunk/Neon palette mapping
  const getDecisionStyles = (decision: string) => {
    switch (decision) {
      case 'COMPRAR': return {
        text: 'text-[#00FF7F]',
        border: 'border-[#00FF7F]',
        bg: 'bg-[#00FF7F]/10',
        shadow: 'shadow-[0_0_30px_rgba(0,255,127,0.2)]'
      };
      case 'ALUGAR': return {
        text: 'text-cyan-400',
        border: 'border-cyan-400',
        bg: 'bg-cyan-400/10',
        shadow: 'shadow-[0_0_30px_rgba(34,211,238,0.2)]'
      };
      default: return {
        text: 'text-yellow-400',
        border: 'border-yellow-400',
        bg: 'bg-yellow-400/10',
        shadow: 'shadow-[0_0_30px_rgba(250,204,21,0.2)]'
      };
    }
  };

  const styles = getDecisionStyles(result.decisao);

  const handleContact = () => {
    const phoneNumber = "557592812153";
    let message = "";

    if (result.decisao === 'COMPRAR') {
        message = `Olá! Fiz o Quiz Imobiliário e meu resultado foi COMPRA (Score: ${result.score_compra}/100). Gostaria de ver os imóveis recomendados.`;
    } else if (result.decisao === 'ALUGAR') {
        message = `Olá! Fiz o Quiz Imobiliário e meu resultado foi ALUGUEL. Gostaria de ver opções disponíveis nesta categoria.`;
    } else {
        message = `Olá! Fiz o Quiz Imobiliário e gostaria de uma consultoria para avaliar meu cenário entre alugar e comprar.`;
    }

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fadeIn pb-12">
      {/* Header Decision - Holographic Card */}
      <div className="text-center space-y-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-[#00FF7F] blur-[100px] opacity-10 pointer-events-none"></div>
        
        <div>
           <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-[0.2em] mb-4">Resultado da Análise</h2>
           <div className={`inline-block px-12 py-6 rounded-none border-2 backdrop-blur-xl ${styles.border} ${styles.bg} ${styles.shadow}`}>
              <h1 className={`text-6xl md:text-7xl font-black tracking-tighter ${styles.text} drop-shadow-lg`}>
                {result.decisao}
              </h1>
           </div>
        </div>

        <p className="text-xl text-neutral-300 max-w-3xl mx-auto font-light leading-relaxed border-l-4 border-neutral-800 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
          {result.justificativa}
        </p>
      </div>

      {/* Gauge / Score Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-[#121212] rounded-xl p-8 border border-[#333] relative overflow-hidden">
           <div className="flex flex-col h-full justify-between">
              <div className="flex items-center justify-between mb-6">
                 <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp size={14} /> Índice de Compra
                 </span>
                 <span className="text-4xl font-mono font-bold text-white">{result.score_compra}<span className="text-neutral-600 text-lg">/100</span></span>
              </div>
              
              <div className="relative pt-4 pb-2">
                 <div className="w-full h-3 bg-[#222] rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-cyan-500 via-[#00FF7F] to-yellow-400 shadow-[0_0_15px_rgba(0,255,127,0.5)]"
                        style={{ width: `${result.score_compra}%` }}
                    />
                 </div>
                 <div className="flex justify-between mt-3 text-[10px] text-neutral-600 font-mono uppercase">
                    <span>Tendência Aluguel</span>
                    <span>Zona Neutra</span>
                    <span>Tendência Compra</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-[#121212] rounded-xl p-8 border border-[#333] flex flex-col justify-center items-center text-center">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Ação Sugerida</span>
            <p className="text-white font-medium mb-4">{result.cta.texto_botao}</p>
            <button 
                onClick={handleContact}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 rounded transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(37,211,102,0.3)]"
            >
                <MessageCircle size={18} /> FALAR COM CORRETOR
            </button>
        </div>
      </div>

      {/* Recommendations */}
      {result.recomendacoes.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-2 h-8 bg-[#00FF7F] rounded-sm"></span>
                Opções Compatíveis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {result.recomendacoes.map((rec) => {
                    const fullDetails = allProperties.find(p => p.id === rec.id);
                    return (
                        <PropertyCard 
                            key={rec.id} 
                            recommendation={rec} 
                            propertyDetails={fullDetails} 
                        />
                    );
                })}
            </div>
          </div>
      )}

      {/* Observation Box */}
      <div className="bg-[#0A0A0A] border border-[#222] rounded-lg p-6 flex items-start gap-4">
        <div className="w-1 h-full bg-neutral-800 rounded-full"></div>
        <div className="text-sm text-neutral-500 font-mono">
            <span className="text-[#00FF7F]"> > SYSTEM_NOTE: </span>
            {result.observacoes || "Análise concluída com base nos parâmetros atuais."}
        </div>
      </div>

      <div className="text-center pt-8">
        <button 
            onClick={onRestart}
            className="group text-neutral-500 hover:text-[#00FF7F] font-mono text-sm inline-flex items-center gap-2 transition-colors uppercase tracking-widest"
        >
            <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-500"/> Reiniciar Protocolo
        </button>
      </div>
    </div>
  );
};

export default Results;