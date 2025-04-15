# Usa uma imagem Node com ffmpeg instalado
FROM jrottenberg/ffmpeg:4.4-alpine AS ffmpeg

FROM node:18-alpine

# Instala ffmpeg manualmente
RUN apk add --no-cache ffmpeg

# Cria diretório de trabalho
WORKDIR /app

# Copia arquivos do projeto
COPY . .

# Instala dependências
RUN npm install

# Expõe a porta usada pela aplicação
EXPOSE 3000

# Inicia a aplicação
CMD ["node", "app.js"]
