let currentTabId = null;
let startTime = null;
let isWindowFocused = true;

function stopTimer() {
  if (currentTabId !== null && startTime && isWindowFocused) {
    const endTime = Date.now();
    const duration = endTime - startTime;

    chrome.tabs.get(currentTabId, tab => {
      if (tab && tab.url && tab.url.startsWith('http')) {
        sendData(tab.url, duration);
      }
    });
  }
  startTime = null;
}

chrome.tabs.onActivated.addListener(activeInfo => {
  stopTimer();
  currentTabId = activeInfo.tabId;
  startTime = Date.now();
});

chrome.windows.onFocusChanged.addListener(windowId => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    isWindowFocused = false;
    stopTimer();
  } else {
    isWindowFocused = true;
    startTime = Date.now();
  }
});

chrome.tabs.onRemoved.addListener(tabId => {
  if (tabId === currentTabId) {
    stopTimer();
    currentTabId = null;
  }
});

chrome.runtime.onSuspend.addListener(() => {
  stopTimer();  // Extension shutdown
});

function sendData(url, duration) {
  fetch('http://localhost:5000/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, duration })
  }).catch(err => console.error('Failed to send data:', err));
}
