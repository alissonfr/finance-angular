FROM node:18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.27.3
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/finance-angular/browser /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]