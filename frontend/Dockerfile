FROM node:20-alpine

# создание директории приложения
WORKDIR /usr/src/fontend

# установка зависимостей
# астериск ("*") по возможности скопирует оба файла: package.json и package-lock.json
# тот же символ делает копирование опциональным, т. е. без файла сборка не упадёт
COPY package*.json ./
# Флаг --omit=dev означает «не ставить devDependencies»
# они не нужны в продакшен-окружении
RUN npm i --omit=dev
# копируем исходный код
COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ] 