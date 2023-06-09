# Create an image to Angular
# Base image
FROM node:latest

# Create a directory for the app
WORKDIR /usr/src/app

# Copy package.json file to the container
COPY package.json .

# Install dependencies
RUN npm install

# Copy app files to the container
COPY . .

# Build the app
RUN npm run build --prod

# Expose the port
EXPOSE 4200

# Run the app
CMD ["npm", "start"]

# Build the image
# docker build -t <image-name> .

# Run the image
# docker run -p 4200:4200 <image-name>

# Run the image in background
# docker run -p 4200:4200 -d <image-name>

# Run the image with a name
# docker run -p 4200:4200 -d --name <container-name> <image-name>

# Stop the container
# docker stop <container-name>

# Start the container
# docker start <container-name>

# Remove the container
# docker rm <container-name>

# Remove all containers
# docker rm $(docker ps -a -q)

# Remove all images
# docker rmi $(docker images -q)
