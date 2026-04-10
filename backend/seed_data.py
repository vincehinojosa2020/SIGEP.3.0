# -*- coding: utf-8 -*-
"""
Modulo de geracao de dados seed para o SIGEP
Dados realisticos de pocos offshore brasileiros
Desenvolvido por: Carlos A. Silva - TechBrazil (2017)
"""

import uuid
import random
from datetime import datetime, timedelta


def gerar_dados_seed():
    random.seed(42)

    # ===== POCOS =====
    pocos_config = [
        {'nome': 'MRL-01A', 'bacia': 'Campos', 'campo': 'Marlim', 'profundidade': 2850, 'tipo': 'BCS', 'lat': -22.37, 'lon': -40.02, 'inicio': '2001-03-15', 'status': 'Ativo'},
        {'nome': 'MRL-03', 'bacia': 'Campos', 'campo': 'Marlim', 'profundidade': 3100, 'tipo': 'Gas Lift', 'lat': -22.39, 'lon': -40.05, 'inicio': '2003-07-22', 'status': 'Ativo'},
        {'nome': 'ALB-02', 'bacia': 'Campos', 'campo': 'Albacora', 'profundidade': 2400, 'tipo': 'BCS', 'lat': -22.15, 'lon': -39.87, 'inicio': '1999-11-08', 'status': 'Manutencao'},
        {'nome': 'ALB-05A', 'bacia': 'Campos', 'campo': 'Albacora', 'profundidade': 2750, 'tipo': 'BCS', 'lat': -22.18, 'lon': -39.90, 'inicio': '2004-02-14', 'status': 'Ativo'},
        {'nome': 'RNC-01', 'bacia': 'Campos', 'campo': 'Roncador', 'profundidade': 3500, 'tipo': 'Gas Lift', 'lat': -22.42, 'lon': -40.18, 'inicio': '2005-06-30', 'status': 'Ativo'},
        {'nome': 'BRC-02A', 'bacia': 'Campos', 'campo': 'Barracuda', 'profundidade': 2200, 'tipo': 'BCS', 'lat': -22.28, 'lon': -39.95, 'inicio': '2002-09-10', 'status': 'Ativo'},
        {'nome': 'JUB-01', 'bacia': 'Campos', 'campo': 'Jubarte', 'profundidade': 3200, 'tipo': 'Gas Lift', 'lat': -22.50, 'lon': -40.22, 'inicio': '2006-01-20', 'status': 'Inativo'},
        {'nome': 'LUL-01A', 'bacia': 'Santos', 'campo': 'Lula', 'profundidade': 5200, 'tipo': 'BCS', 'lat': -25.28, 'lon': -43.15, 'inicio': '2010-09-01', 'status': 'Ativo'},
        {'nome': 'LUL-03', 'bacia': 'Santos', 'campo': 'Lula', 'profundidade': 5400, 'tipo': 'Gas Lift', 'lat': -25.30, 'lon': -43.18, 'inicio': '2012-03-15', 'status': 'Ativo'},
        {'nome': 'BUZ-01', 'bacia': 'Santos', 'campo': 'Buzios', 'profundidade': 5800, 'tipo': 'BCS', 'lat': -25.42, 'lon': -43.32, 'inicio': '2014-07-10', 'status': 'Ativo'},
        {'nome': 'BUZ-02A', 'bacia': 'Santos', 'campo': 'Buzios', 'profundidade': 5600, 'tipo': 'BCS', 'lat': -25.44, 'lon': -43.35, 'inicio': '2015-11-20', 'status': 'Ativo'},
        {'nome': 'SAP-01', 'bacia': 'Santos', 'campo': 'Sapinhoa', 'profundidade': 5100, 'tipo': 'Gas Lift', 'lat': -25.15, 'lon': -43.05, 'inicio': '2013-01-08', 'status': 'Ativo'},
        {'nome': 'LAP-01', 'bacia': 'Santos', 'campo': 'Lapa', 'profundidade': 4800, 'tipo': 'BCS', 'lat': -25.20, 'lon': -43.10, 'inicio': '2016-05-25', 'status': 'Manutencao'},
        {'nome': 'GAR-01', 'bacia': 'Espirito Santo', 'campo': 'Golfinho', 'profundidade': 1800, 'tipo': 'Gas Lift', 'lat': -19.35, 'lon': -38.90, 'inicio': '2007-04-12', 'status': 'Ativo'},
        {'nome': 'CAM-02', 'bacia': 'Espirito Santo', 'campo': 'Camarupim', 'profundidade': 2100, 'tipo': 'BCS', 'lat': -19.42, 'lon': -38.85, 'inicio': '2009-08-05', 'status': 'Ativo'},
    ]

    pocos = []
    for cfg in pocos_config:
        pocos.append({
            'id': str(uuid.uuid4()),
            'nome': cfg['nome'],
            'bacia': cfg['bacia'],
            'campo': cfg['campo'],
            'profundidade': cfg['profundidade'],
            'status': cfg['status'],
            'data_inicio': cfg['inicio'],
            'coordenadas_lat': cfg['lat'],
            'coordenadas_lon': cfg['lon'],
            'tipo_elevacao': cfg['tipo']
        })

    # ===== PRODUCAO (6 meses) =====
    producao = []
    base_date = datetime(2024, 7, 1)

    prod_base = {
        'MRL-01A': {'bpd': 4500, 'gas': 180000, 'agua': 35, 'psi': 2800, 'dec': 0.02},
        'MRL-03': {'bpd': 3800, 'gas': 150000, 'agua': 42, 'psi': 2600, 'dec': 0.03},
        'ALB-02': {'bpd': 2200, 'gas': 90000, 'agua': 55, 'psi': 2200, 'dec': 0.04},
        'ALB-05A': {'bpd': 3500, 'gas': 140000, 'agua': 38, 'psi': 2700, 'dec': 0.02},
        'RNC-01': {'bpd': 6000, 'gas': 250000, 'agua': 28, 'psi': 3200, 'dec': 0.015},
        'BRC-02A': {'bpd': 3200, 'gas': 130000, 'agua': 40, 'psi': 2500, 'dec': 0.025},
        'JUB-01': {'bpd': 0, 'gas': 0, 'agua': 0, 'psi': 0, 'dec': 0},
        'LUL-01A': {'bpd': 28000, 'gas': 800000, 'agua': 15, 'psi': 4500, 'dec': 0.01},
        'LUL-03': {'bpd': 25000, 'gas': 720000, 'agua': 18, 'psi': 4300, 'dec': 0.012},
        'BUZ-01': {'bpd': 32000, 'gas': 950000, 'agua': 12, 'psi': 5000, 'dec': 0.008},
        'BUZ-02A': {'bpd': 30000, 'gas': 880000, 'agua': 14, 'psi': 4800, 'dec': 0.009},
        'SAP-01': {'bpd': 22000, 'gas': 650000, 'agua': 20, 'psi': 4100, 'dec': 0.011},
        'LAP-01': {'bpd': 15000, 'gas': 450000, 'agua': 25, 'psi': 3800, 'dec': 0.02},
        'GAR-01': {'bpd': 5500, 'gas': 200000, 'agua': 30, 'psi': 2400, 'dec': 0.02},
        'CAM-02': {'bpd': 4000, 'gas': 160000, 'agua': 33, 'psi': 2300, 'dec': 0.025},
    }

    for poco in pocos:
        nome = poco['nome']
        base = prod_base.get(nome)
        if not base or base['bpd'] == 0:
            continue
        for day in range(180):
            date = base_date + timedelta(days=day)
            decay = 1 - (base['dec'] * day / 180)
            noise = random.uniform(0.92, 1.08)
            producao.append({
                'id': str(uuid.uuid4()),
                'poco_id': poco['id'],
                'poco_nome': nome,
                'data': date.strftime('%Y-%m-%d'),
                'barris_por_dia': round(base['bpd'] * decay * noise, 1),
                'gas_m3_dia': round(base['gas'] * decay * noise, 1),
                'corte_agua_pct': round(min(base['agua'] + random.uniform(-3, 5) * (day / 180), 95), 1),
                'pressao_psi': round(base['psi'] * decay * random.uniform(0.95, 1.05), 1)
            })

    # ===== DUTOS =====
    dutos_cfg = [
        {'nome': 'GASDUC-I', 'origem': 'P-52 (Roncador)', 'destino': 'Terminal Cabiunas', 'ext': 305, 'diam': 24, 'status': 'Operacional', 'pressao': 180},
        {'nome': 'GASDUC-II', 'origem': 'P-56 (Marlim Sul)', 'destino': 'Terminal Cabiunas', 'ext': 280, 'diam': 24, 'status': 'Operacional', 'pressao': 175},
        {'nome': 'OSPAR-I', 'origem': 'FPSO Cidade de Angra', 'destino': 'Terminal Sao Sebastiao', 'ext': 420, 'diam': 18, 'status': 'Operacional', 'pressao': 150},
        {'nome': 'OSPAR-II', 'origem': 'FPSO Cidade de Paraty', 'destino': 'Terminal Sao Sebastiao', 'ext': 380, 'diam': 20, 'status': 'Operacional', 'pressao': 160},
        {'nome': 'OSBAT-I', 'origem': 'P-48 (Barracuda)', 'destino': 'Terminal Cabiunas', 'ext': 250, 'diam': 16, 'status': 'Manutencao', 'pressao': 140},
        {'nome': 'GASBEL-I', 'origem': 'PCH-2 (Golfinho)', 'destino': 'Terminal de Vitoria', 'ext': 180, 'diam': 14, 'status': 'Operacional', 'pressao': 120},
        {'nome': 'OLEODUC-ES', 'origem': 'FPSO Capixaba', 'destino': 'Terminal Norte Capixaba', 'ext': 210, 'diam': 16, 'status': 'Operacional', 'pressao': 135},
        {'nome': 'ROTA-3', 'origem': 'FPSO Buzios', 'destino': 'Terminal GNL-RJ', 'ext': 355, 'diam': 28, 'status': 'Operacional', 'pressao': 200},
    ]

    dutos = []
    for cfg in dutos_cfg:
        dutos.append({
            'id': str(uuid.uuid4()),
            'nome': cfg['nome'],
            'origem': cfg['origem'],
            'destino': cfg['destino'],
            'extensao_km': cfg['ext'],
            'diametro_pol': cfg['diam'],
            'status': cfg['status'],
            'pressao_operacao': cfg['pressao']
        })

    # ===== LEITURAS DE DUTO (30 dias, 4x/dia) =====
    leituras = []
    leit_base = datetime(2024, 12, 1)
    for duto in dutos:
        for day in range(30):
            for hora in [0, 6, 12, 18]:
                ts = leit_base + timedelta(days=day, hours=hora)
                is_op = duto['status'] == 'Operacional'
                leituras.append({
                    'id': str(uuid.uuid4()),
                    'duto_id': duto['id'],
                    'timestamp': ts.isoformat(),
                    'vazao': round(random.uniform(800, 2500) if is_op else random.uniform(0, 100), 1),
                    'pressao': round(duto['pressao_operacao'] * random.uniform(0.9, 1.1), 1),
                    'temperatura': round(random.uniform(45, 85), 1)
                })

    # ===== CONFORMIDADE =====
    tipos = [
        'Producao Mensal', 'Emissoes Atmosfericas', 'Seguranca Operacional',
        'Integridade de Pocos', 'Monitoramento Ambiental', 'Abandono de Poco',
        'Teste de Producao', 'Relatorio de Incidentes', 'Auditoria de Processos',
        'Desempenho Operacional'
    ]
    conformidade = []
    for i in range(10):
        mes = (i % 12) + 1
        ano = 2024
        conformidade.append({
            'id': str(uuid.uuid4()),
            'tipo': tipos[i],
            'data_geracao': f'{ano}-{mes:02d}-{random.randint(1, 28):02d}',
            'periodo_inicio': f'{ano}-{mes:02d}-01',
            'periodo_fim': f'{ano}-{mes:02d}-{28 if mes == 2 else 30}',
            'status': random.choice(['Aprovado', 'Aprovado', 'Aprovado', 'Pendente', 'Em Revisao']),
            'numero_anp': f'ANP-{random.randint(10000, 99999)}/{ano}',
            'responsavel': random.choice(['Carlos A. Silva', 'Maria F. Santos', 'Roberto C. Lima'])
        })

    # ===== FAUNA =====
    especies = [
        ('Chelonia mydas', 'Tartaruga-verde'),
        ('Eretmochelys imbricata', 'Tartaruga-de-pente'),
        ('Caretta caretta', 'Tartaruga-cabecuda'),
        ('Stenella longirostris', 'Golfinho-rotador'),
        ('Tursiops truncatus', 'Golfinho-nariz-de-garrafa'),
        ('Megaptera novaeangliae', 'Baleia-jubarte'),
        ('Sula leucogaster', 'Atoba-pardo'),
        ('Fregata magnificens', 'Fragata'),
        ('Phaethon aethereus', 'Rabo-de-palha'),
        ('Sterna hirundo', 'Trinta-reis-boreal'),
    ]
    plataformas = ['P-52', 'P-56', 'P-48', 'FPSO Cidade de Angra', 'FPSO Cidade de Paraty', 'FPSO Capixaba', 'PCH-2', 'FPSO Buzios']
    observadores = ['Ana B. Costa', 'Pedro H. Mendes', 'Luciana S. Ferreira', 'Felipe R. Almeida']
    notas_opcoes = [
        'Avistamento durante inspecao matutina',
        'Grupo de individuos proximo a plataforma',
        'Individuo solitario - comportamento normal',
        'Possivel ninhada na area adjacente',
        'Avistamento durante operacao de mergulho',
        'Grupo em transito - migracao sazonal',
        'Individuo se alimentando proximo ao flare',
        'Observado durante inspecao submarina ROV',
        '',
    ]

    fauna = []
    for i in range(25):
        esp = random.choice(especies)
        data_obs = datetime(2024, 6, 1) + timedelta(days=random.randint(0, 180))
        fauna.append({
            'id': str(uuid.uuid4()),
            'especie': f'{esp[0]} ({esp[1]})',
            'data_observacao': data_obs.strftime('%Y-%m-%d'),
            'plataforma': random.choice(plataformas),
            'coordenadas_lat': round(-19.0 - random.uniform(0, 7), 4),
            'coordenadas_lon': round(-38.5 - random.uniform(0, 5), 4),
            'observador': random.choice(observadores),
            'notas': random.choice(notas_opcoes),
            'criado_por': 'sistema',
            'criado_em': data_obs.isoformat()
        })

    return {
        'pocos': pocos,
        'producao': producao,
        'dutos': dutos,
        'leituras_duto': leituras,
        'conformidade': conformidade,
        'fauna': fauna
    }
