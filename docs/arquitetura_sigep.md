# Arquitetura do SIGEP - Documento Tecnico

## Visao Geral

O SIGEP (Sistema Integrado de Gestao de Exploracao e Producao) e uma aplicacao web monolitica desenvolvida em Django, responsavel pelo gerenciamento das operacoes offshore da PetroNac.

## Historico

| Ano | Marco |
|-----|-------|
| 2005 | Primeira versao (Django 1.6, Python 2.7) |
| 2008 | Migrado para Django 1.8 |
| 2012 | Adicionado modulo de Conformidade ANP |
| 2014 | Adicionado modulo SisFauna |
| 2016 | Contrato com TechBrazil para modernizacao |
| 2017 | Migrado para Django 2.0, Python 3.6 |
| 2018 | Atualizado para Django 2.2 LTS |
| 2020 | TechBrazil encerrou contrato - sistema em manutencao minima |
| 2021 | Tentativa de migracao para Django 3.x - abandonada |

## Arquitetura

```
                    +-------------------+
                    |   Load Balancer   |
                    |   (HAProxy)       |
                    +-------------------+
                           |
                    +-------------------+
                    |   Gunicorn        |
                    |   (3 workers)     |
                    +-------------------+
                           |
                    +-------------------+
                    |   Django 2.2      |
                    |   (SIGEP App)     |
                    +-------------------+
                    /       |          \
           +--------+  +--------+  +--------+
           | PostgreSQL| | Redis  | | S3     |
           | 12       | | 6      | | (AWS)  |
           +--------+  +--------+  +--------+
                           |
                    +-------------------+
                    |   Celery Worker   |
                    |   (Relatorios)    |
                    +-------------------+
```

## Modulos Principais

### 1. Painel (Dashboard)
- Visualizacao em tempo real de producao
- Metricas: barris/dia, gas m3/dia, corte de agua, pressao
- Dados agregados por bacia e campo

### 2. Pocos
- Cadastro de pocos offshore
- Historico de producao por poco
- Status: Ativo, Inativo, Manutencao

### 3. Dutos
- Monitoramento de oleodutos e gasodutos
- Leituras de vazao, pressao e temperatura
- Diagrama esquematico da rede de dutos

### 4. Conformidade ANP
- Geracao automatica de relatorios regulatorios
- Exportacao em PDF (ReportLab) e Excel (openpyxl)
- Historico de submissoes a ANP

### 5. Telemetria SCADA
- API REST para recepcao de dados de sensores
- Protocolo JSON sobre HTTPS
- Compativel com sistemas SCADA legados

### 6. SisFauna
- Registro de avistamentos de fauna marinha
- Conformidade com IBAMA/ICMBio
- CRUD completo de observacoes

## Banco de Dados

### Modelo ER (Simplificado)

```
Poco (Well)
  |-- nome, bacia, campo, profundidade
  |-- status, data_inicio, coordenadas
  |-- tipo_elevacao
  |
  |-- Producao (Production) [1:N]
        |-- data, barris_por_dia
        |-- gas_m3_dia, corte_agua_pct
        |-- pressao_psi

Duto (Pipeline)
  |-- nome, origem, destino
  |-- extensao_km, diametro_pol
  |-- status, pressao_operacao
  |
  |-- LeituraDuto (Reading) [1:N]
        |-- timestamp, vazao
        |-- pressao, temperatura

RelatorioConformidade (Report)
  |-- tipo, data_geracao
  |-- periodo_inicio, periodo_fim
  |-- status, arquivo_pdf

ObservacaoFauna (Sighting)
  |-- especie, data_observacao
  |-- plataforma, coordenadas
  |-- observador, notas
```

## Endpoints Principais

| Rota | Metodo | Descricao |
|------|--------|-----------|
| /login/ | GET/POST | Autenticacao |
| /painel/ | GET | Dashboard |
| /pocos/ | GET | Inventario de pocos |
| /dutos/ | GET | Monitoramento de dutos |
| /conformidade/ | GET | Relatorios ANP |
| /telemetria/api/ | POST | Recepcao SCADA |
| /fauna/ | GET/POST | SisFauna |
| /usuarios/ | GET | Gerenciamento |

## Divida Tecnica Conhecida

1. Django 2.2 em fim de vida (EOL desde abril 2022)
2. Diversas bibliotecas com vulnerabilidades conhecidas
3. Credenciais hardcoded em settings.py
4. Ausencia de testes automatizados
5. Codigo sem type hints
6. Logs via print() ao inves de logging
7. Sem CI/CD (deploy manual via SSH)
8. Documentacao desatualizada (ultimo update 2018)

## Responsaveis

- **Proprietario**: Diretoria de TI - PetroNac
- **Desenvolvimento Original**: TechBrazil Consultoria LTDA (2016-2018)
- **Manutencao Atual**: Equipe interna TI (suporte minimo)

---

*Documento de uso interno - PetroNac S.A.*
*Classificacao: RESTRITO*
*Ultima revisao: Novembro 2023*
