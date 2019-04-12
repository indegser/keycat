FROM node:alpine as builder
ARG SOURCE_COMMIT
ENV COMMIT_HASH=${SOURCE_COMMIT}}
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . .
RUN npm run build:server
RUN npm run build

FROM node:alpine
ARG SOURCE_COMMIT
ENV COMMIT_HASH=${SOURCE_COMMIT}
WORKDIR /usr/src/app
COPY package.json ./
COPY --from=builder /usr/src/app/dist/ dist/

EXPOSE 3000
CMD ["npm", "start"]