# Use the official Nginx image
FROM nginx:alpine

# Copy static website files to the default Nginx public folder
COPY . /usr/share/nginx/html

# Expose port 80 to access the app
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]


