document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-container');
    const totalItemsElement = document.getElementById('total-items');
    const totalPriceElement = document.getElementById('total-price');
    
    // Retrieve cart items from localStorage or initialize as an empty array
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Function to update the cart summary
    function updateCartSummary() {
        cartItemsContainer.innerHTML = '';
        let totalItems = 0;
        let totalPrice = 0;

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cartItems.forEach(item => {
                totalItems += 1; // Counting each item once
                totalPrice += parseFloat(item.price);

                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p class="cart-item-price">$${item.price}</p>
                        <button class="btn remove-btn" data-id="${item.id}">Remove</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }

        totalItemsElement.textContent = totalItems;
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Add to cart functionality on shop page
    if (document.querySelector('#shop')) {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productItem = button.closest('.product-item');
                const item = {
                    id: productItem.getAttribute('data-id'),
                    name: productItem.getAttribute('data-name'),
                    price: parseFloat(productItem.getAttribute('data-price')),
                    image: productItem.getAttribute('data-image')
                };
                cartItems.push(item);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                alert('Item added to cart!');
                updateCartSummary(); // Update summary immediately
            });
        });
    }

    // Remove item functionality on cart page
    if (document.querySelector('#cart')) {
        updateCartSummary();

        cartItemsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-btn')) {
                const itemId = event.target.getAttribute('data-id');
                const updatedCartItems = cartItems.filter(item => item.id !== itemId);
                localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
                cartItems.length = 0; // Clear existing cartItems array
                cartItems.push(...updatedCartItems); // Re-populate with updated items
                updateCartSummary();
            }
        });
    }

    // Checkout button functionality
    const checkoutButton = document.querySelector('.checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            window.location.href = 'checkout.html'; // Replace with actual checkout page URL
        });
    }

    // Contact form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            
            const formData = new FormData(this);
            fetch(this.action, {
                method: 'POST',
                body: formData,
            })
            .then(response => {
                if (response.ok) {
                    alert('Message sent successfully!');
                    this.reset(); // Reset the form
                } else {
                    alert('There was a problem with your submission. Please try again.');
                }
            })
            .catch(error => {
                alert('There was an error sending your message.');
                console.error('Error:', error);
            });
        });
    }
});
