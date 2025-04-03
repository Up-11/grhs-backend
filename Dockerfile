FROM node:20.17.0-alpine AS base

RUN apk add --no-cache openssl

RUN yarn global add react@18.2.0 react-dom@18.2.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile && \
    yarn add react@18.2.0 react-dom@18.2.0

FROM base AS build

COPY . .

RUN yarn prisma generate
RUN yarn build

FROM base AS production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package.json /app/yarn.lock ./

RUN yarn install --production --frozen-lockfile && \
    yarn add react@18.2.0 react-dom@18.2.0

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma

CMD ["node", "dist/main.js"]
