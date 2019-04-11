FROM node:alpine as builder
ARG COMMIT_HASH
ENV COMMIT_HASH=${COMMIT_HASH}
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . .
RUN npm run build:server
RUN npm run build

FROM node:alpine
ARG COMMIT_HASH
ENV COMMIT_HASH=${COMMIT_HASH}
WORKDIR /usr/src/app
COPY package.json ./
COPY --from=builder /usr/src/app/dist/ dist/

EXPOSE 3000
CMD ["npm", "start"]