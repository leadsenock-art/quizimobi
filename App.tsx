import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { analyzeRealEstateScenario } from './services/geminiService';
import { QuizAnswers, Step, AnalysisResult } from './types';
import { INITIAL_ANSWERS, MOCK_PROPERTIES } from './constants';
import { Building2, Sparkles, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<Step>('intro');
  const [answers, setAnswers] = useState<QuizAnswers>(INITIAL_ANSWERS);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleStart = () => {
    setStep('quiz');
  };

  const handleQuizComplete = async () => {
    setStep('loading');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Agora chama o motor local, não a API
    const analysis = await analyzeRealEstateScenario(answers, MOCK_PROPERTIES);
    setResult(analysis);
    setStep('results');
  };

  const handleRestart = () => {
    setAnswers(INITIAL_ANSWERS);
    setResult(null);
    setStep('intro');
  };

  const renderIntro = () => (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-10 animate-fadeIn relative z-10">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF7F] to-emerald-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-[#121212] p-8 rounded-full border border-[#333] shadow-2xl">
          <Building2 size={64} className="text-[#00FF7F]" />
        </div>
      </div>
      
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
          Alugar <span className="text-[#00FF7F]">vs</span> Comprar
        </h1>
        <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
          Algoritmo inteligente para decidir seu futuro imobiliário. <br/>
          Análise de dados financeiros e perfil de vida em tempo real.
        </p>
      </div>

      <button
        onClick={handleStart}
        className="group relative px-8 py-4 bg-[#00FF7F] text-black rounded-lg font-bold text-lg tracking-wide overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,127,0.4)]"
      >
        <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 origin-left"></div>
        <div className="flex items-center gap-3 relative z-10">
          <Sparkles size={20} className="fill-black" />
          INICIAR ANÁLISE
        </div>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-neutral-500 pt-12 border-t border-[#222] w-full max-w-4xl">
        <div className="flex items-center justify-center gap-2">
          <Activity size={16} className="text-[#00FF7F]" />
          <span className="uppercase tracking-widest text-xs">Análise Preditiva</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Activity size={16} className="text-[#00FF7F]" />
          <span className="uppercase tracking-widest text-xs">Dados Locais</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Activity size={16} className="text-[#00FF7F]" />
          <span className="uppercase tracking-widest text-xs">Match Instantâneo</span>
        </div>
      </div>
    </div>
  );

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-pulse relative">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-t-2 border-[#00FF7F] animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-r-2 border-[#00FF7F]/50 animate-spin-reverse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles size={28} className="text-[#00FF7F]" />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white tracking-tight">Processando Dados...</h2>
        <p className="text-neutral-500">
          Neural Engine conectando em {answers.bairros.length > 0 ? answers.bairros.join(', ') : 'Feira de Santana'}.
        </p>
      </div>

      <div className="w-64 h-1 bg-[#222] rounded-full overflow-hidden">
        <div className="h-full bg-[#00FF7F] animate-progress shadow-[0_0_10px_#00FF7F]"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#00FF7F] selection:text-black font-sans">
      {/* Background ambient glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-emerald-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-emerald-900/5 rounded-full blur-[100px]"></div>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-xl tracking-tight cursor-pointer group" onClick={handleRestart}>
            <div className="bg-[#1A1A1A] p-2 rounded-lg border border-[#333] group-hover:border-[#00FF7F] transition-colors">
              <Building2 size={20} className="text-[#00FF7F]" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500">
              QUIZ.AI
            </span>
          </div>
          {step !== 'intro' && (
             <div className="flex items-center gap-2 text-xs font-mono text-[#00FF7F] bg-[#00FF7F]/10 px-4 py-1.5 rounded-full border border-[#00FF7F]/20">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF7F] animate-pulse"></div>
                {step === 'quiz' ? 'SYSTEM_ACTIVE' : step === 'loading' ? 'PROCESSING' : 'ANALYSIS_COMPLETE'}
             </div>
          )}
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {step === 'intro' && renderIntro()}
        {step === 'quiz' && (
          <Quiz 
            answers={answers} 
            setAnswers={setAnswers} 
            onComplete={handleQuizComplete} 
          />
        )}
        {step === 'loading' && renderLoading()}
        {step === 'results' && result && (
          <Results 
            result={result} 
            allProperties={MOCK_PROPERTIES} 
            onRestart={handleRestart}
          />
        )}
      </main>

      <footer className="relative z-10 text-center py-10 border-t border-white/5">
        <p className="text-neutral-600 text-xs uppercase tracking-widest">
          © 2024 Proprietary Real Estate Engine · Fast & Private
        </p>
      </footer>
      
      <style>{`
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-spin-reverse {
          animation: spin-reverse 3s linear infinite;
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default App;