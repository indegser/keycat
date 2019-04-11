FROM node:alpine as builder
WORKDIR /usr/src/app
RUN apk add --no-cache git
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . .
RUN npm run build
RUN npm run build:server

FROM node:alpine
RUN apk add --no-cache git
WORKDIR /usr/src/app
COPY package.json ./
COPY --from=builder /usr/src/app/dist/ dist/
EXPOSE 3000
CMD ["npm", "start"]