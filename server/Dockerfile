FROM python:3.12-slim

WORKDIR /app

# Install dependencies first (layer caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Render/Cloud/containers must bind to 0.0.0.0
EXPOSE 5000

# Production WSGI server
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5000"]
