FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env.local .env.local
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "dev"] 