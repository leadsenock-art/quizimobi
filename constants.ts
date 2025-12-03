import { Property, QuizAnswers } from './types';

export const INITIAL_ANSWERS: QuizAnswers = {
  nome: '',
  orcamento_mensal: 3000,
  entrada_disponivel: 50000,
  bairros: [],
  motivo_mudanca: 'Trabalho',
  tempo_permanencia: '3-7',
  preferencia_imovel: 'apto',
  quartos: 2,
  prioridade: 'localizacao',
  urgencia: '1-3 meses',
  aceita_reforma: 'Parcial',
  contato_optin: true,
};

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "P001",
    titulo: "Apartamento Santa Mônica Residence",
    bairro: "Santa Mônica",
    preco_venda: 550000,
    aluguel_mensal: 2800,
    quartos: 3,
    metragem: 90,
    requer_reforma: false,
    image_url: "https://picsum.photos/400/300?random=1"
  },
  {
    id: "P002",
    titulo: "Casa em Condomínio no SIM",
    bairro: "SIM",
    preco_venda: 750000,
    aluguel_mensal: 3500,
    quartos: 3,
    metragem: 130,
    requer_reforma: false,
    image_url: "https://picsum.photos/400/300?random=2"
  },
  {
    id: "P003",
    titulo: "Apartamento Compacto Muchila",
    bairro: "Muchila",
    preco_venda: 280000,
    aluguel_mensal: 1400,
    quartos: 2,
    metragem: 55,
    requer_reforma: false,
    image_url: "https://picsum.photos/400/300?random=3"
  },
  {
    id: "P004",
    titulo: "Village Papagaio - Oportunidade",
    bairro: "Papagaio",
    preco_venda: 320000,
    aluguel_mensal: 1600,
    quartos: 2,
    metragem: 70,
    requer_reforma: false,
    image_url: "https://picsum.photos/400/300?random=4"
  },
  {
    id: "P005",
    titulo: "Casa Térrea Tomba (Precisa Reforma)",
    bairro: "Tomba",
    preco_venda: 180000,
    aluguel_mensal: 900,
    quartos: 3,
    metragem: 80,
    requer_reforma: true,
    image_url: "https://picsum.photos/400/300?random=5"
  }
];

export const AVAILABLE_NEIGHBORHOODS = [
  "Santa Mônica",
  "SIM",
  "Papagaio",
  "Brasília",
  "Capuchinhos",
  "Tomba",
  "Cidade Nova",
  "Centro",
  "Muchila",
  "Campo Limpo",
  "Conceição",
  "Mangabeira",
  "Calumbi",
  "Queimadinha",
  "Gabriela",
  "Parque Ipê",
  "Jardim Cruzeiro",
  "Rua Nova",
  "Lagoa Grande",
  "Aviário",
  "Pedra do Descanso",
  "CASEB",
  "Campo do Gado Velho",
  "Serraria Brasil",
  "Ponto Central",
  "Pampalona",
  "Lagoa Salgada",
  "Cruzeiro",
  "Subaé",
  "Novo Horizonte"
];