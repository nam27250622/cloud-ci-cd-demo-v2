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
  const icon = document.getElementById('themeToggle').querySelector('i');
  
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
}

// Pipeline Animation
function triggerPipeline() {
  const steps = document.querySelectorAll('.pipeline-step');
  const terminal = document.getElementById('terminal');
  
  steps.forEach(step => step.classList.remove('active'));
  
  let i = 0;
  const interval = setInterval(() => {
    if (i > 0) steps[i-1].classList.remove('active');
    
    if (i < steps.length) {
      steps[i].classList.add('active');
    }
    
    i++;
    if (i > steps.length) {
      clearInterval(interval);
      showSuccessNotification();
    }
  }, 700);

  // Terminal simulation
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
  notif.className = "fixed bottom-10 right-10 bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-pulse";
  notif.innerHTML = `🎉 Deploy thành công! <i class="fas fa-check-circle"></i>`;
  document.body.appendChild(notif);
  
  setTimeout(() => notif.remove(), 4500);
}

// Calculator
function calculate() {
  const input = document.getElementById('calcInput');
  const result = document.getElementById('calcResult');
  
  try {
    const res = eval(input.value);
    result.textContent = res;
    result.style.color = '#67e8f9';
  } catch (e) {
    result.textContent = "Lỗi biểu thức!";
    result.style.color = '#f87171';
  }
}

// Notes App
let notes = JSON.parse(localStorage.getItem('notes')) || [];

function saveNote() {
  const input = document.getElementById('noteInput');
  if (input.value.trim() === '') return;
  
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
  container.innerHTML = '';
  
  notes.forEach((note, index) => {
    const div = document.createElement('div');
    div.className = "bg-gray-800 p-4 rounded-2xl flex justify-between items-center";
    div.innerHTML = `
      <div>
        <small class="text-gray-400">${note.time}</small>
        <p class="mt-1">${note.content}</p>
      </div>
      <button onclick="deleteNote(${index})" class="text-red-400 hover:text-red-500">
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

// Rock Paper Scissors Game
const choices = ['rock', 'paper', 'scissors'];
const emojis = { rock: '👊', paper: '✋', scissors: '✌️' };

function playGame(playerChoice) {
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  const resultDiv = document.getElementById('gameResult');
  const message = document.getElementById('gameMessage');
  
  resultDiv.innerHTML = `
    ${emojis[playerChoice]} 
    <span class="text-4xl mx-6">VS</span> 
    ${emojis[computerChoice]}
  `;
  
  if (playerChoice === computerChoice) {
    message.textContent = "Hòa nhau! 🤝";
    message.style.color = '#fbbf24';
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    message.textContent = "Bạn thắng! 🎉";
    message.style.color = '#4ade80';
  } else {
    message.textContent = "Máy thắng! 🤖";
    message.style.color = '#f87171';
  }
}

// Last Deploy Time
function updateLastDeploy() {
  const el = document.getElementById('lastDeploy');
  if (el) {
    const now = new Date();
    el.textContent = now.toLocaleString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit', 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }
}

// Initialize everything
window.onload = function() {
  loadTheme();
  updateLastDeploy();
  setInterval(updateLastDeploy, 60000);
  
  // Render saved notes
  if (document.getElementById('notesList')) {
    renderNotes();
  }
};