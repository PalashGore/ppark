FROM node:8.10.0

WORKDIR /api

COPY package.json /api

RUN npm install npm cache clean --force

CMD node api.js

EXPOSE 4000
