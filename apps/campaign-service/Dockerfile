FROM node:12

RUN mkdir -p /app

WORKDIR /app

COPY . /app/

RUN npm i @nestjs/cli -g && npm ci

CMD ["npm", "run", "campaign-service"]

EXPOSE 3001