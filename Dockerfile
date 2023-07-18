#docker-entrypoint.sh is used to rebase the url of the ui.  
FROM node:alpine as build-deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build -- --configuration production --aot

FROM nginx:1.22-alpine
ENV server_name localhost
ENV bkg_backend http://127.0.0.1:9090/bkg/v2
ENV ebl_backend http://127.0.0.1:9090/ebl/v3


COPY --from=build-deps /usr/src/app/dist/dcsa-edocumentation-ui/*.* /usr/share/nginx/html/
COPY --from=build-deps /usr/src/app/dist/dcsa-edocumentation-ui/assets /usr/share/nginx/html/assets
COPY nginx.d/*.template /etc/nginx/templates/
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD [ "nginx", "-g", "daemon off;" ]
EXPOSE 80