FROM node:12-alpine
COPY ./ /app
WORKDIR /app
RUN npm install

EXPOSE 8080
WORKDIR /app/

RUN cd client && npm install && npm run build

ENTRYPOINT ["/app/index.js"]
