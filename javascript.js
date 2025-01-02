document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        // Show the button when scrolling down
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });

        // Smooth scroll to the top
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const scrollToCartBtn = document.getElementById("scroll-to-cart");
    const cartSection = document.getElementById("cart-section");

    // Show/hide the "Scroll to Cart" button based on scroll position
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) { // Adjust threshold as needed
            scrollToCartBtn.style.display = "block";
        } else {
            scrollToCartBtn.style.display = "none";
        }
    });

    // Scroll to cart section when button is clicked
    scrollToCartBtn.addEventListener("click", () => {
        cartSection.scrollIntoView({ behavior: "smooth" });
    });

    /*Cart js menu page*/
    const cart = [];
    const cartItemsContainer = document.getElementById("cart-items-container");
    const cartTotal = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout");

    // Add to cart logic
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const name = button.getAttribute("data-name");
            const price = parseFloat(button.getAttribute("data-price"));

            // Add item to cart
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            updateCartUI();
        });
    });

    // Update cart UI
    const updateCartUI = () => {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cartItemsContainer.innerHTML = cart.map((item, index) =>
                `<div class="cart-item">
                    <span>${item.name} - ₱${item.price.toFixed(2)} x ${item.quantity}</span>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>`).join("");
        }

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartTotal.textContent = total.toFixed(2);

        attachRemoveHandlers();
    };

    // Attach event listeners to remove buttons
    const attachRemoveHandlers = () => {
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", () => {
                const index = parseInt(button.getAttribute("data-index"), 10);
                cart.splice(index, 1);
                updateCartUI();
            });
        });
    };

    // Checkout logic
    checkoutBtn.addEventListener("click", () => {
        if (!cart.length) {
            alert("Your cart is empty!");
            return;
        }

        alert("Thank you for your purchase!");
        cart.length = 0;
        updateCartUI();
    });
});
