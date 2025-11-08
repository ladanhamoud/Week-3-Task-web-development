import { saveCart, loadCart } from "./storage.js";

let cart = loadCart();

const cartSidebar = document.getElementById("cartSidebar");
const cartIcon = document.getElementById("cartIcon");
const closeCart = document.getElementById("closeCart");
const clearCart = document.getElementById("clearCart");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const navLinks = document.getElementById("navLinks");
const menuIcon = document.getElementById("menuIcon");

const products = [
    { id: 1, name: "Apple", price: 1.5 },
    { id: 2, name: "Banana", price: 0.8 },
    { id: 3, name: "Mango", price: 2.5 },
    { id: 4, name: "Orange", price: 1.2 },
    { id: 5, name: "Watermelon", price: 4.0 },
    { id: 6, name: "Strawberry", price: 3.0 },
    { id: 7, name: "Tomato", price: 1.3 },
    { id: 8, name: "Carrot", price: 0.9 },

];

function updateCart() {
    cartItems.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price * item.qty;
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <span>${item.name} x${item.qty}</span>
            <span>$${(item.price * item.qty).toFixed(2)}</span>
            <button onclick="removeItem(${index})">X</button>
        `;
        cartItems.appendChild(div);
    });

    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("tax").textContent = tax.toFixed(2);
    document.getElementById("total").textContent = total.toFixed(2);
    cartCount.textContent = cart.length;

    saveCart(cart);
}

export function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) existing.qty++;
    else cart.push({ ...product, qty: 1 });

    updateCart();
    cartSidebar.classList.add("active");
}

window.removeItem = (index) => {
    cart.splice(index, 1);
    updateCart();
};

cartIcon.addEventListener("click", () => {
    cartSidebar.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
});

clearCart.addEventListener("click", () => {
    cart = [];
    updateCart();
});

menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

updateCart();
