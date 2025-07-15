FROM --platform=linux/amd64 node:22-alpine AS build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
COPY .env.production .env
RUN npm run build

# copy the build output to the nginx server
FROM --platform=linux/amd64 nginx:alpine
WORKDIR /etc/nginx/conf.d
COPY --from=0 /app/config/default.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY --from=0 /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]