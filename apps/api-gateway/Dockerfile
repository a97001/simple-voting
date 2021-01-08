FROM node:12

RUN mkdir -p /app

WORKDIR /app

COPY . /app/

RUN npm i @nestjs/cli -g && npm ci

CMD ["npm", "run", "api-gateway"]

EXPOSE 5000