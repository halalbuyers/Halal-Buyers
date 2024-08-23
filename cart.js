// Initialize cart from local storage or empty array if not present
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render cart items
function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous items

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        document.querySelector('.cart-summary').style.display = 'none';
        return;
    }

    document.querySelector('.cart-summary').style.display = 'block';

    let subtotal = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const cartItemHTML = `
            <div class="cart-item" data-index="${index}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <input type="text" id="quantity-item${index}" value="${item.quantity}" readonly>
                    <button onclick="increaseQuantity(${index})">+</button>
                </div>
                <div class="cart-item-total">
                    $${itemTotal.toFixed(2)}
                </div>
                <span class="cart-item-remove" onclick="removeItem(${index})">✖</span>
            </div>
        `;

        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Function to save cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to clear the cart
function clearCart() {
    cart = [];
    saveCart();
    renderCart();
    updateCartCount();
}

// Function to increase item quantity
function increaseQuantity(index) {
    cart[index].quantity++;
    saveCart();
    renderCart();
    updateCartCount();
}

// Function to decrease item quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        saveCart();
        renderCart();
        updateCartCount();
    } else {
        removeItem(index);
    }
}

// Function to remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
    updateCartCount();
}

// Function to update cart count in the header
function updateCartCount() {
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Function to handle checkout process
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to proceed.");
    } else {
        alert("Proceeding to checkout...");
        // Implement checkout logic here
    }
}

// Render the cart on page load
renderCart();
updateCartCount();
