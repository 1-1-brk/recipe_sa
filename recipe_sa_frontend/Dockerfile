# FROM node:16.17-alpine3.16

# # COPY package.json .
# # COPY package-lock.json .
# COPY package*.json .

# RUN npm install

# COPY . . 

# RUN npm run build
#########################
# FROM node:16-alpine

# WORKDIR /recipe-rsa-frontend

# COPY package*.json .

# RUN npm install

# COPY . .

# # EXPOSE 3000

# RUN npm run build

# CMD ["npm", "start"]
#########################
FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
EXPOSE 3000
RUN npm run build
# CMD ["npm", "run", "start"]
