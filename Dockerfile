FROM registry.m3-dev.co.uk/library/ubuntu_xenial:8.15.0
ARG npm_token
ARG npm_registry

ADD package.json yarn.lock  tsconfig.json tslint.json .npmrc knexfile.js /app/
ADD src /app/src
ADD db /app/db

WORKDIR /app

RUN yarn install

RUN yarn build

RUN rm -rf node_modules/ app/src

RUN yarn install --production
