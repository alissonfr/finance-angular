FROM nginx:1.27.3
COPY ./dist/finance-angular/browser /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]