FROM node:20.16.0-alpine as base

### DEPS ###
FROM base as deps
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package*.json .
RUN npm ci


### BUILD ###
FROM base as builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate && npm run build


### RUN ###
FROM base as runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD HOSTNAME='0.0.0.0' node server.js

