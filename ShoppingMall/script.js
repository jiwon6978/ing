// Mock Data
const products = [
    {
        id: 1,
        title: "Keychron Q1 Pro",
        price: 199.00,
        category: "keyboard",
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        title: "MX Master 3S",
        price: 99.00,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        title: "Sony WH-1000XM5",
        price: 348.00,
        category: "audio",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 4,
        title: "NuPhy Air75",
        price: 129.00,
        category: "keyboard",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b91add1?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 5,
        title: "BenQ ScreenBar",
        price: 109.00,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1616353071855-2c045c4458ae?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 6,
        title: "Herman Miller Aeron",
        price: 1450.00,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 7,
        title: "Audio-Technica ATH-M50x",
        price: 149.00,
        category: "audio",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 8,
        title: "Grovemade Desk Shelf",
        price: 280.00,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=800",
    }
];

// State
let cart = [];
let currentCategory = 'all';

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartBtn = document.getElementById('cart-btn');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total-price');
const cartCountEl = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const toast = document.getElementById('toast');
const shopNowBtn = document.getElementById('shop-now-btn');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
});

// Render Products
function renderProducts() {
    productGrid.innerHTML = '';
    
    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(p => p.category === currentCategory);

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.title}" class="product-image">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// Cart Logic
window.addToCart = function(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    cart.push(product);
    updateCartUI();
    showToast(`Added ${product.title} to cart`);
    
    // Animate cart button
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => cartBtn.style.transform = 'scale(1)', 200);
};

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
};

function updateCartUI() {
    // Update Count
    cartCountEl.textContent = cart.length;

    // Update Total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalEl.textContent = `$${total.toFixed(2)}`;

    // Enable/Disable Checkout
    checkoutBtn.disabled = cart.length === 0;

    // Render Items
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your stash is empty.</div>';
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

// Event Listeners
function setupEventListeners() {
    // Filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');
            // Update state
            currentCategory = btn.dataset.category;
            renderProducts();
        });
    });

    // Cart Toggle
    cartBtn.addEventListener('click', () => {
        cartOverlay.classList.remove('hidden');
    });

    closeCartBtn.addEventListener('click', () => {
        cartOverlay.classList.add('hidden');
    });

    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            cartOverlay.classList.add('hidden');
        }
    });

    // Checkout
    checkoutBtn.addEventListener('click', () => {
        alert('Proceeding to payment gateway... (This is a demo)');
        cart = [];
        updateCartUI();
        cartOverlay.classList.add('hidden');
    });
    
    // Shop Now Scroll
    shopNowBtn.addEventListener('click', () => {
        productGrid.scrollIntoView({ behavior: 'smooth' });
    });
}

// Toast Notification
function showToast(message) {
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}
