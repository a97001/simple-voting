FROM node:12

RUN mkdir -p /app

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm i @nestjs/cli -g && npm ci

COPY . /app/

CMD ["npm", "run", "api-gateway"]

HEALTHCHECK --interval=5s --timeout=1s \
  CMD curl -f http://localhost:5000/api || exit 1

EXPOSE 5000