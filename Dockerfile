# Stage 0, "build-stage", based on Node.js, to install dependencies
FROM node:24-alpine3.20 AS deps-stage

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install

COPY ./ /app/

# Stage 1, "build-stage", to build and compile the frontend
FROM deps-stage AS build-stage

# TODO: move to separate code, workaround to get stage works
ENV VITE_API_URL=https://new-app.dev.tonxdao.app
ENV VITE_MANIFEST_URL=https://xdao.fra1.digitaloceanspaces.com/manifest.json

RUN yarn run build

# Stage 2, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.27.5-alpine

COPY --from=build-stage /app/dist/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx-backend-not-found.conf /etc/nginx/extra-conf.d/backend-not-found.conf
