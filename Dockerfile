# Use the official Node.js 14 image
FROM node:20

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Run the tests
CMD ["npm", "test"]
