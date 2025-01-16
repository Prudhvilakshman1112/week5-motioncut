// Menu Items Data
const menuItems = [
    {
        id: '1',
        name: 'South Indian Thali',
        description: 'Traditional South Indian meal with rice, sambar, rasam, and vegetables',
        price: 149,
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80',
        rating: 4.5
    },
    {
        id: '2',
        name: 'North Indian Thali',
        description: 'Complete North Indian meal with roti, dal, paneer, and curry',
        price: 169,
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80',
        rating: 4.3
    },
    {
        id: '3',
        name: 'Gujarati Thali',
        description: 'Authentic Gujarati thali with khichdi, kadhi, and seasonal vegetables',
        price: 159,
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80',
        rating: 4.6
    },
    {
        id: '4',
        name: 'Bengali Thali',
        description: 'Traditional Bengali meal with fish curry, rice, and mixed vegetables',
        price: 179,
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80',
        rating: 4.4
    },
    {
        id: '5',
        name: 'Maharashtrian Thali',
        description: 'Complete Maharashtrian meal with bhakri, pitla, and bharli vangi',
        price: 165,
        image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&q=80',
        rating: 4.5
    },
    {
        id: '6',
        name: 'Punjabi Thali',
        description: 'Hearty Punjabi thali with butter chicken, naan, and dal makhani',
        price: 189,
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80',
        rating: 4.7
    }
];

// Reviews Data
const reviews = [
    {
        id: '1',
        userName: 'Priya Singh',
        rating: 5,
        comment: 'The food is absolutely delicious and reminds me of home. Great service!',
        date: '2024-03-10'
    },
    {
        id: '2',
        userName: 'Rahul Sharma',
        rating: 4,
        comment: 'Consistent quality and on-time delivery. Highly recommended!',
        date: '2024-03-09'
    }
];

// User Authentication
let currentUser = null;
let cart = [];

// Check if user is logged in (from localStorage)
function checkAuth() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForAuth();
    }
}

// Update UI based on auth state
function updateUIForAuth() {
    const userButton = document.getElementById('user-button');
    if (currentUser) {
        userButton.textContent = currentUser.name.charAt(0).toUpperCase();
        userButton.onclick = showProfileModal;
    } else {
        userButton.textContent = '👤';
        userButton.onclick = showAuthModal;
    }
}

// Auth Modal Functions
function showAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.style.display = 'block';
    switchAuthForm('login');
}

function showProfileModal() {
    const modal = document.getElementById('profile-modal');
    const initial = document.getElementById('profile-initial');
    const name = document.getElementById('profile-name');
    const email = document.getElementById('profile-email');
    const phone = document.getElementById('profile-phone');

    initial.textContent = currentUser.name.charAt(0).toUpperCase();
    name.textContent = currentUser.name;
    email.textContent = currentUser.email;
    phone.textContent = currentUser.phone;

    modal.style.display = 'block';
}

function switchAuthForm(form) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (form === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const authModal = document.getElementById('auth-modal');
    const profileModal = document.getElementById('profile-modal');
    if (event.target === authModal) {
        authModal.style.display = 'none';
    }
    if (event.target === profileModal) {
        profileModal.style.display = 'none';
    }
}

// Close modals when clicking the close button
document.querySelectorAll('.close-modal').forEach(button => {
    button.onclick = function() {
        this.closest('.modal').style.display = 'none';
    }
});

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // In a real application, you would validate these credentials with a server
    // For demo purposes, we'll use localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = {
            name: user.name,
            email: user.email,
            phone: user.phone
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUIForAuth();
        document.getElementById('auth-modal').style.display = 'none';
        alert('Successfully logged in!');
    } else {
        alert('Invalid email or password');
    }
    return false;
}

// Handle Signup
function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const phone = document.getElementById('signup-phone').value;

    // In a real application, you would send this data to a server
    // For demo purposes, we'll use localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some(u => u.email === email)) {
        alert('Email already registered');
        return false;
    }

    const newUser = { name, email, password, phone };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    currentUser = {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    updateUIForAuth();
    document.getElementById('auth-modal').style.display = 'none';
    alert('Successfully registered!');
    return false;
}

// Handle Logout
function handleLogout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    updateUIForAuth();
    document.getElementById('profile-modal').style.display = 'none';
}

// Mobile Menu Toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
});

// Render Menu Items
function renderMenuItems() {
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = menuItems.map(item => `
        <div class="menu-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-title">${item.name}</h3>
                    <span class="menu-item-rating">⭐ ${item.rating}</span>
                </div>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-footer">
                    <span class="menu-item-price">₹${item.price}</span>
                    <button class="add-to-cart" onclick="addToCart('${item.id}')">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Render Reviews
function renderReviews() {
    const reviewsContainer = document.getElementById('reviews-container');
    reviewsContainer.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="review-avatar">${review.userName.charAt(0)}</div>
                <div>
                    <h3>${review.userName}</h3>
                    <div class="stars">
                        ${'⭐'.repeat(review.rating)}
                    </div>
                </div>
            </div>
            <p>${review.comment}</p>
            <p class="review-date">${new Date(review.date).toLocaleDateString()}</p>
        </div>
    `).join('');
}

// Cart functionality
function addToCart(itemId) {
    if (!currentUser) {
        alert('Please login to add items to cart');
        showAuthModal();
        return;
    }

    const item = menuItems.find(item => item.id === itemId);
    if (item) {
        cart.push(item);
        updateCartCount();
        alert(`${item.name} added to cart!`);
    }
}

function updateCartCount() {
    const cartButton = document.getElementById('cart-button');
    cartButton.textContent = cart.length > 0 ? `🛒 ${cart.length}` : '🛒';
}

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send this data to a server
    console.log('Form submitted:', { name, email, message });
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    renderMenuItems();
    renderReviews();
    
    // Set up cart button click handler
    document.getElementById('cart-button').addEventListener('click', () => {
        if (!currentUser) {
            alert('Please login to view your cart');
            showAuthModal();
            return;
        }
        
        if (cart.length === 0) {
            alert('Your cart is empty');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        alert(`Cart Total: ₹${total}\n\nItems:\n${cart.map(item => `${item.name} - ₹${item.price}`).join('\n')}`);
    });
});