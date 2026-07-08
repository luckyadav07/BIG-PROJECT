# What should happen?

# Docker will:

# Download Node.js image (FROM node:22)
# Copy package.json
# Run npm install
# Copy your source code
# Create an image named big-project

FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "start"]