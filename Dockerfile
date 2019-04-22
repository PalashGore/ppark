FROM node:8.10.0

WORKDIR /ppark

COPY package.json /ppark/

RUN npm install

CMD npm start

EXPOSE 3000
