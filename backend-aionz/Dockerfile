
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/migrations ./src/migrations
COPY --from=builder /app/src/data-source.ts ./src/data-source.ts

RUN apk add --no-cache netcat-openbsd postgresql-client && \
    npm install -g typeorm ts-node

COPY entrypoint.sh /app/entrypoint.sh
RUN apk add --no-cache dos2unix && \
    dos2unix /app/entrypoint.sh && \
    apk del dos2unix && \
    chmod +x /app/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]