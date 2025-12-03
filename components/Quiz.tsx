import React, { useState } from 'react';
import { QuizAnswers } from '../types';
import { AVAILABLE_NEIGHBORHOODS } from '../constants';
import { ArrowRight, ArrowLeft, CheckCircle2, DollarSign } from 'lucide-react';

interface QuizProps {
  answers: QuizAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<QuizAnswers>>;
  onComplete: () => void;
}

const Quiz: React.FC<QuizProps> = ({ answers, setAnswers, onComplete }) => {
  const [step, setStep] = useState(1);

  const handleChange = (field: keyof QuizAnswers, value: any) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const handleNeighborhoodToggle = (neighborhood: string) => {
    setAnswers(prev => {
      const current = prev.bairros;
      if (current.includes(neighborhood)) {
        return { ...prev, bairros: current.filter(n => n !== neighborhood) };
      }
      return { ...prev, bairros: [...current, neighborhood] };
    });
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  // Reusable input style
  const inputClass = "w-full bg-[#121212] border border-[#333] text-white p-4 rounded-lg focus:border-[#00FF7F] focus:ring-1 focus:ring-[#00FF7F] outline-none transition-all placeholder:text-neutral-700";
  const labelClass = "block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2";

  const renderStep1 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="mb-6 border-l-2 border-[#00FF7F] pl-4">
        <h2 className="text-3xl font-bold text-white">Dados Financeiros</h2>
        <p className="text-neutral-500">Calibrando parâmetros econômicos.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className={labelClass}>Nome do Cliente</label>
          <input
            type="text"
            className={inputClass}
            value={answers.nome}
            onChange={(e) => handleChange('nome', e.target.value)}
            placeholder="Ex: Ana Souza"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Orçamento Mensal</label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-4 h-5 w-5 text-neutral-500" />
              <input
                type="number"
                className={`${inputClass} pl-12`}
                value={answers.orcamento_mensal}
                onChange={(e) => handleChange('orcamento_mensal', Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Capital Inicial (Entrada)</label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-4 h-5 w-5 text-neutral-500" />
              <input
                type="number"
                className={`${inputClass} pl-12`}
                value={answers.entrada_disponivel}
                onChange={(e) => handleChange('entrada_disponivel', Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-6">
        <button
          onClick={nextStep}
          disabled={!answers.nome}
          className="flex items-center gap-2 bg-[#00FF7F] text-black px-8 py-3 rounded-md font-bold hover:bg-[#00FF7F]/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(0,255,127,0.3)]"
        >
          SEGUINTE <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8 animate-fadeIn">
       <div className="mb-6 border-l-2 border-[#00FF7F] pl-4">
        <h2 className="text-3xl font-bold text-white">Especificações</h2>
        <p className="text-neutral-500">Definição de alvo imobiliário.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className={labelClass}>Zonas de Interesse</label>
          <div className="flex flex-wrap gap-3">
            {AVAILABLE_NEIGHBORHOODS.map(bairro => (
              <button
                key={bairro}
                onClick={() => handleNeighborhoodToggle(bairro)}
                className={`px-5 py-2.5 rounded-md text-sm font-medium border transition-all duration-300 ${
                  answers.bairros.includes(bairro)
                    ? 'bg-[#00FF7F] border-[#00FF7F] text-black shadow-[0_0_10px_rgba(0,255,127,0.3)]'
                    : 'bg-[#121212] border-[#333] text-neutral-400 hover:border-neutral-500 hover:text-white'
                }`}
              >
                {bairro}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Tipologia</label>
            <select
              className={inputClass}
              value={answers.preferencia_imovel}
              onChange={(e) => handleChange('preferencia_imovel', e.target.value)}
            >
              <option value="apto">Apartamento</option>
              <option value="casa">Casa</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Dormitórios</label>
            <input
              type="number"
              className={inputClass}
              value={answers.quartos}
              min={1}
              max={5}
              onChange={(e) => handleChange('quartos', Number(e.target.value))}
            />
          </div>
        </div>

        <div>
            <label className={labelClass}>Status / Reforma</label>
            <div className="grid grid-cols-3 gap-4 mt-2">
                {['Sim', 'Não', 'Parcial'].map((opt) => (
                    <label key={opt} className={`cursor-pointer border rounded-md p-4 text-center transition-all ${
                        answers.aceita_reforma === opt 
                        ? 'border-[#00FF7F] bg-[#00FF7F]/10 text-[#00FF7F]' 
                        : 'border-[#333] bg-[#121212] text-neutral-500 hover:border-neutral-500'
                    }`}>
                        <input 
                            type="radio" 
                            name="reforma" 
                            value={opt} 
                            checked={answers.aceita_reforma === opt}
                            onChange={(e) => handleChange('aceita_reforma', e.target.value)}
                            className="hidden"
                        />
                        <span className="text-sm font-bold">{opt}</span>
                    </label>
                ))}
            </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 text-neutral-500 hover:text-white px-4 py-3 transition-colors uppercase font-medium text-sm"
        >
          <ArrowLeft size={16} /> Voltar
        </button>
        <button
          onClick={nextStep}
          className="flex items-center gap-2 bg-[#00FF7F] text-black px-8 py-3 rounded-md font-bold hover:bg-[#00FF7F]/90 transition-colors hover:shadow-[0_0_15px_rgba(0,255,127,0.3)]"
        >
          SEGUINTE <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="mb-6 border-l-2 border-[#00FF7F] pl-4">
        <h2 className="text-3xl font-bold text-white">Horizonte</h2>
        <p className="text-neutral-500">Projeção de tempo e objetivos.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className={labelClass}>Tempo de Permanência</label>
          <select
            className={inputClass}
            value={answers.tempo_permanencia}
            onChange={(e) => handleChange('tempo_permanencia', e.target.value)}
          >
            <option value="<1">Curto Prazo (&lt; 1 ano)</option>
            <option value="1-3">Médio Prazo (1-3 anos)</option>
            <option value="3-7">Longo Prazo (3-7 anos)</option>
            <option value=">=7">Definitivo (&gt; 7 anos)</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Driver Principal</label>
          <select
            className={inputClass}
            value={answers.motivo_mudanca}
            onChange={(e) => handleChange('motivo_mudanca', e.target.value)}
          >
            <option value="Trabalho">Carreira / Estudo</option>
            <option value="Familia">Família / Casamento</option>
            <option value="Investimento">Investimento Puro</option>
            <option value="Patrimonio">Construção Patrimonial</option>
            <option value="Independencia">Independência</option>
          </select>
        </div>

         <div>
          <label className={labelClass}>Timeline / Urgência</label>
           <select
            className={inputClass}
            value={answers.urgencia}
            onChange={(e) => handleChange('urgencia', e.target.value)}
          >
            <option value="Imediato">Imediato (ASAP)</option>
            <option value="1-3 meses">1 a 3 meses</option>
            <option value="3-6 meses">3 a 6 meses</option>
            <option value="+6 meses">Mais de 6 meses</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 text-neutral-500 hover:text-white px-4 py-3 transition-colors uppercase font-medium text-sm"
        >
          <ArrowLeft size={16} /> Voltar
        </button>
        <button
          onClick={onComplete}
          className="flex items-center gap-2 bg-[#00FF7F] text-black px-8 py-3 rounded-md font-bold hover:bg-[#00FF7F]/90 transition-all hover:shadow-[0_0_20px_rgba(0,255,127,0.5)]"
        >
          <CheckCircle2 size={20} /> PROCESSAR
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto bg-[#0F0F0F] rounded-2xl shadow-2xl p-8 border border-[#222] relative overflow-hidden">
        {/* Decorative corner light */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF7F]/5 blur-[60px] rounded-full pointer-events-none"></div>

        <div className="flex justify-center mb-10">
            <div className="flex items-center gap-3">
                {[1, 2, 3].map(i => (
                    <div 
                        key={i} 
                        className={`h-1.5 rounded-full transition-all duration-500 ${step === i ? 'w-12 bg-[#00FF7F] shadow-[0_0_10px_#00FF7F]' : 'w-4 bg-[#333]'}`} 
                    />
                ))}
            </div>
        </div>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
};

export default Quiz;