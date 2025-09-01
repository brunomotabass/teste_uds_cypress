# teste_uds_cypress
Teste Pratico para a UDS
Descrição
Este projeto contém testes automatizados para UI (SauceDemo) e API (Restful Booker) usando Cypress, seguindo as especificações do teste prático.

Requisitos do Projeto
Testes de UI (SauceDemo)
4.1 Login com credenciais válidas
4.3 Adicionar itens ao carrinho
4.5 Fluxo completo de checkout
4.7 Logout do sistema

Testes de API (Restful Booker)
5.1 Criar booking com sucesso
5.2 Buscar booking por firstname
5.3 Erro ao criar booking com payload inválido
5.4 Buscar por firstname inexistente
5.5 Atualizar booking existente
5.6 Deletar booking

Configuração
Pré-requisitos
Node.js (versão 18 ou superior)
npm
Google Chrome instalado

Instalação
1. Clone o repositório:
  git clone <url-do-repositorio>
  cd cypress-test-automation

2. Instale as dependências:
   npm install

3. Configure as variáveis de ambiente (opcional):
   # Copie o arquivo de exemplo e ajuste se necessário
    cp .env.example .env

Como Executar os Testes
Executar todos os testes (modo headless):
  npm test

Executar em modo interativo
  npm run cy:open

Executar apenas testes de UI
  npm run cy:run:ui

Executar apenas testes de API
  npm run cy:run:api

Executar testes específicos
  # Executar apenas testes de login
  npx cypress run --spec "cypress/e2e/ui/login.cy.js"

  # Executar apenas testes de API de booking
  npx cypress run --spec "cypress/e2e/api/booking.cy.js"

Estratégia de Testes
Testes de UI
  Page Object Model implementado para melhor manutenibilidade
  Uso de atributos data-test quando disponíveis
  Esperas inteligentes usando should() em vez de wait() fixos
  Comandos personalizados para ações comuns

Testes de API
  Testes diretos usando cy.request() para chamadas API
  Dados de teste organizados em arquivos JSON
  Manipulação adequada de tokens de autenticação
  Validações de status, schema e regras de negócio

Estrutura de Pastas
cypress/
├── e2e/
│   ├── ui/                 # Testes de interface
│   │   ├── login.cy.js     # Testes de login
│   │   ├── cart.cy.js      # Testes de carrinho
│   │   ├── checkout.cy.js  # Testes de checkout
│   │   └── logout.cy.js    # Testes de logout
│   └── api/                # Testes de API
│       ├── booking.cy.js   # Testes básicos de booking
│       └── booking-crud.cy.js # Testes CRUD completos
├── fixtures/               # Dados de teste
│   ├── users.json          # Credenciais de usuário
│   ├── booking-create.json # Dados para criar booking
│   └── booking-update.json # Dados para atualizar booking
├── support/
│   ├── pages/              # Page Objects
│   │   ├── login-page.js
│   │   ├── inventory-page.js
│   │   ├── cart-page.js
│   │   └── checkout-page.js
│   ├── commands.js         # Comandos customizados
│   └── e2e.js             # Configuração do Cypress
├── screenshots/           # Screenshots em caso de falha
├── videos/               # Gravações das execuções
└── downloads/            # Arquivos baixados

Relatórios
Relatórios HTML
Para gerar relatórios HTML após a execução:
  npm run generate:report
Os relatórios serão gerados em cypress/reports/

Screenshots e Videos
Screenshots: Capturados automaticamente em falhas (cypress/screenshots/)
Videos: Gravados para cada execução (cypress/videos/)

Relatórios CI
No GitHub Actions, os artefatos são disponibilizados:
Screenshots e videos como cypress-artifacts
Relatórios HTML como html-report

Configuração CI/CD
O projeto inclui configuração para GitHub Actions (.github/workflows/cypress.yml):
Executa testes em pushes para main/master e PRs
Usa Node.js 18
Gera e disponibiliza relatórios automaticamente
Armazena screenshots e videos das execuções

Sites Testados
Testes de UI
URL: https://www.saucedemo.com

Usuários de Teste:
standard_user / secret_sauce (válido)
locked_out_user / secret_sauce (bloqueado)
invalid_user / invalid_password (inválido)

Testes de API
URL: https://restful-booker.herokuapp.com
Autenticação: admin / password123
Endpoints: Operações CRUD de Booking

Comandos Customizados
Comandos de UI
cy.login(username, password) // Login rápido
cy.getByDataTest(selector)   // Seletor por data-test
cy.safeClick(element)        // Clique seguro com verificação
cy.logoutSauceDemo()         // Logout com tratamento de animação

Comandos de API
cy.apiRequest(method, url, body, auth) // Request padronizado

Limitações e Próximos Passos
Limitações Atuais
Testes dependem de serviços externos (SauceDemo e Restful Booker)
Não inclui testes de ordenação de produtos (4.6)
Não há testes de performance ou carga

Melhorias Futuras
Adicionar mais cenários de borda para cada funcionalidade
Implementar testes cross-browser (Chrome, Firefox, Edge)
Adicionar testes de acessibilidade com axe-core
Implementar testes de performance com Cypress
Configurar testes em paralelo para reduzir tempo de execução
Adicionar mais validações de schema para responses API
Implementar mock de serviços para testes offline

Se tivesse mais tempo:
Adicionaria testes de ordenação (4.6)
Implementaria testes de responsividade
Criaria mais cenários de erro e validações
Adicionaria testes de usabilidade

Solução de Problemas
Erros Comuns
Elemento não visível: Use cy.get(element).should('be.visible') antes de interagir
Timeout em animações: Aumente o timeout com { timeout: 10000 }
API indisponível: Verifique se https://restful-booker.herokuapp.com está online

Dicas de Debug
  # Executar com debug habilitado
  npx cypress run --headed --browser chrome
  
  # Ver logs detalhados
  DEBUG=cypress:* npx cypress run

Suporte
Se encontrar problemas:
Verifique se todos os sites-alvo estão acessíveis
Confirme que está usando Node.js 18+
Execute npm install para garantir dependências atualizadas
Consulte os relatórios em cypress/reports/ para detalhes de falhas
