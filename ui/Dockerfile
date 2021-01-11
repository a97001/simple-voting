FROM node:12

RUN mkdir -p /app

WORKDIR /app

COPY ./ui /app/

RUN npm ci

CMD ["npm", "run", "serve"]

EXPOSE 8000