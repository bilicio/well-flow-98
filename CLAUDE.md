- Crie um web app de bem‑estar estilo Gympass (B2B2C) no qual colaboradores assinam um plano e podem frequentar locais/parceiros (cultura, esporte, terapias, oficinas) para promover bem‑estar e prevenir burnout. Inclua gamificação, check‑in presencial, marketplace de parceiros, assinaturas, relatórios para RH e curadoria. O foco inicial é web responsivo (PWA), com API pública para apps móveis.

Contexto e referência do produto
Plataforma de bem‑estar corporativo com foco em cultura + dados + gamificação.
Diferenciais: trilha de desenvolvimento, check‑in em experiências presenciais, rede de parceiros com capacidade ociosa, e futura tokenização / reputação (feature opcional, ativável na Fase 2).
Modelo B2B (empresas assinam para colaboradores) com possibilidade de B2C no futuro.
Perfis de usuário
Colaborador (end user) – navega pelo catálogo, reserva/vai a atividades presenciais, faz check‑in, acumula pontos/recompensas.
RH (empresa cliente) – gerencia elegibilidade/planos, acompanha adesão, engajamento e indicadores de bem‑estar.
Parceiro (fornecedor) – cadastra espaços/atividades, configura lotes/horários, verifica check‑ins e capacidade.
Admin (plataforma) – curadoria, aprovação de parceiros, gestão de planos, conteúdo e compliance.
Fluxos essenciais (MVP)
Onboarding do colaborador

SSO / convite da empresa → Cadastro → Seleção de interesses → Tour inicial → Liberação do plano.
Descoberta e reserva

Catálogo com filtros (tipo de atividade, localização/raio, datas, preço incluso no plano, acessibilidade), página do parceiro com fotos, descrição, instruções, vagas.
Reserva (se necessário) e QR de check‑in.
Check‑in presencial

Via QR Code (app/partner) ou NFC (opcional). Regras antifraude: geofence, horário, 1 check‑in/dia por atividade.
Gamificação

Pontos por check‑in + trilhas/níveis + badges. Missões semanais (ex.: “Desafio do Burnout”: 3 atividades/semana focadas em stress‑relief). Loja de recompensas (vouchers/benefícios).
Painel do RH

Métricas de adesão, frequência, distribuição por tipo de atividade, heatmap por região, tracking de trilhas/níveis; export CSV/Excel e API.
Portal do parceiro

Cadastro/edição de atividades, agenda, política de no‑show, leitura/validação de QR, capacidade, repasse financeiro.
Curadoria e conteúdo

Trilhas temáticas (ex.: anti‑burnout, criatividade, social), recomendações personalizadas por interesses/uso.
Requisitos funcionais (detalhados)
Autenticação/Autorização

SSO (OAuth/OIDC) com provedores corporativos + login por e‑mail.
Convites por domínio/CSV; papéis: colaborador, RH, parceiro, admin.
Planos e elegibilidade

Planos: Básico/Plus/Corporate; regras de acesso a atividades por plano; quotas mensais; upgrade/downgrade.
Catálogo e busca

Cards com distância, nota, tags (relaxamento, arte, movimento, social), filtros e ordenação; mapa interativo.
Reserva e presença

Reserva gratuita (inclusa no plano) ou com coparticipação; espera/lista de espera; políticas de no‑show.
Check‑in: QR one‑time + geofence + janela de tolerância; verificação pelo parceiro.
Gamificação

Sistema de pontos/níveis; badges; missões; ranking interno (opt‑in); recompensas trocáveis.
Pagamentos

Cobrança recorrente da empresa (faturamento/nota fiscal) + opção cartão corporativo; split/repasse para parceiros.
Relatórios RH

KPIs: adesão, MAU, check‑ins por categoria, trilhas concluídas, engajamento por unidade/área, no‑show rate.
Portal Parceiro

CRUD de atividades/agenda, cap. máxima, políticas; scanner QR; relatórios de presença; saldo a receber.
Admin

Curadoria (aprovação de parceiros), CMS leve (páginas e trilhas), gestão de planos, cupons/benefícios, suporte.
Notificações

