FROM node:latest

RUN apt-get update
RUN apt-get install nginx -y
RUN mkdir -p /etc/nginx/sites-enabled

COPY nginx.conf /etc/nginx/nginx.conf
COPY shapeshift.conf /etc/nginx/sites-enabled/shapeshift.conf

COPY package.json /opt/shapeshift/
RUN cd /opt/shapeshift; npm install
COPY . /opt/shapeshift
WORKDIR /opt/shapeshift

ARG GAMEROOM_HOST=192.168.99.100

RUN echo "GAMEROOM_HOST="$GAMEROOM_HOST > config/production.js
RUN ./node_modules/.bin/gulp dist
RUN chmod u+x entrypoint.sh

CMD ["/opt/shapeshift/entrypoint.sh"]