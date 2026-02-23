FROM oven/bun:1.0-alpine AS builder

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install

COPY . .

# Generate a temporary self-signed cert for Revolt API bindings if needed by the build
RUN if [ ! -f revolt.crt ]; then touch revolt.crt; fi

RUN bun run build:server
RUN bun run build:client

FROM oven/bun:1.0-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/bun.lockb ./
RUN bun install --production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/server/.build ./server/.build
COPY --from=builder /app/public ./public
COPY --from=builder /app/revolt.crt ./revolt.crt

EXPOSE 3000

CMD ["bun", "run", "start"]
