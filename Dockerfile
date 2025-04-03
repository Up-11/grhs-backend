
FROM node:20.17.0-alpine AS base

RUN apk add --no-cache

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install --frozen-lockfile

FROM base AS build

COPY . .

RUN yarn prisma generate 

RUN ls -la node_modules/@prisma

RUN yarn build

FROM base AS production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package.json /app/yarn.lock ./

RUN yarn install --production 

COPY --from=build /app/dist ./dist

COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma

COPY --from=build /app/node_modules/@prisma /app/node_modules/@prisma

RUN ls -la node_modules/@prisma

CMD ["run", "dist/main"]
