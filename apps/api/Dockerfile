FROM node:20

WORKDIR /app

RUN npm install -g pnpm
RUN npm install -g turbo

COPY . .
RUN pnpm install

RUN turbo db:generate
RUN pnpm run --filter=api build

EXPOSE 3001

WORKDIR /app/apps/api

CMD ["node", "dist/main.js"]
