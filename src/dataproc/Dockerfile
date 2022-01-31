FROM python:3.9-slim

COPY requirements.txt /tmp/requirements.txt
RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential python3-dev \
    && rm -rf /var/lib/apt/lists/* \
    && pip install --default-timeout=100 -r /tmp/requirements.txt \
    && apt-get purge -y --auto-remove build-essential python3-dev

WORKDIR /opt/src

CMD ["python3", "/opt/src/src/dataproc/generate_data.py"]
