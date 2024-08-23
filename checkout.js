document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkoutForm');
    const cardDetails = document.getElementById('cardDetails');
    const paymentMethod = document.getElementById('payment');
    const orderSummaryBody = document.querySelector('#orderSummary tbody');
    const totalAmount = document.getElementById('totalAmount');

    // Retrieve cart items
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${subtotal.toFixed(2)}</td>
        `;
        orderSummaryBody.appendChild(row);
    });

    totalAmount.textContent = total.toFixed(2);

    paymentMethod.addEventListener('change', function() {
        if (this.value === 'card') {
            cardDetails.style.display = 'block';
        } else {
            cardDetails.style.display = 'none';
        }
    });

    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate form
        let isValid = true;

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const payment = document.getElementById('payment').value;

        if (!name) {
            document.getElementById('nameError').textContent = 'Name is required';
            isValid = false;
        } else {
            document.getElementById('nameError').textContent = '';
        }

        if (!address) {
            document.getElementById('addressError').textContent = 'Address is required';
            isValid = false;
        } else {
            document.getElementById('addressError').textContent = '';
        }

        if (!email) {
            document.getElementById('emailError').textContent = 'Email is required';
            isValid = false;
        } else {
            document.getElementById('emailError').textContent = '';
        }

        if (!phone) {
            document.getElementById('phoneError').textContent = 'Phone number is required';
            isValid = false;
        } else {
            document.getElementById('phoneError').textContent = '';
        }

        if (payment === 'card') {
            const cardNumber = document.getElementById('cardNumber').value;
            const cardExpiry = document.getElementById('cardExpiry').value;
            const cardCVC = document.getElementById('cardCVC').value;

            if (!cardNumber) {
                document.getElementById('cardNumberError').textContent = 'Card number is required';
                isValid = false;
            } else {
                document.getElementById('cardNumberError').textContent = '';
            }

            if (!cardExpiry) {
                document.getElementById('cardExpiryError').textContent = 'Expiry date is required';
                isValid = false;
            } else {
                document.getElementById('cardExpiryError').textContent = '';
            }

            if (!cardCVC) {
                document.getElementById('cardCVCError').textContent = 'CVC is required';
                isValid = false;
            } else {
                document.getElementById('cardCVCError').textContent = '';
            }
        }

        if (isValid) {
            alert('Order placed successfully!');
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const cartCountElement = document.querySelector(".cart-count");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        cartCountElement.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    updateCartCount();
});
