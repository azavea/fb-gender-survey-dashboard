FROM python:3.9-slim

COPY requirements.txt /tmp/requirements.txt
RUN pip install --default-timeout=100 -r /tmp/requirements.txt

WORKDIR /opt/src

CMD ["python3", "/opt/src/src/dataproc/generate_data.py"]