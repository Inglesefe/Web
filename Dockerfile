FROM nginx:alpine
COPY ./nginx.conf  /etc/nginx/conf.d/default.conf
WORKDIR /app
COPY ./dist/web/ /usr/share/nginx/html
EXPOSE 80
