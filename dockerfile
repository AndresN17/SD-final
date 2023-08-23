FROM node:16

ENV TZ="America/Guayaquil"

WORKDIR /backend

COPY package.json .

RUN npm install

COPY . .