E‑mail/push: confirmação de reserva, lembrete de check‑in, conclusão de missão, repasses.
Requisitos não‑funcionais
PWA responsivo (mobile‑first), tempo de 1ª carga < 2s em 4G; SEO básico; i18n pt‑BR (en‑US pronto para expansão).
Observabilidade: logs estruturados, tracing, métricas; feature flags.
Stack sugerida
Frontend: React JS, TypeScript, Tailwind, TanStack Query, Mapas (Mapbox/Leaflet), PWA, Vite para libs.
Backend: Node.js (NestJS) + TypeScript, PostgreSQL + Prisma, Redis (cache/filas), Webhooks.
Pagamentos: Stripe/Asaas (assinaturas, split, repasses).
Auth: OIDC (Auth.js/Keycloak), RBAC por escopos.
Arquitetura: Monorepo (pnpm) com packages compartilhados; Infra IaC (Terraform); deploy em containers.
Modelo de dados (entidades principais)
User(id, companyId, role, name, email, phone, interests[], consentFlags, locale)
Company(id, name, cnpj, billingProfile, planId, seats)
Plan(id, name, price, rules, quotas)
Partner(id, name, cnpj, address, geo, tags[], rating, documents)
Venue(id, partnerId, address, geo, facilities, photos[])
Activity(id, venueId, category, title, description, start/end, capacity, requiresBooking, tags[])
Booking(id, userId, activityId, status, createdAt, noShow, waitlist)
Checkin(id, userId, activityId, scannedBy, method, geo, ts)
Reward(id, name, cost, stock) / UserReward(userId, rewardId, status)
PointLedger(id, userId, reason, points, ts)
Invoice/Payout(id, companyId/partnerId, period, amount, status)
API (exemplos de contratos)
POST /auth/login – email/SSO
GET /catalog?lat&lng&radius&category&plan – lista atividades
POST /bookings – cria reserva
POST /checkins/validate – valida QR + geo + janela
GET /rh/metrics?from&to&groupBy – KPIs para RH
POST /partners/activities – CRUD parceiro
Política de erros: códigos HTTP + corpo { code, message, details }. Idempotência em reservas/check‑ins.

Gamificação e “Desafio do Burnout” (trilha)
Missões semanais: mínimo de X check‑ins em categorias anti‑burnout (ex.: relaxamento, arte, movimento, conexão social).
Pontos extras por constância; badge ao completar 4 semanas; recompensas configuráveis.
Feed de progresso e lembretes inteligentes (evitar no‑show).
Painéis
RH: adesão (% usuários ativos), média de check‑ins/usuário, categorias mais usadas, mapa de calor por cidade, evolução semanal, no‑show, trilhas concluídas, export.
Parceiro: ocupação por faixa horária, no‑show, receita estimada, repasses.
Aceite (MVP)
Usuário encontra atividade próxima, reserva e faz check‑in com QR + geo.
Pontos/nível atualizam imediatamente após check‑in.
RH visualiza relatórios de engajamento por período e exporta CSV.
Parceiro consulta agenda e valida QR no ato.
Admin aprova parceiro e publica atividade em < 24h.
Roadmap
Fase 1 (MVP): catálogo, reservas, check‑in, gamificação básica, portal parceiro, painel RH, billing B2B.
Fase 2 (opcional): reputação/token (pontuação on‑chain, badges raros), marketplace de prêmios estendidos.
Entrega esperada do modelo (quando gerar código)
Monorepo inicial com apps web e api.
Páginas: Home, Catálogo (lista/Mapa), Detalhe do Parceiro/Atividade, Reserva, QR/Check‑in, Perfil & Progresso, Painel RH (mínimo 4 gráficos), Portal Parceiro (CRUD + Scanner QR), Admin (aprovação/curadoria).
Seeds de dados (parceiros/atividades fictícias) e scripts dev/build/start.
Estilo de UX/UI
Design minimalista, acessível, com foco em clareza e motivação: barra de progresso, cards de trilha, feedbacks positivos, micro‑animações leves e contraste adequado.

Instrução ao gerador de código/IA
Você é uma equipe sênior full‑stack. Gere a arquitetura inicial, schemas, endpoints e telas conforme os requisitos acima. Onde houver ambiguidade, escolha padrões de mercado e deixe TODOs comentados.

Foque o desenvolvimento por enquanto só no frontend.