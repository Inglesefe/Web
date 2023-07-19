FROM nginx:alpine
WORKDIR /app
COPY ./dist/web/ /usr/share/nginx/html
EXPOSE 80
