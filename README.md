# Weather Application - Desafio Front-End

## Descrição do Projeto
Esta aplicação é uma plataforma de monitoramento meteorológico desenvolvida como resposta ao desafio técnico de front-end. O sistema permite a listagem de cidades predefinidas e a visualização detalhada de suas condições climáticas em tempo real, consumindo dados de uma API meteorológica externa. O projeto foi projetado com foco em alta fidelidade de layout, design responsivo multi-breakpoint e rigorosa cobertura de testes unitários.

## Demonstração e Hospedagem
A aplicação foi submetida ao pipeline de implantação contínua e está disponível publicamente.
* **Link de Produção:** [Acesse a aplicação na Vercel](https://vercel.app)
* **Design de Referência:** [Figma Layout](https://www.figma.com/design/4lcFZPwbuAxjBiUutFK9Qd)

---

## Tecnologias e Arquitetura
A pilha de tecnologia foi selecionada para garantir escalabilidade, performance SSR/SSG e manutenibilidade do código:

* **Framework Principal:** React com Next.js (App Router)
* **Linguagem:** TypeScript para tipagem estática e segurança em tempo de compilação
* **Estilização:** Tailwind CSS para consistência de design e responsividade fluida
* **Gerenciamento de Estado:** Zustand para uma store leve e desacoplada dos componentes de interface
* **Ambiente Isolado:** Docker e Docker Compose para padronização do ambiente de desenvolvimento e produção

---

## Requisitos Implementados

### Escopo e Dados Meteorológicos
* **Mapeamento de Cidades:** Integração completa para as localidades especificadas:
  * Madrid (ES)
  * Fairbanks (US)
  * Londres (GB)
  * Recife (BR)
  * Vancouver (CA)
  * Yakutsk (RU)
* **Provedor de Dados:** [WeatherAPI](https://www.weatherapi.com)
* **Regras de Período Horário:** Renderização da previsão segmentada conforme as diretrizes do projeto:
  * **Dawn (Madrugada):** 03:00
  * **Morning (Manhã):** 09:00
  * **Afternoon (Tarde):** 15:00
  * **Night (Noite):** 21:00

### Interface e Responsividade
* **Fidelidade ao Layout:** Implementação precisa dos componentes visuais com alternância dinâmica de ícones baseada na temperatura (limiares de congelamento) e períodos do dia (dia/noite).
* **Breakpoints Suportados:** Adaptação de layout testada para Smartphone, Tablet e Desktop.

---

## Qualidade de Código e Testes Unitários
O projeto adota uma abordagem orientada à estabilidade, garantindo o funcionamento dos fluxos principais, variações climáticas extremas e fallbacks de erro através de testes unitários automatizados com Jest e React Testing Library.

* **Métrica Geral de Cobertura:** **96.7% de cobertura (All Files)**
* **Componentes Críticos:** Arquivos de renderização de interface e lógica de negócios atingiram cobertura máxima ou próxima do limite superior.

Para rodar a suite de testes localmente com o relatório de cobertura:
```bash
npm run test -- --coverage 
```

## Instruções de Execução
### Pré-requisitos
* Node.js version: 22.21.1 | Versão recomendada: 20 ou superior
* Docker version: 27.3.1 | Versão recomendada:27 ou superior (opcional: execução em container)
* API Key válida na Weather API (necessária criação de conta)

### Opção 1: Execução Nativa (Desenvolvimento)
1. Instale as dependências do projeto:

```bash
npm install
```
2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
3. Acesse a aplicação em http://localhost:3000

### Opção 2: Execução via Docker (Container)
1. Construir e iniciar o container:
```bash
docker compose up
```
2. Acesse a aplicação em http://localhost:3000