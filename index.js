document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById("productList");
    const cartCountElement = document.querySelector(".cart-count");

    // Example product data
    const products = [
        { id: 1, name: "Product 1", price: 10, img: "product1.jpg" },
        { id: 2, name: "Product 2", price: 20, img: "product2.jpg" },
        { id: 3, name: "Product 3", price: 30, img: "product3.jpg" },
        { id: 4, name: "Product 4", price: 40, img: "product4.jpg" }
    ];

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        cartCountElement.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    function addToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} added to cart!`);
    }

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button>Add to Cart</button>
        `;

        const addButton = productDiv.querySelector("button");
        addButton.addEventListener("click", () => addToCart(product));

        productList.appendChild(productDiv);
    });

    updateCartCount();
});
