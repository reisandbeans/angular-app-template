# This file is just an example and should not be used in production

FROM node:lts-alpine AS build

WORKDIR /usr/src/angular-app-template

COPY package*.json ./

RUN apk add --update curl git && rm -rf /var/cache/apk/*

RUN npm ci

COPY . .

RUN npm run build:production

RUN npm ci --production

FROM alpine:3

RUN apk add nodejs --no-cache

WORKDIR /usr/src/angular-app-template

COPY --from=build /usr/src/angular-app-template/node_modules ./node_modules/
COPY --from=build /usr/src/angular-app-template/dist ./dist/

EXPOSE 8080
ENV NODE_ENV=production
ENV PORT=8080
ENV USE_SSR=true
ENV USE_SHUTDOWN_HANDLER=true

CMD [ "node", "dist/server/main.js" ]
