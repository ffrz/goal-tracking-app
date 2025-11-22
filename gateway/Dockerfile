# gateway/Dockerfile (Standard Next.js Production Build)

# 1. Base Image
FROM node:20-alpine AS base

# 2. Dependencies Stage
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# 3. Build Stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_TELEMETRY_DISABLED=1 untuk mempercepat build
RUN NEXT_TELEMETRY_DISABLED=1 npm run build

# 4. Production Stage
FROM base AS runner
WORKDIR /app

# Salin hanya yang dibutuhkan untuk runtime
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# Server berjalan di port 3000
EXPOSE 3000
ENV NODE_ENV production

CMD ["npm", "start"]