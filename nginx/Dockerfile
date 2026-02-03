# Dockerfile
FROM nginx:latest

# Копируем конфигурацию
COPY nginx.conf /etc/nginx/nginx.conf
# Копируем ssl
COPY ssl/ /etc/nginx/ssl/

# Открываем порт
EXPOSE 80 443

COPY ../frontend/dist/ /app/build-output/

CMD ["nginx", "-g", "daemon off;"]