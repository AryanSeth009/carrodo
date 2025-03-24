# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# Default values for required environment variables
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Note: Other environment variables should be passed during runtime
# Example of how to run:
# docker run -p 3000:3000 --env-file .env carrodo

CMD ["node", "server.js"] 