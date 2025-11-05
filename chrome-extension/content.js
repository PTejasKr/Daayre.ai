// Content script for Daayre.ai Chrome Extension
(function() {
  'use strict';

  // Check if already injected
  if (window.daayreInjected) return;
  window.daayreInjected = true;

  // Create floating button
  function createFloatingButton() {
    const button = document.createElement('div');
    button.id = 'daayre-floating-btn';
    button.innerHTML = `
      <div class="daayre-btn-icon">⚖️</div>
      <div class="daayre-btn-text">Legal Help</div>
    `;
    
    button.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'openPopup' });
    });
    
    document.body.appendChild(button);
    
    // Make it draggable
    makeDraggable(button);
  }

  function makeDraggable(element) {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    element.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;

      if (e.target === element || element.contains(e.target)) {
        isDragging = true;
      }
    }

    function drag(e) {
      if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;

        element.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }
    }

    function dragEnd() {
      initialX = currentX;
      initialY = currentY;
      isDragging = false;
    }
  }

  // Detect legal content on page
  function detectLegalContent() {
    const legalKeywords = [
      'law', 'legal', 'court', 'judge', 'lawyer', 'attorney', 'case', 'lawsuit',
      'contract', 'agreement', 'rights', 'constitution', 'act', 'section',
      'bail', 'arrest', 'police', 'fir', 'complaint', 'divorce', 'property'
    ];

    const pageText = document.body.innerText.toLowerCase();
    const hasLegalContent = legalKeywords.some(keyword => pageText.includes(keyword));

    if (hasLegalContent) {
      showLegalContentNotification();
    }
  }

  function showLegalContentNotification() {
    // Only show if not already shown in this session
    if (sessionStorage.getItem('daayreNotificationShown')) return;
    
    const notification = document.createElement('div');
    notification.id = 'daayre-notification';
    notification.innerHTML = `
      <div class="daayre-notification-content">
        <div class="daayre-notification-icon">⚖️</div>
        <div class="daayre-notification-text">
          <strong>Legal content detected!</strong>
          <p>Need help understanding this? Ask Daayre.ai</p>
        </div>
        <button class="daayre-notification-btn" onclick="this.parentElement.parentElement.remove()">
          Ask AI
        </button>
        <button class="daayre-notification-close" onclick="this.parentElement.parentElement.remove()">
          ×
        </button>
      </div>
    `;

    document.body.appendChild(notification);
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 10000);

    sessionStorage.setItem('daayreNotificationShown', 'true');
  }

  // Initialize
  function init() {
    // Wait for page to load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        createFloatingButton();
        setTimeout(detectLegalContent, 2000); // Delay to let page content load
      });
    } else {
      createFloatingButton();
      setTimeout(detectLegalContent, 2000);
    }
  }

  init();
})();
