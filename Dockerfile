# Build the Angular application - Use Node.js 18 image as base for building the app
FROM node:20 AS build

# Set the working directory inside the container - All subsequent commands will run from this directory
WORKDIR /app

# Copy package.json and package-lock.json (if present) - This ensures all dependencies are installed correctly
COPY package*.json ./

# Install the dependencies - Install the required Node.js packages
RUN npm install

# Copy all project files into the container - This will copy all project files into the container
COPY . .

# Build the Angular application for production - Generates the optimized production build
RUN npm run build --configuration=production 

# Step 2: Serve the application with Nginx - Use a lightweight Alpine Nginx image as the base
FROM nginx:alpine

# Remove the default Nginx configuration - Remove the default config file provided by Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration file into the container - Use our own configuration for serving the app
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the built Angular files from the build step into the Nginx directory - Serve Angular from this directory
COPY --from=build /app/dist/front-angular-lirafus/browser /usr/share/nginx/html

# Create a non-root user and group for running Nginx - Non-root user setup
RUN addgroup -S front-angular-lirafus-group && adduser -S front-angular-lirafus-user -G front-angular-lirafus-group

# Change ownership of the necessary directories to the new user - Ensure correct permissions
RUN chown -R front-angular-lirafus-user:front-angular-lirafus-group /etc/nginx /var/cache/nginx /usr/share/nginx/html /var/run/

# Switch to the non-root user for security reasons - Run the container as this user
USER front-angular-lirafus-user

# Expose the port that the application will run on - Expose the port Nginx will serve on
EXPOSE 3920

# Start Nginx when the container runs - Keep Nginx running in the foreground
CMD ["nginx", "-g", "daemon off;"]
