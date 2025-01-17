FROM nginx:1.27.3
RUN npm run build
COPY ./dist/finance-angular/browser /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]