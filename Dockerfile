FROM node:18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:1.27.3
COPY --from=builder /app/dist/finance-angular /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
