# SecurePass - Password Generator

A modern, secure password generator web application built with HTML, CSS, and JavaScript, containerized with Docker.

## 🚀 Project Overview

SecurePass is a responsive web application that generates cryptographically secure passwords with customizable options. The application features a clean, modern UI and provides real-time password strength analysis.

## ✨ Features

- **Customizable Password Generation**: Choose length (6-24 characters) and character types
- **Real-time Strength Analysis**: Visual password strength meter
- **Copy to Clipboard**: One-click password copying
- **Responsive Design**: Works on desktop and mobile devices
- **Docker Support**: Easy deployment with containerization

## 🏗️ Project Structure

```
ccproject/
├── index.html          # Main HTML structure
├── style.css          # Styling and responsive design
├── script.js          # Password generation logic
├── dockerfile         # Docker configuration
└── README.md          # Project documentation
```

## 🐳 Docker Implementation

### Dockerfile Breakdown

```dockerfile
FROM nginx:alpine          # Use lightweight Nginx web server
COPY . /usr/share/nginx/html  # Copy website files to Nginx directory
EXPOSE 80                 # Make port 80 accessible
CMD ["nginx", "-g", "daemon off;"]  # Start Nginx in foreground
```

### Docker Concepts Used

- **Base Image**: `nginx:alpine` - Lightweight Linux distribution with Nginx
- **Layer Caching**: Efficient image building with minimal layers
- **Port Mapping**: Exposes internal port 80 to host system
- **Static File Serving**: Nginx serves HTML, CSS, and JS files efficiently

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
# Build the Docker image
docker build -t securepass .

# Run the container
docker run -p 8080:80 securepass

# Access the app at http://localhost:8080
```

### Local Development

```bash
# Simply open index.html in your browser
# Or use a local server:
python -m http.server 8000
# Access at http://localhost:8000
```

## 🔧 How It Works

1. **User Interface**: Clean, responsive design with intuitive controls
2. **Password Generation**: JavaScript uses `crypto.getRandomValues()` for secure randomness
3. **Strength Analysis**: Real-time calculation based on character diversity and length
4. **Docker Deployment**: Nginx serves static files with optimized performance

## 🛡️ Security Features

- Cryptographically secure random number generation
- No data storage or transmission
- Client-side processing (privacy-focused)
- HTTPS-ready deployment

## 📱 Browser Support

- Chrome, Firefox, Safari, Edge
- Mobile responsive design
- Modern JavaScript features

## 🚀 Deployment

The Docker setup makes deployment simple across any platform that supports Docker:

- **Cloud Platforms**: AWS, Google Cloud, Azure
- **Container Orchestration**: Kubernetes, Docker Swarm
- **CI/CD**: GitHub Actions, GitLab CI
