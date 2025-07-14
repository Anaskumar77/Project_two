FROM node:22-slim

# Install build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    g++ \
    make \
 && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Only copy package files first (to cache dependencies)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of your code
COPY . .

EXPOSE 9000

# Start in dev mode
CMD ["npm", "run", "dev"]
