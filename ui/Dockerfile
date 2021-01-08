FROM node:12

RUN mkdir -p /app

WORKDIR /app

COPY ./ui /app/

RUN npm ci

CMD ["npm", "run", "develop"]

EXPOSE 8000