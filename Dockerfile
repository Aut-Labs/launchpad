FROM node:latest as build
WORKDIR /app
ARG api_url
ENV PATH /app/node_modules/.bin:$PATH
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--openssl-legacy-provider
ENV REACT_APP_API_URL=${api_url}

COPY .npmrc ./
COPY package.json ./
COPY package-lock.json ./
RUN npm install --legacy-peer-dep
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]