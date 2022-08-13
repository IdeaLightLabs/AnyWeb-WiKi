FROM node:16.14.0-alpine as builder

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn build

FROM nginx:latest as prod

COPY --from=0 /usr/src/app/build /usr/share/nginx/html

COPY --from=0 /usr/src/app/nginx/default.conf /etc/nginx/conf.d/default.conf
