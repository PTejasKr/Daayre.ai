// Theme management
let isDark = localStorage.getItem('theme') === 'dark';

function updateTheme() {
  document.body.classList.toggle('dark', isDark);
  document.getElementById('themeToggle').querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize theme
updateTheme();

// Event listeners
document.getElementById('themeToggle').addEventListener('click', () => {
  isDark = !isDark;
  updateTheme();
});

document.getElementById('openFullApp').addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://your-app-url.com' }); // Replace with your actual app URL
});

document.getElementById('findLawyers').addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://your-app-url.com?tab=lawyers' }); // Replace with your actual app URL
});

// Chat functionality
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendMessage');

// Mock API call - replace with actual API
async function sendMessageToAPI(message) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock legal response
  const responses = [
    "Based on Indian law, you have several rights in this situation. However, I recommend consulting a qualified lawyer for specific advice.",
    "According to the relevant sections of Indian law, this matter falls under civil/criminal jurisdiction. Please consult a local advocate for detailed guidance.",
    "This is a common legal query. Under Indian law, there are specific procedures to follow. I suggest speaking with a lawyer who specializes in this area.",
    "Your rights are protected under various acts in Indian law. For personalized legal advice, please consult with a qualified legal professional."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

function addMessage(content, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isUser ? 'user' : 'assistant'}`;
  
  messageDiv.innerHTML = `
    <div class="message-avatar">
      <span>${isUser ? '👤' : '🤖'}</span>
    </div>
    <div class="message-content">
      <p>${content}</p>
    </div>
  `;
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addLoadingMessage() {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message assistant loading-message';
  messageDiv.innerHTML = `
    <div class="message-avatar">
      <span>🤖</span>
    </div>
    <div class="message-content">
      <div class="loading">
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
      </div>
    </div>
  `;
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  return messageDiv;
}

async function handleSendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;
  
  // Add user message
  addMessage(message, true);
  messageInput.value = '';
  
  // Show loading
  const loadingMessage = addLoadingMessage();
  sendButton.disabled = true;
  
  try {
    // Send to API
    const response = await sendMessageToAPI(message);
    
    // Remove loading message
    loadingMessage.remove();
    
    // Add AI response
    addMessage(response);
  } catch (error) {
    loadingMessage.remove();
    addMessage("I'm sorry, I'm having trouble connecting right now. Please try again or use the full app.", false);
  } finally {
    sendButton.disabled = false;
  }
}

// Send message events
sendButton.addEventListener('click', handleSendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSendMessage();
  }
});

// Suggestion buttons
document.querySelectorAll('.suggestion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const question = btn.getAttribute('data-question');
    messageInput.value = question;
    handleSendMessage();
  });
});

// Character limit indicator
messageInput.addEventListener('input', () => {
  const length = messageInput.value.length;
  const maxLength = messageInput.getAttribute('maxlength');
  
  if (length > maxLength * 0.8) {
    messageInput.style.borderColor = length >= maxLength ? '#ef4444' : '#f59e0b';
  } else {
    messageInput.style.borderColor = '';
  }
});
