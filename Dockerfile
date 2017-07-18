FROM node:alpine

WORKDIR /flare-app-frontend

COPY . .
RUN npm install

EXPOSE 5000
CMD npm run deploy
