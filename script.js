// script.js

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

// Load saved theme
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  const icon = document.getElementById('themeToggle') ? document.getElementById('themeToggle').querySelector('i') : null;
  
  if (savedTheme === 'light' && icon) {
    document.body.classList.add('light-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
}

// Pipeline Animation - ĐÃ SỬA
function triggerPipeline() {
  const steps = document.querySelectorAll('.pipeline-step');
  const terminal = document.getElementById('terminal');
  
  // Reset tất cả
  steps.forEach(step => step.classList.remove('active'));
  
  let i = 0;
  const interval = setInterval(() => {
    if (i > 0) {
      steps[i-1].classList.remove('active');
    }
    
    if (i < steps.length) {
      steps[i].classList.add('active');
    }
    
    i++;
    if (i >= steps.length) {
      clearInterval(interval);
      // Giữ ô cuối cùng sáng
      setTimeout(() => {
        showSuccessNotification();
      }, 600);
    }
  }, 750);

  // Terminal
  if (terminal) {
    terminal.innerHTML = `
      <p class="text-green-400">$ git push origin main</p>
      <p class="text-yellow-400 mt-2">→ Đang kích hoạt GitHub Actions...</p>
      <p class="text-cyan-400 mt-4">✓ Build thành công</p>
      <p class="text-cyan-400">✓ Đang deploy lên GitHub Pages</p>
      <p class="text-green-400 mt-4">✓ Triển khai hoàn tất!</p>
    `;
  }
}

function showSuccessNotification() {
  const notif = document.createElement('div');
  notif.className = "fixed bottom-10 right-10 bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50";
  notif.innerHTML = `🎉 Deploy thành công! <i class="fas fa-check-circle"></i>`;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 4500);
}

// Các hàm còn lại giữ nguyên
function calculate() {
  const input = document.getElementById('calcInput');
  const result = document.getElementById('calcResult');
  try {
    const res = eval(input.value);
    result.textContent = res !== undefined ? res : "0";
  } catch (e) {
    result.textContent = "Lỗi biểu thức!";
    result.style.color = '#f87171';
  }
}

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function saveNote() {
  const input = document.getElementById('noteInput');
  if (!input.value.trim()) return;
  
  notes.unshift({
    id: Date.now(),
    content: input.value.trim(),
    time: new Date().toLocaleTimeString('vi-VN')
  });
  
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
  input.value = '';
}

function renderNotes() {
  const container = document.getElementById('notesList');
  if (!container) return;
  container.innerHTML = '';
  notes.forEach((note, index) => {
    const div = document.createElement('div');
    div.className = "bg-gray-800 p-4 rounded-2xl flex justify-between items-start";
    div.innerHTML = `
      <div class="flex-1">
        <small class="text-gray-400">${note.time}</small>
        <p class="mt-1">${note.content}</p>
      </div>
      <button onclick="deleteNote(${index})" class="text-red-400 hover:text-red-500 ml-4">
        <i class="fas fa-trash"></i>
      </button>
    `;
    container.appendChild(div);
  });
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
}

// Game Oẳn Tù Tì
const choices = ['rock', 'paper', 'scissors'];
const emojis = { rock: '👊', paper: '✋', scissors: '✌️' };

function playGame(playerChoice) {
  const computer = choices[Math.floor(Math.random() * 3)];
  const resultDiv = document.getElementById('gameResult');
  const message = document.getElementById('gameMessage');
  
  resultDiv.innerHTML = `${emojis[playerChoice]} <span class="text-4xl mx-8">VS</span> ${emojis[computer]}`;
  
  if (playerChoice === computer) {
    message.textContent = "Hòa nhau! 🤝";
    message.style.color = '#fbbf24';
  } else if (
    (playerChoice === 'rock' && computer === 'scissors') ||
    (playerChoice === 'paper' && computer === 'rock') ||
    (playerChoice === 'scissors' && computer === 'paper')
  ) {
    message.textContent = "Bạn thắng! 🎉";
    message.style.color = '#4ade80';
  } else {
    message.textContent = "Máy thắng!";
    message.style.color = '#f87171';
  }
}

// Last Deploy
function updateLastDeploy() {
  const el = document.getElementById('lastDeploy');
  if (el) el.textContent = new Date().toLocaleString('vi-VN');
}

// Khởi tạo
window.onload = function() {
  loadTheme();
  updateLastDeploy();
  setInterval(updateLastDeploy, 60000);
  
  if (document.getElementById('notesList')) renderNotes();
};