// script.js
document.addEventListener("DOMContentLoaded", function () {
    const productContainers = document.querySelectorAll(".product");
    const addToCartButtons = document.querySelectorAll(".addToCartBtn");
    const decreaseQtyButtons = document.querySelectorAll(".decreaseQtyBtn");
    const increaseQtyButtons = document.querySelectorAll(".increaseQtyBtn");
    const checkoutButton = document.getElementById("checkoutBtn");
    const checkoutModal = document.getElementById("checkoutModal");
    const closeModal = document.querySelector(".close");
    const checkoutForm = document.getElementById("checkoutForm");
    const cartOverview = document.getElementById("cartOverview");
    
    let cartItems = [];

    productContainers.forEach((container, index) => {
        const addToCartBtn = addToCartButtons[index];
        const decreaseQtyBtn = decreaseQtyButtons[index];
        const increaseQtyBtn = increaseQtyButtons[index];
        // const eachqty = container.querySelector(".selectedQty");
        const eachqty = container.querySelector(".qty");

        let productQuantity = 0;

        addToCartBtn.addEventListener("click", () => {
            if (!cartItems[index]) {
                cartItems[index] = {
                    name: `Product ${index + 1}`,
                    price: index === 0 ? 10 : 15,
                    quantity: 1,
                };
            } else {
                cartItems[index].quantity++;
            }
            productQuantity++;
            eachqty.textContent = `${productQuantity}`;
            updateCart();
        });

        decreaseQtyBtn.addEventListener("click", () => {
            if (cartItems[index].quantity < 0) {
                cartItems.splice(index, 1);
            }
            if (cartItems[index] && cartItems[index].quantity > 0) {
                cartItems[index].quantity--;
                if (cartItems[index].quantity === 0) {
                    cartItems.splice(index, 1);
                }
                

                productQuantity--;
                eachqty.textContent = `${productQuantity}`;
                updateCart();
            }
        });

        increaseQtyBtn.addEventListener("click", () => {
            if(!cartItems[index]){
                alert("Please add the item to your cart first!");
            }
            if (cartItems[index]) {
                cartItems[index].quantity++;
                productQuantity++;
                eachqty.textContent = `${productQuantity}`;
                updateCart();
            }
        });
    });

    checkoutButton.addEventListener("click", () => {
        checkoutModal.style.display = "block";
        displayCartOverview();
    });

    closeModal.addEventListener("click", () => {
        checkoutModal.style.display = "none";
    });

    checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const phone = document.getElementById("phone").value;

        // Here, you can send the order details (name, address, phone, cartItems) to your backend and handle the email sending.
        // This example only updates the cart count.
        cartItems = [];
        updateCart();
        checkoutModal.style.display = "none";
    });

    function updateCart() {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        const cartText = `Cart: ${totalItems} item${totalItems !== 1 ? "s" : ""}`;
        document.querySelector(".cart span").textContent = cartText;
    }

    function displayCartOverview() {
        cartOverview.innerHTML = "";
        cartItems.forEach((item, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");
            itemDiv.innerHTML = `
                <p>${item.name}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
            `;

            cartOverview.appendChild(itemDiv);
        });
    }
});
