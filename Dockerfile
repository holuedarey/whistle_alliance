# Node Build
FROM node:14.17-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:prod

# Nginx Serve
FROM nginx:1.18.0-alpine
COPY /nginx.conf /etc/nginx/conf.d/default.conf
COPY /certs/* /etc/nginx/certs

COPY --from=build /usr/src/app/dist/argus-front-end /usr/share/nginx/html
EXPOSE 80