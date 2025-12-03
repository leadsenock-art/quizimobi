export interface QuizAnswers {
  nome: string;
  orcamento_mensal: number;
  entrada_disponivel: number;
  bairros: string[];
  motivo_mudanca: string;
  tempo_permanencia: string;
  preferencia_imovel: 'apto' | 'casa';
  quartos: number;
  prioridade: string;
  urgencia: string;
  aceita_reforma: string;
  contato_optin: boolean;
}

export interface Property {
  id: string;
  titulo: string;
  bairro: string;
  preco_venda: number;
  aluguel_mensal: number;
  quartos: number;
  metragem: number;
  requer_reforma: boolean;
  latitude?: number;
  longitude?: number;
  image_url?: string;
}

export interface Recommendation {
  id: string;
  titulo: string;
  motivo_match: string;
  match_score: number;
}

export interface CTA {
  texto_botao: string;
  acao: string;
}

export interface AnalysisResult {
  decisao: 'ALUGAR' | 'COMPRAR' | 'AVALIAR';
  score_compra: number;
  justificativa: string;
  recomendacoes: Recommendation[];
  cta: CTA;
  observacoes?: string;
}

export type Step = 'intro' | 'quiz' | 'loading' | 'results';
