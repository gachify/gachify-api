# Build
FROM node:20-alpine As build

WORKDIR /usr/src/app

# Copy source code into app folder
COPY --chown=node:node . .

# Install python
RUN apk add curl python3 --no-cache --virtual build-dependencies build-base gcc 

# Install dependencies
RUN npm ci

# Generate the production build
RUN npm run build

# Set to production environment
ENV NODE_ENV production

# Install dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Set Docker as a non-root user
USER node

# Production
FROM node:20-alpine As production

# Install ffmpeg and yt-dlp
RUN apk update && apk add ffmpeg yt-dlp

# Install python
RUN apk add curl python3 --no-cache --virtual build-dependencies build-base gcc 

WORKDIR /app

# Set to production environment
ENV NODE_ENV production

# Copy only the necessary files
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Set Docker as non-root user
USER node

CMD [ "node", "dist/main.js" ]