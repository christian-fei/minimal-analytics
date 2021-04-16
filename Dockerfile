FROM node:12-alpine
COPY ./ /app
WORKDIR /app
RUN npm install

EXPOSE 8080
WORKDIR /app/

ENTRYPOINT ["/app/index.js"]
