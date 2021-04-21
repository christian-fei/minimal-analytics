FROM node:12-alpine
COPY ./ /app
WORKDIR /app
RUN npm install
RUN cat package.json
RUN cd client && npm install && npm run build

EXPOSE 8080

ENTRYPOINT ["/app/index.js"]
