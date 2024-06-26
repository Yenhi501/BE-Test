FROM node:20-alpine
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install --save-dev nodemon
RUN npm i -g ts-node-dev
RUN npm i -g rimraf

# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle app source
COPY . .
EXPOSE 8000
CMD [ "npm","run", "start:dev" ]

