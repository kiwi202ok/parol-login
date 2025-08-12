// ========== Qattiq belgilangan admin login (o'zgartirish uchun script.js da tahrir qil) ==========
const ADMIN_USER = 'kiwi0778';
const ADMIN_PASS = '999723331';

// ====== Bu yerga o'zingning akkauntlaringni qo'shishing mumkin ======
// format: accountsData = { pubg: { "kiwi_pubg": "parol1", "muzaffarovich31_": "parol2" }, instagram: {...}, facebook: {...} }
let accountsData = {
  pubg: {
    "pochta": "maqsudjon3331@gmail.com kiwi0778",
    "nomer": "999723331 kiwi2002"
  },
  instagram: {
    "muzaffarovich31_": "kiw0778",
    "muzaffarovich010_": "kiwi0778",
    "kiwi_pubg": "kiwi2002"

  },
  facebook: {
    "myfb_1": "fbpass123"
  }
};
// ===================================================================

/* Elementlar */
const loginScreen = document.getElementById('login-screen');
const mainScreen = document.getElementById('main-screen');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');
const accountsList = document.getElementById('accounts-list');
const credsDiv = document.getElementById('creds');
const credsLogin = document.getElementById('creds-login');
const credsPass = document.getElementById('creds-pass');
const logoutBtn = document.getElementById('logout-btn');

let currentApp = null;

/* Login funktsiyasi */
loginBtn.addEventListener('click', tryLogin);
passwordInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') tryLogin(); });

function tryLogin() {
  const u = usernameInput.value.trim();
  const p = passwordInput.value;

  if (u === ADMIN_USER && p === ADMIN_PASS) {
    // muvaffaqiyatli
    loginError.textContent = '';
    showMainScreen();
  } else {
    loginError.textContent = 'Login yoki parol notoʻgʻri.';
  }
}

/* Ko'rsatish - main screen */
function showMainScreen() {
  loginScreen.classList.add('hidden');
  mainScreen.classList.remove('hidden');
  // default holatda hech narsa tanlanmagan
  accountsList.innerHTML = '<li>Ilk bo‘lib PUBG, Instagram yoki Facebook tugmasini bosing.</li>';
  credsDiv.classList.add('hidden');
}

/* App tugmalarga listener qo'shamiz */
document.querySelectorAll('.app-btn').forEach(b => {
  b.addEventListener('click', () => {
    currentApp = b.dataset.app;
    renderAccountsFor(currentApp);
  });
});

/* Hisoblarni ko'rsatish */
function renderAccountsFor(app) {
  accountsList.innerHTML = '';
  credsDiv.classList.add('hidden');

  const appAccounts = accountsData[app] || {};
  const keys = Object.keys(appAccounts);

  // Sarlavha yangilash
  const title = document.getElementById('accounts-title');
  title.textContent = (app ? app.toUpperCase() : 'Hisoblar');

  if (keys.length === 0) {
    accountsList.innerHTML = '<li>Hech qanday akkaunt qoʻshilmagan.</li>';
    return;
  }

  keys.forEach(k => {
    const li = document.createElement('li');
    li.textContent = k;
    li.addEventListener('click', () => {
      showCreds(app, k);
    });
    accountsList.appendChild(li);
  });
}

/* Tanlangan akkauntni ko'rsatish */
function showCreds(app, key) {
  const value = (accountsData[app] && accountsData[app][key]) ? accountsData[app][key] : '';
  credsLogin.textContent = 'Login: ' + key;
  credsPass.textContent = 'Parol: ' + value;
  credsDiv.classList.remove('hidden');
}

/* Chiqish */
logoutBtn.addEventListener('click', () => {
  // formani tozalash va qayta login sahifasiga
  usernameInput.value = '';
  passwordInput.value = '';
  loginError.textContent = '';
  mainScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');
  currentApp = null;
  accountsList.innerHTML = '';
  credsDiv.classList.add('hidden');
});
