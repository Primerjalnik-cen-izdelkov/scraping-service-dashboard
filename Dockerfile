FROM node:19-alpine as build
WORKDIR /app
#COPY . .
#RUN npm ci
#RUN npm run build
#ENV NODE_ENV production
#EXPOSE 3000

#COPY . .
#RUN npm ci
#EXPOSE 5173
#CMD ["npm", "run", "dev", "--", "--host"]

COPY package.json .
RUN npm install
COPY . .
RUN npm run build
#CMD ["npm", "run", "build"]

#EXPOSE 4173
#CMD ["npm", "run", "preview", "--", "--host"]

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]