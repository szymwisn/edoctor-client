FROM node:14

RUN mkdir /edoktor-client
WORKDIR /edoktor-client

ADD . /edoktor-client/

RUN npm install
RUN npm install @angular/cli@9.1.2
