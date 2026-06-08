export const marketDataMock = [
  { id: 1, crop: "Soja (Saca 60kg)", price: "R$ 135,50", variation: "+1.2%", trend: "up" },
  { id: 2, crop: "Milho (Saca 60kg)", price: "R$ 58,20", variation: "-0.5%", trend: "down" },
  { id: 3, crop: "Trigo (Ton)", price: "R$ 1.250,00", variation: "+0.8%", trend: "up" },
  { id: 4, crop: "Dólar Comercial", price: "R$ 5,12", variation: "-0.2%", trend: "down" },
];

export const farmDataMock = {
  "Sorriso, MT": {
    riskLevel: "safe",
    temperature: "28°C",
    soilMoisture: "75%",
    ndvi: 0.82,
    insight: "As condições de umidade indicam um cenário 85% favorável para o plantio. Janela climática ideal.",
    history: [ { month: "Jan", rain: 240 }, { month: "Fev", rain: 210 }, { month: "Mar", rain: 180 }, { month: "Abr", rain: 90 } ],
    climate: { precipitation: "12 mm", wind: "18 km/h NE", solarRadiation: "Moderada", alert: null },
    crop: {
      estimatedYield: "68.5", yieldVariation: "+4.2%", yieldTrend: "up", windowStart: "15 Set", windowEnd: "20 Out",
      recommendation: "O solo atingiu a temperatura e umidade ideais no talhão Norte. Sugerimos iniciar o plantio das cultivares de ciclo precoce."
    },
    // DADOS DO ZARC ADICIONADOS AQUI
    zarc: {
      precoce: { risk: "Baixo (15%)", status: "Recomendado", color: "emerald", message: "Ciclo ideal. A colheita ocorrerá antes do período de seca severa." },
      medio: { risk: "Médio (35%)", status: "Atenção", color: "amber", message: "Risco moderado de veranico durante o enchimento de grãos." },
      tardio: { risk: "Alto (65%)", status: "Não Recomendado", color: "red", message: "Alto risco de perda por estresse hídrico no final do ciclo." }
    }
  },
  "Ribeirão Preto, SP": {
    riskLevel: "danger",
    temperature: "35°C",
    soilMoisture: "18%",
    ndvi: 0.45,
    insight: "Alerta de estresse hídrico agudo. Recomendamos adiar o plantio e acionar sistemas de irrigação.",
    history: [ { month: "Jan", rain: 180 }, { month: "Fev", rain: 150 }, { month: "Mar", rain: 100 }, { month: "Abr", rain: 20 } ],
    climate: {
      precipitation: "0 mm", wind: "12 km/h NO", solarRadiation: "Extrema",
      alert: { type: "danger", title: "Risco de Queimadas", message: "Umidade do ar abaixo de 20% e radiação extrema." }
    },
    crop: {
      estimatedYield: "45.2", yieldVariation: "-12.5%", yieldTrend: "down", windowStart: "Aguardando", windowEnd: "Indefinido",
      recommendation: "Risco de perda severa se o plantio for iniciado agora. Aguarde a próxima frente fria."
    },
    zarc: {
      precoce: { risk: "Alto (80%)", status: "Não Recomendado", color: "red", message: "Falta de umidade no solo impedirá a germinação adequada." },
      medio: { risk: "Crítico (95%)", status: "Não Recomendado", color: "red", message: "Perda quase certa sem irrigação pesada." },
      tardio: { risk: "Alto (70%)", status: "Atenção", color: "amber", message: "Pode haver melhora no clima no final do ciclo, mas o início é muito arriscado." }
    }
  },
  "Passo Fundo, RS": {
    riskLevel: "warning",
    temperature: "14°C",
    soilMoisture: "95%",
    ndvi: 0.68,
    insight: "Solo encharcado. Risco de doenças fúngicas nas culturas de inverno devido à alta umidade.",
    history: [ { month: "Jan", rain: 120 }, { month: "Fev", rain: 140 }, { month: "Mar", rain: 200 }, { month: "Abr", rain: 250 } ],
    climate: {
      precipitation: "45 mm", wind: "48 km/h S", solarRadiation: "Baixa",
      alert: { type: "warning", title: "Alerta de Ventos", message: "Rajadas acima de 45km/h." }
    },
    crop: {
      estimatedYield: "55.0", yieldVariation: "-2.1%", yieldTrend: "down", windowStart: "01 Out", windowEnd: "15 Nov",
      recommendation: "Janela de plantio atrasada devido ao excesso de chuvas."
    },
    zarc: {
      precoce: { risk: "Médio (40%)", status: "Atenção", color: "amber", message: "Risco de geada tardia na fase inicial de desenvolvimento." },
      medio: { risk: "Baixo (20%)", status: "Recomendado", color: "emerald", message: "Ciclo mais seguro. Evita o pico de chuvas na colheita e geadas no plantio." },
      tardio: { risk: "Médio (45%)", status: "Atenção", color: "amber", message: "Excesso de chuvas previsto para o período da colheita." }
    }
  }
};

export const routeDataMock = {
  "Sorriso, MT-Paranaguá, PR": { status: "blocked", reason: "Chuvas intensas bloqueando trecho da BR-163.", suggestion: "Redirecionar frota." },
  "Ribeirão Preto, SP-Santos, SP": { status: "clear", reason: "Condições normais de tráfego.", suggestion: "Rota liberada." }
};