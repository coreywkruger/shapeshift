FROM node:latest

COPY package.json /opt/shapeshift/
RUN cd /opt/shapeshift; npm install
COPY . /opt/shapeshift
WORKDIR /opt/shapeshift

RUN ./node_modules/.bin/gulp dist
RUN apt-get update
RUN apt-get install nginx -y
RUN mkdir -p /etc/nginx/sites-enabled

COPY nginx.conf /etc/nginx/nginx.conf
COPY shapeshift.conf /etc/nginx/sites-enabled/shapeshift.conf

RUN chmod u+x entrypoint.sh

CMD ["/opt/shapeshift/entrypoint.sh"]