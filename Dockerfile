FROM node:16-alpine
RUN mkdir /app
COPY ./package.* /app

WORKDIR /app

RUN npm install

COPY ./ /app

CMD mkdir -p /app/data
CMD touch /app/data/data.ljson

# CMD cd /dashboard && npm install && npm run build

EXPOSE 8080

ENTRYPOINT ["/app/index.js"]
