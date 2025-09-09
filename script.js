// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set up event listeners
  document.getElementById('generate-btn').addEventListener('click', generatePassword);
  document.getElementById('copy-btn').addEventListener('click', copyPassword);
  document.getElementById('length').addEventListener('input', function() {
    updateLength(this.value);
  });
  
  // Character type checkboxes
  const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      // Ensure at least one checkbox is selected
      const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
      if (!anyChecked) {
        this.checked = true;
        showToast('At least one character type must be selected');
      }
      
      // Visual indication of selection
      if (this.checked) {
        this.closest('.checkbox-item').classList.add('active');
      } else {
        this.closest('.checkbox-item').classList.remove('active');
      }
    });
  });
  
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('mobile-nav-active');
      hamburger.classList.toggle('active');
    });
  }
  
  // Smooth scrolling for navigation links
  const links = document.querySelectorAll('header nav a, .cta-button');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Close mobile menu if open
        if (navLinks.classList.contains('mobile-nav-active')) {
          navLinks.classList.remove('mobile-nav-active');
          hamburger.classList.remove('active');
        }
        
        // Scroll to section
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: 'smooth'
        });
        
        // Update active link
        document.querySelectorAll('.nav-links a').forEach(navLink => {
          navLink.classList.remove('active');
        });
        
        if (this.parentElement.parentElement.classList.contains('nav-links')) {
          this.classList.add('active');
        }
      }
    });
  });
  
  // Handle form submission
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      // Simple form validation
      if (!nameInput.value || !emailInput.value || !messageInput.value) {
        alert('Please fill in all fields');
        return;
      }
      
      // You would normally send this data to a server
      alert('Thank you for your message! We will get back to you soon.');
      
      // Reset form
      contactForm.reset();
    });
  }
  
  // Active link on scroll
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Generate an initial password
  generatePassword();
  
  // Add active class to initially checked checkboxes
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      checkbox.closest('.checkbox-item').classList.add('active');
    }
  });
});

function generatePassword() {
  const length = document.getElementById("length").value;
  
  // Get character sets based on checkboxes
  let charset = "";
  
  if (document.getElementById("uppercase").checked) {
    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  
  if (document.getElementById("lowercase").checked) {
    charset += "abcdefghijklmnopqrstuvwxyz";
  }
  
  if (document.getElementById("numbers").checked) {
    charset += "0123456789";
  }
  
  if (document.getElementById("special").checked) {
    charset += "!@#$%^&*()_-+=<>?{}[]|:;,.";
  }
  
  // Ensure we have at least one character type
  if (charset === "") {
    document.getElementById("uppercase").checked = true;
    charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    showToast('At least one character type must be selected');
  }

  // Generate the password
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomChar = charset[Math.floor(Math.random() * charset.length)];
    password += randomChar;
  }

  document.getElementById("password").value = password;
  
  // Calculate and display password strength
  calculatePasswordStrength(password);
  
  // Add animation effect to the generated password
  animatePasswordGeneration();
}

function updateLength(val) {
  document.getElementById("length-display").textContent = val;
}

function copyPassword() {
  const passwordInput = document.getElementById("password");
  
  // Select the password text
  passwordInput.select();
  passwordInput.setSelectionRange(0, 99999); // For mobile devices
  
  // Copy to clipboard
  navigator.clipboard.writeText(passwordInput.value)
    .then(() => {
      // Visual feedback for successful copy
      const copyBtn = document.getElementById("copy-btn");
      const originalHTML = copyBtn.innerHTML;
      
      copyBtn.innerHTML = '<i class="fas fa-check"></i>';
      copyBtn.style.backgroundColor = "#48bb78";
      
      setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.style.backgroundColor = "";
      }, 1500);
    })
    .catch(err => {
      console.error('Could not copy text: ', err);
      // Fallback for browsers that don't support clipboard API
      passwordInput.select();
      document.execCommand('copy');
      showToast('Password copied!');
    });
}

function calculatePasswordStrength(password) {
  let strength = 0;
  const length = password.length;
  
  // Calculate strength based on length
  if (length >= 8) strength += 20;
  if (length >= 12) strength += 20;
  if (length >= 16) strength += 10;
  
  // Calculate strength based on character variety
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  
  if (hasLowercase) strength += 10;
  if (hasUppercase) strength += 15;
  if (hasNumbers) strength += 15;
  if (hasSpecial) strength += 20;
  
  // Cap at 100
  strength = Math.min(strength, 100);
  
  // Update the UI to reflect password strength
  const strengthBar = document.getElementById('strength-bar');
  const strengthText = document.getElementById('strength-text');
  
  strengthBar.style.width = `${strength}%`;
  
  if (strength < 40) {
    strengthText.textContent = 'Weak Password';
    strengthText.style.color = '#f56565';
  } else if (strength < 70) {
    strengthText.textContent = 'Moderate Password';
    strengthText.style.color = '#ecc94b';
  } else {
    strengthText.textContent = 'Strong Password';
    strengthText.style.color = '#48bb78';
  }
}

function animatePasswordGeneration() {
  const passwordInput = document.getElementById('password');
  
  // Add a highlight effect
  passwordInput.style.backgroundColor = '#e9f5ff';
  
  setTimeout(() => {
    passwordInput.style.backgroundColor = '#f8fafc';
  }, 300);
}

function showToast(message) {
  // Check if a toast container already exists
  let toastContainer = document.querySelector('.toast-container');
  
  // If not, create one
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
    
    // Add style for the toast container if it doesn't exist yet
    if (!document.getElementById('toast-style')) {
      const style = document.createElement('style');
      style.id = 'toast-style';
      style.textContent = `
        .toast-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
        }
        .toast {
          padding: 12px 20px;
          background-color: #5a67d8;
          color: white;
          border-radius: 8px;
          margin-top: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          animation: fadeIn 0.3s ease, fadeOut 0.3s ease 2.7s;
          opacity: 0;
          transform: translateY(20px);
          animation-fill-mode: forwards;
        }
        @keyframes fadeIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
          to { opacity: 0; transform: translateY(-20px); }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Create a new toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  
  // Add it to the container
  toastContainer.appendChild(toast);
  
  // Remove it after animation completes
  setTimeout(() => {
    toast.remove();
  }, 3000);
}
  