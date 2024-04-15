FROM node:14-alpine

# Instala dependencias
RUN npm install -g @ionic/cli

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el código de la aplicación al contenedor
COPY . .

# Instala dependencias de la aplicación
RUN npm install

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 8100

# Comando para iniciar la aplicación
CMD ["ionic", "serve", "--port=8100", "--address=0.0.0.0"]