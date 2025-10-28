# 1. Use Node base image
FROM node:18

# 2. Set working directory
WORKDIR /app

# 3. Copy package files first
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the app
COPY . .

# 6. Expose the backend port
EXPOSE 4000

# 7. Start the backend server
CMD ["npm", "run", "dev"]
