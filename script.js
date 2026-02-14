const priceButtons = document.querySelectorAll(".price-btn");
const customInput = document.getElementById("customAmount");
const buyBtn = document.getElementById("buyBtn");
const checkoutBtn = document.getElementById("checkoutBtn");
const cartCount = document.getElementById("cartCount");
const result = document.getElementById("result");
const themeToggle = document.getElementById("themeToggle");

const modal = document.getElementById("checkoutModal");
const closeModal = document.getElementById("closeModal");
const totalAmount = document.getElementById("totalAmount");
const payBtn = document.getElementById("payBtn");
const paymentResult = document.getElementById("paymentResult");

let selectedAmount = 0;
let cartItems = [];
const minimumAmount = 10;

/* Izvēles pogas */
priceButtons.forEach(button => {
    button.addEventListener("click", () => {
        priceButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        selectedAmount = parseFloat(button.dataset.value);
        customInput.value = "";
    });
});

/* Pievienot grozam */
buyBtn.addEventListener("click", () => {
    let customValue = parseFloat(customInput.value);
    let finalAmount = customValue || selectedAmount;

    if (!finalAmount || finalAmount < minimumAmount) {
        result.textContent = "❌ Minimālā summa ir 10 €!";
        result.style.color = "var(--error)";
        return;
    }

    cartItems.push(finalAmount);
    cartCount.textContent = cartItems.length;

    result.textContent = `✅ ${finalAmount.toFixed(2)} € pievienots grozam`;
    result.style.color = "var(--success)";
});

/* Checkout */
checkoutBtn.addEventListener("click", () => {
    if (cartItems.length === 0) {
        alert("Groziņš ir tukšs!");
        return;
    }

    const total = cartItems.reduce((a, b) => a + b, 0);
    totalAmount.textContent = total.toFixed(2) + " €";
    modal.style.display = "flex";
});

/* Aizvērt modal */
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

/* Maksājuma validācija */
payBtn.addEventListener("click", () => {
    const cardNumber = document.getElementById("cardNumber").value;

    if (cardNumber.length !== 16) {
        paymentResult.textContent = "❌ Nepareizs kartes numurs!";
        paymentResult.style.color = "var(--error)";
        return;
    }

    paymentResult.textContent = "✅ Maksājums veiksmīgs!";
    paymentResult.style.color = "var(--success)";

    cartItems = [];
    cartCount.textContent = 0;
});

/* Dark mode */
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = 
        document.body.classList.contains("dark") ? "☀" : "🌙";
});
