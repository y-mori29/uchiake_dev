FROM node:20

WORKDIR /app

RUN npm install -g pnpm

COPY . .
RUN pnpm install --filter=web

RUN pnpm run --filter=web build

EXPOSE 3000

WORKDIR /app/apps/web

CMD ["pnpm", "run", "start"]
