FROM node:22-alpine AS base
WORKDIR /usr/src/app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build --prod


FROM node:22-alpine AS runner
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist/ /usr/src/app/dist/
COPY package.json package-lock.json ./
RUN npm install --production --frozen-lockfile

EXPOSE 8080

CMD ["npm", "run", "serve", "--", "--port", "8080"]
