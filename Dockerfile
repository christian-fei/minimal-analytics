FROM node:12-alpine
RUN mkdir -p /app/client
COPY ./package.* /app
COPY ./client/package.* /app/client

WORKDIR /app

RUN npm install
RUN cd client && npm install

COPY ./ /app
RUN cd client && rm -rf build && npm run build

EXPOSE 8080

ENTRYPOINT ["/app/index.js"]
