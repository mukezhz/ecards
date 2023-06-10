FROM gplane/pnpm:node18 as builder
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm i
COPY . .
RUN pnpm build

FROM gplane/pnpm:node18
WORKDIR /svelte
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/vite.config.ts vite.config.ts
COPY --from=builder /app/svelte.config.js svelte.config.js
COPY --from=builder /app/tsconfig.json tsconfig.json
COPY --from=builder /app/static static
COPY --from=builder /app/.svelte-kit .svelte-kit
RUN pnpm i -D vite
RUN ls -la
CMD ["pnpm", "preview", "--host", "0.0.0.0"]