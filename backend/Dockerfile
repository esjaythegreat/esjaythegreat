FROM node:18-alpine
WORKDIR /opt/app
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git postgresql-dev
COPY package*.json ./
RUN npm ci
RUN npm install pg
COPY . .
EXPOSE 1337
CMD ["npm", "run", "develop"]
