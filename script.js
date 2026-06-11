// Theme Toggle
function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById('themeToggle').querySelector('i');
  
  body.classList.toggle('light-mode');
  
  if (body.classList.contains('light-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    localStorage.setItem('theme', 'light');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    localStorage.setItem('theme', 'dark');
  }
}

function loadTheme() {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    const icon = document.getElementById('themeToggle').querySelector('i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
}

// Pipeline
function triggerPipeline() {
  const steps = document.querySelectorAll('.pipeline-step');
  
  steps.forEach(s => s.classList.remove('active'));
  
  let i = 0;
  const interval = setInterval(() => {
    if (i > 0) steps[i-1].classList.remove('active');
    if (i < steps.length) steps[i].classList.add('active');
    
    i++;
    if (i >= steps.length) {
      clearInterval(interval);
      setTimeout(showSuccessNotification, 400);
    }
  }, 800);
}

function showSuccessNotification() {
  const notif = document.createElement('div');
  notif.className = "fixed bottom-10 right-10 bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3";
  notif.innerHTML = `🎉 Deploy thành công! <i class="fas fa-check-circle"></i>`;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 4000);
}

// Khởi tạo
window.onload = () => {
  loadTheme();
  // Các hàm khác (calculator, notes, game...) nếu bạn có
};