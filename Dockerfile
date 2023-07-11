#BASE_URI_ARG argument is passed to dockerfile from command line to rebase the ui path For eg: BASE_URI_AR=/my-ui/. 
#If passed empty, then / is appended. The Uri must begin and end with /  
FROM node:alpine as build-deps
ARG BASE_URI_ARG
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build -- --configuration production --base-href=${BASE_URI_ARG:-/} --aot

FROM nginx:1.22-alpine
ARG BASE_URI_ARG
ENV server_name localhost
ENV bkg_backend http://127.0.0.1:9090/bkg/v2
ENV ebl_backend http://127.0.0.1:9090/ebl/v3


COPY --from=build-deps /usr/src/app/dist/dcsa-edocumentation-ui/*.* /usr/share/nginx/html${BASE_URI_ARG:-/}
COPY --from=build-deps /usr/src/app/dist/dcsa-edocumentation-ui/assets /usr/share/nginx/html${BASE_URI_ARG:-/}assets
COPY nginx.d/*.template /etc/nginx/templates/
