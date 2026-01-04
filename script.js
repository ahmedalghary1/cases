// ==================== Cart Functions ====================
function updateQuantity(button, change) {
    const quantityInput = button.parentElement.querySelector('.qty-input');
    let currentValue = parseInt(quantityInput.value);
    let newValue = currentValue + change;

    if (newValue >= 1 && newValue <= 10) {
        quantityInput.value = newValue;
        updateCartTotals();
    }
}

function removeItem(button) {
    if (confirm('هل تريد حذف هذا المنتج من السلة؟')) {
        const cartItem = button.closest('.cart-item');
        cartItem.style.opacity = '0';
        setTimeout(() => {
            cartItem.remove();
            updateCartTotals();
            updateCartCount();
        }, 300);
    }
}

function clearCart() {
    if (confirm('هل تريد إفراغ السلة بالكامل؟')) {
        const cartItems = document.querySelectorAll('.cart-item');
        cartItems.forEach(item => item.remove());
        updateCartTotals();
        updateCartCount();
        showToast('تم إفراغ السلة بنجاح', 'success');
    }
}

function updateCartTotals() {
    const cartItems = document.querySelectorAll('.cart-item');
    let subtotal = 0;

    cartItems.forEach(item => {
        const price = parseFloat(item.querySelector('.cart-item-price').textContent);
        const quantity = parseInt(item.querySelector('.qty-input').value);
        subtotal += price * quantity;
    });

    const shipping = subtotal > 500 ? 0 : 25;
    const total = subtotal + shipping;

    // Update displays
    if (document.querySelector('.subtotal')) {
        document.querySelector('.subtotal').textContent = subtotal + ' جنيه';
    }
    if (document.querySelector('.shipping')) {
        document.querySelector('.shipping').textContent = shipping + ' جنيه';
    }
    if (document.querySelector('.total-amount')) {
        document.querySelector('.total-amount').textContent = total + ' جنيه';
    }
}

function applyCoupon() {
    const couponInput = document.querySelector('.coupon-section input');
    const code = couponInput.value.trim();

    if (!code) {
        showToast('الرجاء إدخال كود الخصم', 'warning');
        return;
    }

    // Demo: accept "SAVE10" for 10% discount
    if (code === 'SAVE10') {
        showToast('تم تطبيق كود الخصم بنجاح!', 'success');
        // Apply discount logic here
    } else {
        showToast('كود الخصم غير صحيح', 'error');
    }
}

function updateCartCount() {
    const cartItems = document.querySelectorAll('.cart-item');
    const count = cartItems.length;
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'block' : 'none';
    });
}

// ==================== Authentication Functions ====================
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        showToast('تم تسجيل الدخول بنجاح!', 'success');
        setTimeout(() => {
            window.location.href = 'my-account.html';
        }, 1500);
    }
}

function handleRegister(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        showToast('كلمة المرور غير متطابقة', 'error');
        return;
    }

    showToast('تم إنشاء الحساب بنجاح!', 'success');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId || 'password');
    const icon = input.nextElementSibling.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
    }
}

function logout() {
    if (confirm('هل تريد تسجيل الخروج؟')) {
        showToast('تم تسجيل الخروج بنجاح', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// ==================== Product Functions ====================
function addToCart() {
    showToast('تم إضافة المنتج إلى السلة', 'success');
    updateCartCount();

    // Animate cart icon
    const cartBtn = document.querySelector('.btn-outline-primary i.bi-cart3');
    if (cartBtn) {
        cartBtn.classList.add('animate-bounce');
        setTimeout(() => {
            cartBtn.classList.remove('animate-bounce');
        }, 500);
    }
}

function addToWishlist() {
    showToast('تم إضافة المنتج إلى المفضلة', 'success');
}

function toggleWishlist(button) {
    const icon = button.querySelector('i');
    if (icon.classList.contains('bi-heart')) {
        icon.classList.remove('bi-heart');
        icon.classList.add('bi-heart-fill');
        button.classList.add('active');
        showToast('تم الإضافة إلى المفضلة', 'success');
    } else {
        icon.classList.remove('bi-heart-fill');
        icon.classList.add('bi-heart');
        button.classList.remove('active');
        showToast('تم الإزالة من المفضلة', 'info');
    }
}

function removeFromWishlist(button) {
    if (confirm('هل تريد إزالة هذا المنتج من المفضلة؟')) {
        const card = button.closest('.product-card').parentElement;
        card.style.opacity = '0';
        setTimeout(() => card.remove(), 300);
        showToast('تم الإزالة من المفضلة', 'info');
    }
}

function changeImage(thumbnail) {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');

    // Get high-res version of thumbnail
    const newSrc = thumbnail.src.replace('w=100&h=100', 'w=600&h=600');
    mainImage.src = newSrc;
}

// ==================== Order Tracking ====================
function trackOrder() {
    const orderNumber = document.getElementById('orderNumber').value;
    if (!orderNumber) {
        showToast('الرجاء إدخال رقم الطلب', 'warning');
        return;
    }

    // Show tracking result (demo)
    document.getElementById('trackingResult').style.display = 'block';
    document.getElementById('trackingResult').scrollIntoView({ behavior: 'smooth' });
}

// ==================== Toast Notifications ====================
function showToast(message, type = 'info') {
    // Create toast container if doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;

    const icons = {
        success: 'bi-check-circle-fill',
        error: 'bi-x-circle-fill',
        warning: 'bi-exclamation-triangle-fill',
        info: 'bi-info-circle-fill'
    };

    toast.innerHTML = `
        <i class="bi ${icons[type]}"></i>
        <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Animate in
    setTimeout(() => toast.classList.add('show'), 100);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==================== Smooth Scroll ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', function () {
    // Initialize cart count
    updateCartCount();

    // Add loading animation removal
    document.body.classList.add('loaded');

    // Initialize AOS (if you want to add it later)
    console.log('متجر جرابات برو - تم تحميل الصفحة بنجاح');
});

// ==================== Navbar Scroll Effect ====================
let lastScroll = 0;
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }

    lastScroll = currentScroll;
});
