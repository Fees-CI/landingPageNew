# ---- deps ----
FROM node:20-alpine AS deps
WORKDIR /app
# OpenSSL required by Prisma binary engine on Alpine
RUN apk add --no-cache openssl
COPY package.json package-lock.json* ./
RUN npm ci

# ---- builder ----
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Dummy DATABASE_URL for build-time Prisma config resolution only — never connects.
# Real URL injected at runtime via docker-compose env_file.
ENV DATABASE_URL="postgresql://dummy:dummy@dummy:5432/dummy?schema=public"
RUN npx prisma generate
RUN npm run build

# ---- runner ----
FROM node:20-alpine AS runner
LABEL keep="true"
WORKDIR /app
RUN apk add --no-cache openssl
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Install full prod dependency tree — guarantees Prisma CLI + @prisma/config
# transitive deps (effect, c12, etc.) + pg/@prisma/adapter-pg are all present.
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev && npm cache clean --force

# Build output
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Prisma schema + config + generated client
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma

RUN chown -R nextjs:nodejs /app/node_modules
USER nextjs
EXPOSE 3000
CMD ["sh", "-c", "npx prisma db push && npx next start"]
