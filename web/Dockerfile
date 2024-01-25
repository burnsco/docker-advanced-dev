# Build the node frontend
FROM node:18-alpine as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve the built node app
FROM nginx
EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html
