FROM node:20.11.1
WORKDIR /app
COPY package.json . 
ENV NODE_NO_WARNINGS=1
RUN npm install
COPY . . 
EXPOSE 8080
CMD ["npm", "start"]


