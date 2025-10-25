# ======================================================
# Base build stage
# ======================================================
FROM node:18-alpine AS builder
WORKDIR /app

# Copy and install deps
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Generate Prisma client
RUN npx prisma generate --schema=wk5docker/prisma/schema.prisma

# Build Next.js app
RUN npm run build

# ======================================================
# Production runtime stage
# ======================================================
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only the built output and essentials from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/wk5docker ./wk5docker
COPY --from=builder /app/app ./app

# Expose port
EXPOSE 3000

# Run app
CMD ["npm", "start"]
