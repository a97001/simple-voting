FROM node:12

RUN mkdir -p /app

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm i @nestjs/cli -g && npm ci

COPY . /app/

CMD ["npm", "run", "campaign-service"]

EXPOSE 3001