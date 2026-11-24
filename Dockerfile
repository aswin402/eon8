# syntax=docker/dockerfile:1

FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4173

# Create non-root runtime user
RUN addgroup -S eon8 && adduser -S eon8 -G eon8

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server

# Persistent writable directories (mount Docker volumes here in production)
RUN mkdir -p /app/data /app/public/uploads/blog \
  && chown -R eon8:eon8 /app/data /app/public/uploads

USER eon8
EXPOSE 4173

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:4173/robots.txt >/dev/null 2>&1 || exit 1

CMD ["node", "server/prodServer.ts"]
