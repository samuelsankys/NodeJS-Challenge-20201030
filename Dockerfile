FROM node:16-alpine3.16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g npm@9.2.0

COPY . .

EXPOSE 4000

CMD [ "npm", "start"]