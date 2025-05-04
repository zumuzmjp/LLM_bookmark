// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log('ChatGPT Bookmark Manager installed');
  
  // 初期化
  chrome.storage.local.get(['bookmarks', 'folders'], (result) => {
    if (!result.bookmarks) {
      chrome.storage.local.set({ bookmarks: [] });
    }
    if (!result.folders) {
      chrome.storage.local.set({ folders: ['default'] });
    }
  });
});
