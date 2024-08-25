// Sample product data
const products = [
    {
        id: 1,
        name: "Product 1",
        price: 20.00,
        image: "path_to_image/product1.jpg"
    },
    {
        id: 2,
        name: "Product 2",
        price: 30.00,
        image: "path_to_image/product2.jpg"
    },
    {
        id: 3,
        name: "Product 3",
        price: 40.00,
        image: "path_to_image/product3.jpg"
    }
];

// Function to render products
function renderProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productHTML = `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productList.insertAdjacentHTML('beforeend', productHTML);
    });
}

// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
    updateCartCount();
}

// Function to update cart count in the header
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Render products and update cart count on page load
renderProducts();
updateCartCount();
