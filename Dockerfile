FROM node:18

WORKDIR /usr/src

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

EXPOSE 9999
CMD [ "npm run start" ]
