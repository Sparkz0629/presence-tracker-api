FROM node:alpine

WORKDIR /src

ADD api /src/api/
COPY package.json /src/
COPY server.js /src/
RUN npm install

EXPOSE 5100

CMD ["npm", "start"]
