import { QuizAnswers, Property, AnalysisResult, Recommendation } from '../types';

/**
 * MOTOR DE DECISÃO IMOBILIÁRIA (LOCAL AI)
 * 
 * Este serviço substitui a IA externa por um algoritmo determinístico 
 * baseado em regras de mercado imobiliário e pontuação ponderada.
 */

// Simula um atraso de processamento para dar a sensação de "pensamento"
const simulateProcessingDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const analyzeRealEstateScenario = async (
  answers: QuizAnswers,
  properties: Property[]
): Promise<AnalysisResult> => {
  
  // 1. Simular processamento (UX)
  await simulateProcessingDelay(1500);

  // 2. Calcular Score de Compra (0 a 100)
  let buyScore = 50; // Base neutra

  // Fator Tempo
  if (answers.tempo_permanencia === '<1') buyScore -= 30;
  else if (answers.tempo_permanencia === '1-3') buyScore -= 10;
  else if (answers.tempo_permanencia === '3-7') buyScore += 10;
  else if (answers.tempo_permanencia === '>=7') buyScore += 30;

  // Fator Financeiro (Entrada)
  const entryRatio = answers.entrada_disponivel / 500000; // Referência base de 500k
  if (entryRatio > 0.4) buyScore += 20; // Entrada robusta
  else if (entryRatio < 0.05) buyScore -= 15; // Quase sem entrada

  // Fator Motivação
  if (['Investimento', 'Patrimonio'].includes(answers.motivo_mudanca)) buyScore += 15;
  if (answers.motivo_mudanca === 'Independencia') buyScore -= 5; // Geralmente aluguel primeiro

  // Fator Urgência
  if (answers.urgencia === 'Imediato') buyScore -= 10; // Comprar rápido é difícil/arriscado

  // Normalizar score entre 0 e 100
  buyScore = Math.max(0, Math.min(100, Math.round(buyScore)));

  // 3. Determinar Decisão
  let decisao: 'COMPRAR' | 'ALUGAR' | 'AVALIAR';
  let justificativa = '';
  let ctaTexto = '';
  let ctaAcao = '';

  if (buyScore >= 65) {
    decisao = 'COMPRAR';
    justificativa = `Seu perfil indica solidez para aquisição. Com intenção de permanência de ${translateTime(answers.tempo_permanencia)} e capital disponível, comprar constrói patrimônio a longo prazo.`;
    ctaTexto = 'Agendar Visita a Imóveis à Venda';
    ctaAcao = 'agendar_venda';
  } else if (buyScore <= 40) {
    decisao = 'ALUGAR';
    justificativa = `O momento favorece a flexibilidade do aluguel. Dado o horizonte de ${translateTime(answers.tempo_permanencia)} e seu foco atual, evitar a imobilização de capital é a estratégia mais segura.`;
    ctaTexto = 'Ver Opções de Aluguel';
    ctaAcao = 'ver_aluguel';
  } else {
    decisao = 'AVALIAR';
    justificativa = 'Seu cenário está equilibrado. Você tem potencial de compra, mas o aluguel ainda oferece vantagens de liquidez. Recomendamos uma análise detalhada de crédito antes de decidir.';
    ctaTexto = 'Falar com Consultor Especialista';
    ctaAcao = 'falar_consultor';
  }

  // 4. Algoritmo de Match de Imóveis
  const recommendations: Recommendation[] = properties
    .map(property => {
      let matchScore = 0;
      let reasons: string[] = [];

      // Score: Localização (Peso Alto)
      if (answers.bairros.includes(property.bairro)) {
        matchScore += 40;
        reasons.push("Bairro desejado");
      } else {
        matchScore += 10; // Score base por ser na cidade
      }

      // Score: Tipo de Transação vs Decisão
      if (decisao === 'COMPRAR' && property.preco_venda > 0) {
        matchScore += 20;
      } else if (decisao === 'ALUGAR' && property.aluguel_mensal > 0) {
        matchScore += 20;
      }

      // Score: Quartos
      if (property.quartos === answers.quartos) {
        matchScore += 15;
        reasons.push("Tamanho ideal");
      } else if (property.quartos > answers.quartos) {
        matchScore += 10;
        reasons.push("Espaço extra");
      }

      // Score: Orçamento (Simplificado)
      if (decisao === 'ALUGAR') {
        if (property.aluguel_mensal <= answers.orcamento_mensal * 1.2) matchScore += 15;
      } else {
        // Para compra, assumimos que orçamento mensal paga parcela (~1% do valor financiado grosso modo)
        // ou verificamos se o preço total não é absurdo. 
        // Vamos usar uma logica simples de preço vs potencial.
        if (property.preco_venda < answers.orcamento_mensal * 200) matchScore += 15; 
      }

      // Normalizar Match
      matchScore = Math.min(99, matchScore);

      // Gerar frase de motivo
      let motivoFinal = reasons.length > 0 
        ? reasons.join(", ") + "."
        : "Boa oportunidade na região.";
      
      if (property.requer_reforma && answers.aceita_reforma === 'Nao') {
        matchScore -= 30;
        motivoFinal = "Requer reforma (atenção).";
      }

      return {
        id: property.id,
        titulo: property.titulo,
        match_score: matchScore,
        motivo_match: motivoFinal
      };
    })
    .sort((a, b) => b.match_score - a.match_score) // Ordenar por maior match
    .slice(0, 3); // Pegar top 3

  // 5. Retornar Resultado
  return {
    decisao,
    score_compra: buyScore,
    justificativa,
    recomendacoes: recommendations,
    cta: {
      texto_botao: ctaTexto,
      acao: ctaAcao
    },
    observacoes: "Cálculo baseado em algoritmo proprietário de análise de mercado local."
  };
};

// Helper para texto legível
function translateTime(val: string): string {
  if (val === '<1') return 'curto prazo';
  if (val === '1-3') return 'médio prazo';
  if (val === '3-7') return 'longo prazo';
  return 'longuíssimo prazo';
}
