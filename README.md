# SIGEP - Sistema Integrado de Gestao de Exploracao e Producao

## Sobre

O SIGEP e o sistema principal de gestao de operacoes offshore da **PetroNac - Petrolera Nacional S.A.**, utilizado desde 2005 para monitoramento de pocos, producao, dutos e conformidade regulatoria.

## Modulos

| Modulo | Descricao | Status |
|--------|-----------|--------|
| **Painel** | Dashboard principal com metricas de producao em tempo real | Ativo |
| **Pocos** | Inventario e monitoramento de pocos offshore | Ativo |
| **Dutos** | Monitoramento de oleodutos e gasodutos | Ativo |
| **Conformidade** | Geracao de relatorios regulatorios ANP | Ativo |
| **Telemetria** | API para recepcao de dados SCADA | Ativo |
| **SisFauna** | Monitoramento ambiental de fauna | Ativo |
| **Usuarios** | Gerenciamento de acessos ao sistema | Ativo |

## Requisitos Tecnicos

- **Framework**: Django 2.2.28 (LTS)
- **Banco de Dados**: PostgreSQL 12 (producao) / SQLite (desenvolvimento)
- **Cache**: Redis 6
- **Processamento Assincrono**: Celery 5.1
- **Servidor WSGI**: Gunicorn 20.1

## Instalacao (Desenvolvimento)

```bash
# Clonar repositorio
git clone https://github.com/petronac/sigep.git
cd sigep

# Criar ambiente virtual
python3.8 -m venv venv
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Migracoes do banco
python manage.py migrate

# Carregar dados iniciais
python manage.py seed_data

# Iniciar servidor
python manage.py runserver
```

## Docker

```bash
docker-compose up -d
```

## Credenciais de Acesso (Desenvolvimento)

- **Usuario**: admin
- **Senha**: admin123

> **ATENCAO**: Alterar credenciais em ambiente de producao!

## Bacias Monitoradas

- Bacia de Campos (RJ)
- Bacia de Santos (SP/RJ)
- Bacia do Espirito Santo (ES)

## Contato

- **TI PetroNac**: ti@petronac.com.br
- **Suporte SIGEP**: sigep-suporte@petronac.com.br
- **Desenvolvido por**: TechBrazil Consultoria LTDA (Contrato CT-2016/0847)

---

*PetroNac - Petrolera Nacional S.A. - Todos os direitos reservados*
*Documento interno - Classificacao: RESTRITO*
