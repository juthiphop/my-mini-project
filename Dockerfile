FROM node:14.16.0-alpine

WORKDIR /app

COPY . .

RUN yarn install

CMD ["yarn" , "package"]