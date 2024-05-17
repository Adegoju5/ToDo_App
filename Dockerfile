FROM node:19.5.0-alpine
WORKDIR /app
COPY package.json ./
COPY public /app/public
COPY .idea /app/.idea
RUN npm install
COPY . .
EXPOSE 3000
<<<<<<< HEAD
CMD ["npm","run","start"]
=======
CMD ["npm","run","start"]
>>>>>>> a110e40 (expose-3000)
