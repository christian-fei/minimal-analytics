FROM node:12-alpine
RUN mkdir /app
COPY ./package.* /app

WORKDIR /app

RUN npm install

COPY ./ /app

EXPOSE 8080

ENTRYPOINT ["/app/index.js"]
