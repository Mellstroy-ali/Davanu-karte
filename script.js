// script.js
let cart = [];
let selectedDesign = 1;

function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById('theme-icon');

  if (body.classList.contains('light')) {
    body.classList.remove('light');
    body.classList.add('dark');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark');
    body.classList.add('light');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    localStorage.setItem('theme', 'light');
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  const icon = document.getElementById('theme-icon');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    icon.classList.add('fa-moon');
  } else {
    document.body.classList.add('light');
    icon.classList.add('fa-sun');
  }
}

// Суммы
const amounts = [10, 25, 50, 75, 100, 150, 200];

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

function updatePreview() {
  const amount = document.getElementById('custom-amount').value || 50;
  const name = document.getElementById('recipient-name').value || "Dārgais draugs";
  const message = document.getElementById('message').value || "Ar vislabākajiem novēlējumiem!";

  const preview = document.getElementById('preview-card');
  preview.innerHTML = `
    <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between; color: black;">
      <div>
        <p style="opacity: 0.8;">Dāvanu karte</p>
        <p style="font-size: 3.5rem; font-weight: 700; margin-top: 8px;">${amount}€</p>
      </div>
      <div>
        <p style="font-weight: 600; font-size: 1.3rem;">${name}</p>
        <p style="margin-top: 12px; font-size: 1rem;">${message}</p>
      </div>
      <div style="text-align: right; font-size: 0.85rem; opacity: 0.7;">davanukarte.lv</div>
    </div>
  `;
}

function addToCart() {
  const amount = parseFloat(document.getElementById('custom-amount').value);
  if (!amount || amount < 5) {
    alert("Minimālā summa ir 5€!");
    return;
  }

  cart.push({
    id: Date.now(),
    amount: amount,
    recipient: document.getElementById('recipient-name').value || "Dārgais draugs"
  });

  updateCartCount();
  alert(`${amount}€ dāvanu karte pievienota grozam!`);
}

function addCustomToCart() {
  addToCart();
}

function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.length;
}

function showCart() {
  document.getElementById('cart-modal').style.display = 'flex';
  // Здесь можно расширить позже
}

function closeCart() {
  document.getElementById('cart-modal').style.display = 'none';
}

function proceedToCheckout() {
  closeCart();
  document.getElementById('checkout-modal').style.display = 'flex';
}

function closeCheckout() {
  document.getElementById('checkout-modal').style.display = 'none';
}

function formatCardNumber(input) {
  let val = input.value.replace(/\s/g, '');
  val = val.replace(/(\d{4})/g, '$1 ').trim();
  input.value = val;
}

function processPayment() {
  closeCheckout();
  document.getElementById('success-screen').classList.remove('hidden');
}

function restartSite() {
  location.reload();
}

// Инициализация
window.onload = () => {
  loadTheme();
  renderAmountCards();
  renderDesignOptions();
  updatePreview();

  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  document.getElementById('cart-btn').addEventListener('click', showCart);

  ['custom-amount', 'recipient-name', 'message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updatePreview);
  });
};
