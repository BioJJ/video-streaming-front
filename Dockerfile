# Estágio de compilação
FROM node:lts as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install -f
COPY . .
RUN npm run build -f

# Estágio de produção
FROM nginx:stable
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
