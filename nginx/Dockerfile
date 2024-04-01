FROM nginx

RUN rm /usr/share/nginx/html/*

RUN apt-get update && apt-get -y upgrade && apt-get -y install sudo vim

COPY configs/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]