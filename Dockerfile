FROM gplane/pnpm:node18 as builder
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm i
COPY . .
RUN pnpm build

FROM node:18-alpine
WORKDIR /svelte
COPY --from=builder /app/package.json .
COPY --from=builder /app/static static
COPY --from=builder /app/build build
CMD ["node", "build/index.js"]