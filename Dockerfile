FROM node:10

WORKDIR /app

COPY package*.json server.js ./

RUN npm install

EXPOSE 5000

CMD ["node", "server.js"]
