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
FROM node:alpine as builder
ENV SERVICE_NAME=frontend
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i #EXPOSE 3000
RUN REACT_APP_BASE_URL=64.226.88.22 npm run build

# CMD ["tail", "-f", "/dev/null"]
# CMD ["npm", "run", "start"]


FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
ENV SERVICE_NAME=web-service
#EXPOSE 3000
# FROM nginx:alpine
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# RUN rm -rf /etc/nginx/conf.d/*
# RUN rm -rf /usr/share/nginx/html/*
## WORKDIR /usr/share/nginx/html/
COPY --from=builder /app/build /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]
