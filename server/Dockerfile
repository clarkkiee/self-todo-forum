FROM node:alpine

ENV PORT=8000
ENV JWT_SECRET='proximacentauri'
ENV JWT_TOKEN_EXPIRES='1h'
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/self-todo-forum"

WORKDIR /src/app

COPY . .

RUN npm install

EXPOSE 8000