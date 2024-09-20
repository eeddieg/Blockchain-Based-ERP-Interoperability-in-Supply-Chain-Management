FROM node:16
RUN npm i -g express
RUN apt-get update && apt-get install -y openssl
WORKDIR /backend
ADD prisma /backend/prisma
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]