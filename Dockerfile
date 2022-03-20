FROM node:16.14.0-alpine as builder

# 缺失Python环境 为减小Image大小 直接安装
#RUN echo -e 'https://mirrors.aliyun.com/alpine/v3.6/main/\nhttps://mirrors.aliyun.com/alpine/v3.6/community/' > /etc/apk/repositories && \
#  apk update && apk upgrade
#     && \
#  apk --no-cache add --virtual native-deps \
#  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git

# 环境目录
WORKDIR /usr/src/app

# 复制package.json package-lock.json
ADD package.json ./

# 快速安装依赖
RUN npm install --registry=https://registry.npm.taobao.org --profiler_binary_host_mirror=https://npm.taobao.org/mirrors/node-inspector/

# 复制其他文件到container
COPY . .

# Build
RUN npm run build

FROM nginx:latest as prod

# 环境目录
#WORKDIR /usr/src/wwwroot

COPY --from=0 /usr/src/app/build /usr/share/nginx/html

COPY --from=0 /usr/src/app/nginx/default.conf /etc/nginx/conf.d/default.conf

#EXPOSE 80
