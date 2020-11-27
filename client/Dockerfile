# 1st Stage
FROM node:12.18-alpine AS builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn install --ignore-platform
COPY . .
RUN yarn build

# 2nd Stage
FROM nginx:1.19-alpine
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]