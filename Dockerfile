FROM node:alpine

WORKDIR /home/rudresh/docker-workdir/GenTzuBot
COPY package.json .
RUN npm i
COPY . .
CMD ["ts-node-dev","start"]