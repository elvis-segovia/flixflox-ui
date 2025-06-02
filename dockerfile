FROM --platform=linux/amd64 node:22-alpine AS build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY .env.local .env.local
COPY . .
CMD [ "npm", "run", "dev" ]