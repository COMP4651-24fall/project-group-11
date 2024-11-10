FROM node:22.5.1
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8020
CMD ["npm", "start"]