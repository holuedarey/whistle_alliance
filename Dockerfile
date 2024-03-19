# Node Build
FROM node:14.17-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:prod

# Nginx Serve

EXPOSE 80
EXPOSE 443
