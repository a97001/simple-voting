FROM node:12-alpine

RUN apk add --no-cache curl jq bash

WORKDIR /opt

COPY ./source.config.json ./configurator.sh /opt/

RUN ls