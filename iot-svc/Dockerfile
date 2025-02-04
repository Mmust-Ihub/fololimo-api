FROM python:3.10-slim-bullseye

RUN useradd --no-create-home --shell /bin/false fololimo

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1

WORKDIR /app
COPY ./requirements.txt /app

RUN pip install --upgrade pip && pip install --no-cache-dir -r /app/requirements.txt
COPY . /app

RUN chmod u+x ./server.sh && chmod u+x ./celery.sh

RUN chown -R fololimo:fololimo /app

USER fololimo

EXPOSE 5000
