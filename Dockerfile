#Staging
FROM node:8.10.0 as ppark-local-build
RUN mkdir /ppark
WORKDIR /ppark

ENV PATH /ppark/node_modules/.bin:$PATH

COPY package.json /ppark/package.json

RUN npm install

CMD ["npm", "start"]
