FROM node:16

USER node

WORKDIR /usr/src/todo

COPY --chown=node:node . .

RUN npm ci

ENV DEBUG=todo-backend:*

CMD npm start