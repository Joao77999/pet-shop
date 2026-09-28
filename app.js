// ===== PWA: registro do Service Worker =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('SW registrado ✔'))
      .catch(err => console.error('Falha no SW:', err));
  });
}

// ===== Menu mobile =====
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => menu.classList.toggle('aberto'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('aberto')));

// ===== Botão "Instalar app" (beforeinstallprompt) =====
let promptInstalar = null;
const installBtn = document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  promptInstalar = e;
  installBtn.hidden = false;
});
installBtn.addEventListener('click', async () => {
  if (!promptInstalar) return;
  promptInstalar.prompt();
  await promptInstalar.userChoice;
  promptInstalar = null;
  installBtn.hidden = true;
});

// ===== Status offline/online =====
const statusEl = document.getElementById('offlineStatus');
function atualizaStatus() {
  statusEl.textContent = navigator.onLine
    ? '🟢 Você está online'
    : '🔴 Modo offline — o app continua funcionando!';
}
window.addEventListener('online', atualizaStatus);
window.addEventListener('offline', atualizaStatus);
atualizaStatus();

// ===== Carrinho simples =====
let cart = 0;
const cartCount = document.getElementById('cartCount');
document.querySelectorAll('[data-add]').forEach(btn => {
  btn.addEventListener('click', () => {
    cart++;
    cartCount.textContent = cart;
    btn.textContent = '✔ Adicionado';
    setTimeout(() => btn.textContent = 'Adicionar', 1200);
  });
});

// ===== Formulário de agendamento =====
document.getElementById('formAgenda').addEventListener('submit', (e) => {
  e.preventDefault();
  const dados = Object.fromEntries(new FormData(e.target));
  document.getElementById('msgAgenda').textContent =
    `✅ Agendado! ${dados.pet} está marcado para ${dados.servico} em ${new Date(dados.data + 'T00:00').toLocaleDateString('pt-BR')}.`;
  e.target.reset();
});
