/*// Toggle sidebar menu
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById("cart-sidebar");
    cartSidebar.classList.toggle("active");
}

// Simple cart functionality
let cart = [];
let cartCount = 0;

// Add to cart
function addToCart(name, price) {
    cart.push({ name, price });
    cartCount++;
    
    // Update cart count display
    document.querySelector('.cart-count').textContent = cartCount;
    
    // Show simple confirmation
    alert(`${name} added to cart!`);
}

// Search functionality
function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim();
    
    if (query === '') {
        alert('Please enter a search term');
        return;
    }
    
    alert(`Searching for: ${query}`);
} 
*/
// Cart data
let cart = [];

// Toggle sidebar menu
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('active');
}

// Add product to cart
function addToCart(name, price) {
    cart.push({ name, price });
    
    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
    
    // Update cart display
    updateCartDisplay();
    
    alert(`${name} added to cart!`);
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart-msg">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
    } else {
        let cartHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            total += item.price;
            cartHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">Rs.${item.price.toFixed(2)}</div>
                    </div>
                </div>
            `;
        });
        
        cartItems.innerHTML = cartHTML;
        cartTotal.textContent = total.toFixed(2);
    }
}

// Filter products by category
function filterProducts(category) {
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Simple filter - hide/show products
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Add some items before checking out.');
        return;
    }
    
    // Update order summary
    const orderSummary = document.getElementById('orderSummary');
    const orderTotal = document.getElementById('orderTotal');
    
    let summaryHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price;
        summaryHTML += `
            <div class="order-item">
                <span>${item.name}</span>
                <span>Rs.${item.price.toFixed(2)}</span>
            </div>
        `;
    });
    
    orderSummary.innerHTML = summaryHTML;
    orderTotal.textContent = total.toFixed(2);
    
    // Scroll to checkout section
    document.getElementById('checkoutSection').scrollIntoView({ behavior: 'smooth' });
    
    // Close cart sidebar
    toggleCart();
}

// Review modal functions
function openReviewModal(productName) {
    document.getElementById('reviewProductName').textContent = productName;
    document.getElementById('reviewModal').classList.add('active');
}

function closeReviewModal() {
    document.getElementById('reviewModal').classList.remove('active');
    // Reset rating
    document.querySelectorAll('.star').forEach(star => {
        star.classList.remove('active');
    });
}

function setRating(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Search function
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') {
        alert('Please enter a search term');
        return;
    }
    
    const productCards = document.querySelectorAll('.product-card');
    let found = false;
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(query)) {
            card.style.display = 'block';
            found = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    if (!found) {
        alert('No products found matching your search');
    }
}

// Handle checkout form submission
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        alert('Your cart is empty. Add some items before placing an order.');
        return;
    }
    
    const customerName = document.getElementById('customerName').value;
    alert(`Thank you for your order, ${customerName}! Your order has been placed.`);
    
    // Reset cart and form
    cart = [];
    updateCartDisplay();
    this.reset();
    document.querySelector('.cart-count').textContent = '0';
});

// Handle review form submission
document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your review!');
    closeReviewModal();
    this.reset();
});

// Close sidebar when clicking outside
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.querySelector('.menu-btn');
    
    if (sidebar.classList.contains('active') && 
        !sidebar.contains(event.target) && 
        !menuBtn.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
});