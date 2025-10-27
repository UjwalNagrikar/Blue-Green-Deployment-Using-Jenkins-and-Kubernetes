FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY . .
COPY default.conf /etc/nginx/conf.d/default.conf

# Replace port 80 with the Cloud Run PORT
RUN sed -i "s/listen 80;/listen \$PORT;/" /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
