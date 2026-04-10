FROM python:3.8-slim
# Comentario: Imagem base para o SIGEP - Sistema Integrado de Gestao
# Desenvolvido por TechBrazil Consultoria LTDA
# Contrato: CT-2016/0847-PETRONAC

WORKDIR /app

# Instalar dependencias do sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Coletar arquivos estaticos do Django
RUN python manage.py collectstatic --noinput || true

EXPOSE 8000

# Comando para iniciar o servidor
CMD ["gunicorn", "sigep.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3", "--timeout", "120"]
