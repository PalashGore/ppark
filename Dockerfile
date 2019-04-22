#Staging
FROM node:8.10.0 as ppark-local-build

WORKDIR /ppark

COPY package.json /ppark/package.json

RUN npm install

CMD ["npm", "start"]
