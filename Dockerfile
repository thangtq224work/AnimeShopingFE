# FROM node:lts-alpine

# # install simple http server for serving static content
# RUN npm install -g http-server

# # make the 'app' folder the current working directory
# WORKDIR /app

# # copy both 'package.json' and 'package-lock.json' (if available)
# COPY package*.json ./

# # install project dependencies
# RUN npm install --force

# # copy project files and folders to the current working directory (i.e. 'app' folder)
# COPY . .

# # build app for production with minification
# RUN npm run build

# EXPOSE 5000
# CMD [ "http-server", "dist" ]
#########################################################################################

FROM node:18-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY ./ .

RUN npm run build


FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

# resolve : https://stackoverflow.com/questions/53010064/pass-environment-variable-into-a-vue-app-at-runtime/57928031#57928031
# COPY ./entrypoint.sh /usr/share/nginx/html/entrypoint.sh
# EXPOSE 80

# ENTRYPOINT ["/usr/share/nginx/html/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]


