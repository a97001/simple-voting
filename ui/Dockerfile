FROM node:12 as builder

RUN mkdir -p /app

WORKDIR /app

COPY ./ui/package.json ./ui/package-lock.json /app/

RUN npm ci

COPY ./ui /app/

RUN ["npm", "run", "build"]

FROM nginx

COPY --from=builder /app/public /usr/share/nginx/html

EXPOSE 80