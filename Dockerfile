FROM nginx:alpine
COPY Client/build /usr/share/nginx/html
EXPOSE 80
CMD nginx -g "daemon off;"

FROM node:8.11.3
COPY . .
EXPOSE 81
CMD node ./Server/authorization_code/app.js