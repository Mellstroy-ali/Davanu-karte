// script.js
let cart = [];
let selectedDesign = 1;

// Krāsu gradienti dažādiem dizainiem
const designColors = {
  1: "linear-gradient(135deg, #f43f5e, #fb923c)",   // Sarkans-oranžs
  2: "linear-gradient(135deg, #6366f1, #a855f7)",   // Zils-violets
  3: "linear-gradient(135deg, #14b8a6, #22d3ee)",   // Tirkīza
  4: "linear-gradient(135deg, #eab308, #f97316)"    // Zeltaini oranžs
};

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
  const saved = localStorage.getItem('theme');
  const icon = document.getElementById('theme-icon');

  if (saved === 'dark') {
    document.body.classList.add('dark');
    icon.classList.add('fa-moon');
  } else {
    document.body.classList.add('light');
    icon.classList.add('fa-sun');
  }
}

function renderAmountCards() {
  const container = document.getElementById('amount-grid');
  container.innerHTML = '';

  [10, 25, 50, 75, 100, 150, 200].forEach(amount => {
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
    option.style.background = designColors[i];
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
  preview.style.background = designColors[selectedDesign];

  preview.innerHTML = `
    <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between; color: black;">
      <div>
        <p style="opacity: 0.85;">Dāvanu karte</p>
        <p style="font-size: 3.8rem; font-weight: 700; margin-top: 10px;">${amount}€</p>
      </div>
      <div>
        <p style="font-size: 1.35rem; font-weight: 600;">${name}</p>
        <p style="margin-top: 14px; line-height: 1.5;">${message}</p>
      </div>
      <div style="text-align: right; font-size: 0.9rem; opacity: 0.75;">davanukarte.lv</div>
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

function closeCart() { document.getElementById('cart-modal').style.display = 'none'; }
function closeCheckout() { document.getElementById('checkout-modal').style.display = 'none'; }

function proceedToCheckout() {
  closeCart();
  document.getElementById('checkout-modal').style.display = 'flex';
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

// Inicializācija
window.onload = () => {
  loadTheme();
  renderAmountCards();
  renderDesignOptions();
  updatePreview();

  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  document.getElementById('cart-btn').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'flex';
  });

  ['custom-amount', 'recipient-name', 'message'].forEach(id => {
    document.getElementById(id).addEventListener('input', updatePreview);
  });
};
