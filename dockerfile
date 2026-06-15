ARG PLATFORM=linux/amd64

FROM --platform=$PLATFORM node:24.4.1-alpine AS build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
COPY .env.production .env
RUN npm run build

# copy the build output to the nginx server
FROM --platform=$PLATFORM nginx:alpine
RUN apk update
WORKDIR /etc/nginx/conf.d
COPY --from=0 /app/config/default.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY --from=0 /app/dist /usr/share/nginx/html

# Regenerate config.js from env vars at startup, then run nginx.
COPY docker-entrypoint.sh /docker-entrypoint.d/40-runtime-config.sh
RUN chmod +x /docker-entrypoint.d/40-runtime-config.sh
CMD ["nginx", "-g", "daemon off;"]