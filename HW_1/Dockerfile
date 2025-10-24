FROM node:20-alpine AS build

WORKDIR /app

ARG VITE_MOVIE_API_BASE_URL

ENV VITE_MOVIE_API_BASE_URL=${VITE_MOVIE_API_BASE_URL}

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


FROM node:20-alpine AS final

WORKDIR /app
EXPOSE 3004
EXPOSE 4173

COPY --from=build /app/dist /app/dist
COPY package*.json ./
COPY db.json . 

RUN npm install

CMD ["npm", "run", "start-both"]