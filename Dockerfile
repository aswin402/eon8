# EON8 website: React build + Node server (TypeScript runs natively on Node 24).
# Build:  docker build -t eon8-web .
# Run:    see docker-compose.prod.yml

FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# Values baked into the browser bundle (.env is not copied into the image).
# The runtime VITE_ADMIN_PATH (env_file) must match this one.
ARG VITE_ADMIN_PATH=/admin-dashboard
ARG VITE_LEAD_WEBHOOK_URL=
ENV VITE_ADMIN_PATH=$VITE_ADMIN_PATH VITE_LEAD_WEBHOOK_URL=$VITE_LEAD_WEBHOOK_URL
RUN npm run build

FROM node:24-alpine AS runtime
ENV NODE_ENV=production PORT=4173
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund && npm cache clean --force
COPY --from=build /app/dist ./dist
COPY server ./server
COPY data ./data
# Runtime uploads live in a volume (see docker-compose.prod.yml).
RUN mkdir -p public/uploads && chown -R node:node /app
USER node
EXPOSE 4173
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:4173/api/health || exit 1
CMD ["node", "server/prodServer.ts"]
