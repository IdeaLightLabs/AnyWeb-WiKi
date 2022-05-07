FROM node:16.14.0-alpine as builder

WORKDIR /usr/src/app

ADD package.json ./

RUN npm install --registry=https://registry.npm.taobao.org --profiler_binary_host_mirror=https://npm.taobao.org/mirrors/node-inspector/

COPY . .

RUN npm run build

FROM nginx:latest as prod

COPY --from=0 /usr/src/app/build /usr/share/nginx/html

COPY --from=0 /usr/src/app/nginx/default.conf /etc/nginx/conf.d/default.conf
