FROM node:8.10.0

WORKDIR /ppark

COPY package.json /ppark/

RUN npm install npm cache clean --force

CMD npm start

EXPOSE 3000
