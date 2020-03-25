FROM node:12

COPY . /opt/app

WORKDIR /opt/app

ENV PORT=3003

EXPOSE 3003

RUN npm i

CMD npm start