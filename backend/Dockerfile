FROM node:21.7.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm install typescript -g

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["node", "./dist/index.js"]