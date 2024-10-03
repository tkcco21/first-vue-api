# 1. specify a base image
FROM node:10.24

WORKDIR /root/app

# 2. Download and install a dependency
## COPY {path of my machine} {path of the container}
COPY ./app/package* ./
RUN npm install

COPY ./app .

# 3. Tell the image what to do when it starts as a container
CMD ["npm", "start"]
