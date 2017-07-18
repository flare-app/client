FROM node:alpine

WORKDIR /flare-app-frontend

COPY . .
RUN npm install && \
    npm run build

EXPOSE 5000
CMD npm run serve
