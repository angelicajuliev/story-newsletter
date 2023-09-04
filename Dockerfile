FROM node:20-alpine
LABEL maintainer="julieth15gomez@gmail.com"
WORKDIR /stori

COPY package.json .
RUN yarn
ENV PATH="/stori/node_modules/.bin:$PATH"
COPY . .

CMD ["yarn", "start"]
