# --- СТАДИЯ СБОРКИ (BUILD STAGE) ---
FROM node:20-alpine AS build

WORKDIR /app

# 1. Определяем Build Argument для VITE_...
ARG VITE_MOVIE_API_BASE_URL

# 2. Передаем Build Argument в среду выполнения, чтобы Vite мог ее увидеть
ENV VITE_MOVIE_API_BASE_URL=${VITE_MOVIE_API_BASE_URL}

# Устанавливаем все зависимости, включая devDependencies (для typescript и vite build)
COPY package*.json ./
RUN npm install

# Копируем код и собираем Vite-приложение.
# На этом этапе Vite использует переменную из ENV/ARG.
COPY . .
RUN npm run build


# --- СТАДИЯ ЗАПУСКА (RUNNING STAGE) ---
FROM node:20-alpine AS final

# Здесь переменная VITE_MOVIE_API_BASE_URL технически уже не нужна, 
# т.к. она "запеклась" в собранные файлы, но мы ее оставим для чистоты ENV
WORKDIR /app
EXPOSE 3004
EXPOSE 4173

COPY --from=build /app/dist /app/dist
COPY package*.json ./
COPY db.json . 

RUN npm install

CMD ["npm", "run", "start-both"]