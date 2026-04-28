// script.js
let cart = [];
let selectedDesign = 1;
let promoApplied = false;

// Summas
const amounts = [10, 25, 50, 75, 100, 150, 200];

// Render summu kartītes
function renderAmountCards() {
  const container = document.getElementById('amount-grid');
  container.innerHTML = '';

  amounts.forEach(amount => {
    const isPopular = amount === 50 || amount === 100;
    const card = document.createElement('div');
    card.className = `amount-card ${isPopular ? 'popular' : ''}`;
    card.innerHTML = `<h3>${amount}€</h3>`;
    card.onclick = () => {
      document.getElementById('custom-amount').value = amount;
      updatePreview();
    };
    container.appendChild(card);
  });
}

// Render dizaina opcijas
function renderDesignOptions() {
  const container = document.getElementById('design-options');
  container.innerHTML = '';

  for (let i = 1; i <= 4; i++) {
    const option = document.createElement('div');
    option.className = `design-option ${selectedDesign === i ? 'active' : ''}`;
    option.style.background = `linear-gradient(135deg, hsl(${i*65}, 85%, 60%), hsl(${i*80}, 85%, 55%))`;
    option.onclick = () => {
      selectedDesign = i;
      renderDesignOptions();
      updatePreview();
    };
    container.appendChild(option);
  }
}

// Atjaunināt priekšskatījumu
function updatePreview() {
  const amount = document.getElementById('custom-amount').value || 50;
  const name = document.getElementById('recipient-name').value || "Dārgais draugs";
  const message = document.getElementById('message').value || "Ar vislabākajiem novēlējumiem!";

  const preview = document.getElementById('preview-card');
  preview.innerHTML = `
    <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between; color: black;">
      <div>
        <p style="opacity: 0.8; font-size: 0.95rem;">Dāvanu karte</p>
        <p style="font-size: 3.5rem; font-weight: 700; margin-top: 8px;">${amount}€</p>
      </div>
      <div>
        <p style="font-weight: 600; font-size: 1.3rem;">${name}</p>
        <p style="margin-top: 12px; font-size: 1rem; line-height: 1.4;">${message}</p>
      </div>
      <div style="text-align: right; font-size: 0.85rem; opacity: 0.7;">davanukarte.lv</div>
    </div>
  `;
}

// Pievienot grozam
function addToCart() {
  const amount = parseFloat(document.getElementById('custom-amount').value);
  
  if (!amount || amount < 5) {
    alert("Minimālā summa ir 5€!");
    return;
  }

  const item = {
    id: Date.now(),
    amount: amount,
    recipient: document.getElementById('recipient-name').value || "Dārgais draugs",
    message: document.getElementById('message').value || "",
    design: selectedDesign
  };

  cart.push(item);
  updateCartCount();
  alert(`${amount}€ dāvanu karte pievienota grozam!`);
}

// Pievienot custom summu
function addCustomToCart() {
  const amount = parseFloat(document.getElementById('custom-amount').value);
  if (amount >= 5) {
    addToCart();
  } else {
    alert("Minimālā summa ir 5€!");
  }
}

// Groza atjaunināšana
function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.length;
}

// Rādīt grozu
document.getElementById('cart-btn').addEventListener('click', () => {
  document.getElementById('cart-modal').style.display = 'flex';
  renderCart();
});

function closeCart() {
  document.getElementById('cart-modal').style.display = 'none';
}

function renderCart() {
  const container = document.getElementById('cart-items');
  container.innerHTML = '';

  let total = 0;

  cart.forEach((item, index) => {
    total += item.amount;
    const div = document.createElement('div');
    div.className = "cart-item";
    div.style.cssText = "display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #3f3f46;";
    div.innerHTML = `
      <div>
        <strong>${item.amount}€</strong> — ${item.recipient}
      </div>
      <button onclick="removeFromCart(${index})" style="color: #ef4444;">Dzēst</button>
    `;
    container.appendChild(div);
  });

  document.getElementById('cart-total').textContent = total.toFixed(2) + "€";
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
  updateCartCount();
}

function applyPromoCode() {
  const code = document.getElementById('promo-code').value.trim().toUpperCase();
  if (code === "GIFT10" || code === "DAVANU10") {
    alert("Promo kods piemērots! 10% atlaide");
    promoApplied = true;
  } else {
    alert("Nederīgs promo kods");
  }
}

// Checkout
function proceedToCheckout() {
  closeCart();
  document.getElementById('checkout-modal').style.display = 'flex';
}

function closeCheckout() {
  document.getElementById('checkout-modal').style.display = 'none';
}

function formatCardNumber(input) {
  let value = input.value.replace(/\s+/g, '');
  value = value.replace(/(\d{4})/g, '$1 ').trim();
  input.value = value;
}

function processPayment() {
  const cardNumber = document.getElementById('card-number').value.trim();
  if (cardNumber.length < 16) {
    alert("Lūdzu, ievadiet pilnu kartes numuru");
    return;
  }

  closeCheckout();
  document.getElementById('success-screen').classList.remove('hidden');
}

function restartSite() {
  location.reload();
}

// Tumšais režīms (pagaidām tikai simulācija, jo jau ir tumšs)
document.getElementById('theme-toggle').addEventListener('click', () => {
  alert("Tumšais režīms jau ir aktivizēts šajā dizainā ✨");
});

// Inicializācija
window.onload = function() {
  renderAmountCards();
  renderDesignOptions();
  updatePreview();

  // Reāllaika priekšskatījuma atjaunošana
  const inputs = ['custom-amount', 'recipient-name', 'message'];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updatePreview);
  });
};
