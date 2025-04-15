FROM node:18-alpine

# Instala ffmpeg e typescript
RUN apk add --no-cache ffmpeg \
  && npm install -g typescript

WORKDIR /app

COPY . .

RUN npm install

# Compila os arquivos TypeScript
RUN tsc

# Expõe a porta usada pela API
EXPOSE 3000

# Executa o código compilado
CMD ["node", "dist/server.js"]
