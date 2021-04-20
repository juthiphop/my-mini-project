FROM node:14.16.0-alpine

WORKDIR /app

COPY package.json .

RUN yarn package

COPY . .

EXPOSE 3000

CMD ["yarn" , "dev"]