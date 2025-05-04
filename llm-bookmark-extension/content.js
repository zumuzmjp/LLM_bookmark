// content.js
let starButton;
let isPageBookmarked = false;
let currentUrl = window.location.href;
let isInitialized = false;
let retryCount = 0;
const MAX_RETRIES = 5;
const RETRY_DELAY = 1000;

// LLMサービスを検出
function detectLLMService() {
  const hostname = window.location.hostname;
  if (hostname.includes('chatgpt.com')) {
    return 'chatgpt';
  } else if (hostname.includes('claude.ai')) {
    return 'claude';
  } else if (hostname.includes('aistudio.google.com')) {
    return 'google_ai_studio';
  } else if (hostname.includes('gemini.google.com')) {
    return 'gemini';
  }
  return null;
}

// 会話ページかどうかをチェック
function isLLMConversationPage() {
  const service = detectLLMService();
  if (service === 'chatgpt') {
    return window.location.href.includes('chatgpt.com/c/');
  } else if (service === 'claude') {
    return window.location.pathname.startsWith('/chat/') || 
           window.location.href.includes('claude.ai/chat/');
  } else if (service === 'google_ai_studio') {
    return window.location.pathname.startsWith('/prompts/') || 
           window.location.href.includes('aistudio.google.com/prompts/');
  } else if (service === 'gemini') {
    return window.location.pathname.startsWith('/app/') || 
           window.location.href.includes('gemini.google.com/app/');
  }
  return false;
}

// URLから会話IDを抽出
function extractConversationId(url) {
  const service = detectLLMService();
  if (service === 'chatgpt') {
    const match = url.match(/chatgpt\.com\/c\/([a-f0-9-]+)/);
    return match ? match[1] : null;
  } else if (service === 'claude') {
    const match = url.match(/claude\.ai\/chat\/([a-f0-9-]+)/);
    return match ? match[1] : null;
  } else if (service === 'google_ai_studio') {
    const match = url.match(/aistudio\.google\.com\/prompts\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : null;
  } else if (service === 'gemini') {
    const match = url.match(/gemini\.google\.com\/app\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  }
  return null;
}

// タイトルを取得する関数
function getChatTitle() {
  const conversationId = extractConversationId(window.location.href);
  const service = detectLLMService();
  
  if (service === 'chatgpt') {
    // ChatGPT用のタイトル取得ロジック（既存のコード）
    const activeChat = document.querySelector('nav a[class*="bg-gray"]:has([data-testid="chat-title"])');
    if (activeChat) {
      const titleElement = activeChat.querySelector('[data-testid="chat-title"]');
      if (titleElement && titleElement.textContent.trim()) {
        return titleElement.textContent.trim();
      }
    }

    const currentUrl = window.location.href;
    const sidebarLinks = document.querySelectorAll('nav a[href*="/c/"]');
    for (const link of sidebarLinks) {
      if (link.href === currentUrl) {
        const titleElement = link.querySelector('[data-testid="chat-title"]');
        if (titleElement && titleElement.textContent.trim()) {
          return titleElement.textContent.trim();
        }
      }
    }

    const pageTitle = document.title;
    if (pageTitle && pageTitle.includes(' - ChatGPT')) {
      const title = pageTitle.split(' - ChatGPT')[0].trim();
      if (title && title !== 'New chat' && title !== 'ChatGPT') {
        return title;
      }
    }
  } else if (service === 'claude') {
    // Claude用のタイトル取得ロジック
    // まずはブラウザのタイトルから取得を試みる
    const pageTitle = document.title;
    if (pageTitle && pageTitle.includes('Claude')) {
      const title = pageTitle.split(' - Claude')[0].trim();
      if (title && title !== 'New chat' && title !== 'Claude') {
        return title;
      }
    }

    // サイドバーから取得を試みる
    const sidebar = document.querySelector('[data-testid="chat-history"]');
    if (sidebar) {
      const activeChat = sidebar.querySelector('[data-active="true"]');
      if (activeChat) {
        const titleElement = activeChat.querySelector('[class*="text-"]');
        if (titleElement && titleElement.textContent.trim()) {
          return titleElement.textContent.trim();
        }
      }
    }

    // メインコンテンツエリアから取得
    const mainContent = document.querySelector('main');
    if (mainContent) {
      const possibleSelectors = [
        'h1',
        'h2',
        '[role="heading"]',
        '.text-xl',
        '.font-semibold'
      ];

      for (const selector of possibleSelectors) {
        const elements = mainContent.querySelectorAll(selector);
        for (const element of elements) {
          const text = element.textContent.trim();
          if (text && text.length > 3 && text.length < 200 && 
              !text.includes('Claude') && !text.includes('New chat')) {
            return text;
          }
        }
      }
    }
  } else if (service === 'google_ai_studio') {
    // Google AI Studio用のタイトル取得ロジック
    // まずはブラウザのタイトルから取得を試みる
    const pageTitle = document.title;
    if (pageTitle && pageTitle.includes('Google AI Studio')) {
      const title = pageTitle.split(' - Google AI Studio')[0].trim();
      if (title && title !== 'Google AI Studio') {
        return title;
      }
    }

    // プロンプトタイトルを探す
    const possibleSelectors = [
      'h1',
      '[data-test-id="prompt-title"]',
      '.prompt-title',
      '[class*="title"]',
      '[class*="heading"]',
      '.text-2xl',
      '.text-xl',
      '.font-bold'
    ];

    for (const selector of possibleSelectors) {
      const elements = document.querySelectorAll(selector);
      for (const element of elements) {
        const text = element.textContent.trim();
        if (text && text.length > 3 && text.length < 200 && 
            !text.includes('Google AI Studio') && !text.includes('Gemini')) {
          return text;
        }
      }
    }
  } else if (service === 'gemini') {
    // Gemini用のタイトル取得ロジック
    // まずはブラウザのタイトルから取得を試みる
    const pageTitle = document.title;
    if (pageTitle && pageTitle.includes('Gemini')) {
      const title = pageTitle.split(' - Gemini')[0].trim();
      if (title && title !== 'Gemini') {
        return title;
      }
    }

    // 会話タイトルを探す
    const possibleSelectors = [
      'h1',
      'h2',
      '[data-test-id="conversation-title"]',
      '[data-conversation-title]',
      '.conversation-title',
      '[class*="title"]',
      '[class*="heading"]',
      '.text-2xl',
      '.text-xl',
      '.font-bold'
    ];

    for (const selector of possibleSelectors) {
      const elements = document.querySelectorAll(selector);
      for (const element of elements) {
        const text = element.textContent.trim();
        if (text && text.length > 3 && text.length < 200 && 
            !text.includes('Gemini') && !text.includes('Google')) {
          return text;
        }
      }
    }
  }

  // タイトルが見つからない場合
  const serviceName = {
    'chatgpt': 'Chat',
    'claude': 'Conversation',
    'google_ai_studio': 'Prompt',
    'gemini': 'Chat'
  };
  return `${serviceName[service] || 'Conversation'} ${conversationId ? conversationId.substring(0, 8) : 'Unknown'}`;
}

// スターボタンを作成
function createStarButton() {
  if (!isLLMConversationPage()) {
    return false;
  }

  // 既存のボタンを削除
  if (starButton && starButton.parentNode) {
    starButton.parentNode.removeChild(starButton);
  }

  starButton = document.createElement('button');
  starButton.className = 'llm-bookmark-star';
  starButton.setAttribute('data-bookmark-button', 'true'); // 識別用の属性を追加
  starButton.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  `;

  // ボタンをbodyに追加
  document.body.appendChild(starButton);

  // 現在のページがブックマークされているか確認
  checkIfBookmarked();

  // スターボタンクリックイベント
  starButton.addEventListener('click', toggleBookmark);

  return true; // 成功を示す
}

// ブックマークの状態を確認
async function checkIfBookmarked() {
  const conversationId = extractConversationId(window.location.href);
  if (!conversationId) return;

  try {
    const result = await chrome.storage.local.get(['bookmarks']);
    const bookmarks = result.bookmarks || [];
    
    isPageBookmarked = bookmarks.some(bookmark => bookmark.id === conversationId);
    updateStarButton();
  } catch (error) {
    console.error('Error checking bookmark status:', error);
  }
}

// スターボタンの見た目を更新
function updateStarButton() {
  if (!starButton || !document.body.contains(starButton)) {
    console.warn('Star button not found, attempting to recreate...');
    initialize();
    return;
  }
  
  if (isPageBookmarked) {
    starButton.classList.add('bookmarked');
    starButton.setAttribute('title', 'ブックマークを削除');
  } else {
    starButton.classList.remove('bookmarked');
    starButton.setAttribute('title', 'ブックマークに追加');
  }
}

// ブックマークのトグル
async function toggleBookmark() {
  // ボタンが存在しない場合は何もしない
  if (!starButton || !document.body.contains(starButton)) {
    console.error('Star button not found');
    return;
  }

  // ダブルクリック防止
  if (starButton.disabled) return;
  starButton.disabled = true;

  try {
    const conversationId = extractConversationId(window.location.href);
    const service = detectLLMService();
    if (!conversationId || !service) {
      console.error('Failed to extract conversation ID or detect service');
      starButton.disabled = false;
      return;
    }

    const result = await chrome.storage.local.get(['bookmarks']);
    let bookmarks = result.bookmarks || [];

    if (isPageBookmarked) {
      // ブックマーク削除
      bookmarks = bookmarks.filter(bookmark => bookmark.id !== conversationId);
      isPageBookmarked = false;
      await chrome.storage.local.set({ bookmarks });
      updateStarButton();
      
      // アニメーションフィードバック
      starButton.style.transform = 'scale(0.9)';
      setTimeout(() => {
        starButton.style.transform = '';
      }, 150);
    } else {
      // ブックマーク追加 - タイトル編集モーダルを表示
      await new Promise(resolve => setTimeout(resolve, 500));
      const autoTitle = getChatTitle();
      
      showTitleEditModal(autoTitle, async (finalTitle, selectedFolder) => {
        bookmarks.push({
          id: conversationId,
          url: window.location.href,
          title: finalTitle,
          created_at: new Date().toISOString(),
          folder: selectedFolder || 'default',
          service: service
        });
        isPageBookmarked = true;
        await chrome.storage.local.set({ bookmarks });
        updateStarButton();
        
        // アニメーションフィードバック
        starButton.style.transform = 'scale(1.1)';
        setTimeout(() => {
          starButton.style.transform = '';
        }, 150);
      });
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
  } finally {
    // 必ずボタンを再有効化
    setTimeout(() => {
      if (starButton) {
        starButton.disabled = false;
      }
    }, 300);
  }
}

// URLが変更された時の処理
let lastUrl = window.location.href;
const urlObserver = new MutationObserver(() => {
  if (window.location.href !== lastUrl) {
    lastUrl = window.location.href;
    isInitialized = false;
    retryCount = 0;
    // ページ遷移後、少し待ってからボタンを作成（タイトルが読み込まれるのを待つ）
    setTimeout(initialize, 1000);
  }
});

// 初期化関数
function initialize() {
  if (isLLMConversationPage()) {
    if (createStarButton()) {
      isInitialized = true;
      console.log('LLM Bookmark button initialized successfully');
    } else if (retryCount < MAX_RETRIES) {
      retryCount++;
      console.log(`Retrying button creation (${retryCount}/${MAX_RETRIES})`);
      setTimeout(initialize, RETRY_DELAY);
    }
  }
}

// より堅牢な初期化処理
function initializeExtension() {
  // URLの監視を開始
  urlObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

  // タイトル監視も開始
  setTimeout(observeTitleChanges, 2000);

  // 初期化を実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initialize, 1000);
    });
  } else {
    setTimeout(initialize, 1000);
  }

  // 追加の安全策：定期的にボタンの存在を確認
  setInterval(() => {
    if (isLLMConversationPage() && (!starButton || !document.body.contains(starButton))) {
      console.log('Button missing, recreating...');
      initialize();
    }
  }, 5000);
}

// ページの初期化
initializeExtension();

// タイトルの変更を監視（ChatGPTがタイトルを後から更新する場合があるため）
const titleObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' || mutation.type === 'characterData') {
      // タイトルが変更された可能性がある場合、ブックマークを更新
      updateBookmarkTitle();
    }
  });
});

// タイトル要素の監視開始
function observeTitleChanges() {
  // ブラウザのタイトルタグを監視
  const titleElement = document.querySelector('title');
  if (titleElement) {
    titleObserver.observe(titleElement, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  // サイドバーのタイトル要素を監視
  const sidebar = document.querySelector('nav');
  if (sidebar) {
    titleObserver.observe(sidebar, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }
}

// ブックマークのタイトルを更新する関数
async function updateBookmarkTitle() {
  if (!isPageBookmarked) return;

  const chatId = extractChatId(window.location.href);
  if (!chatId) return;

  try {
    const result = await chrome.storage.local.get(['bookmarks']);
    const bookmarks = result.bookmarks || [];
    
    const bookmark = bookmarks.find(b => b.id === chatId);
    if (bookmark) {
      const newTitle = getChatTitle();
      if (newTitle !== bookmark.title && !newTitle.startsWith('Chat ')) {
        bookmark.title = newTitle;
        await chrome.storage.local.set({ bookmarks });
      }
    }
  } catch (error) {
    console.error('Error updating bookmark title:', error);
  }
}

// タイトル監視を開始
setTimeout(observeTitleChanges, 2000);

// タイトル編集モーダルを表示
async function showTitleEditModal(initialTitle, onSave) {
  // フォルダ情報を取得
  const result = await chrome.storage.local.get(['folders']);
  const folders = result.folders || ['default'];
  
  // モーダルのオーバーレイを作成
  const modal = document.createElement('div');
  modal.className = 'llm-bookmark-modal';
  
  // ダークモード対応のためテーマを検出
  const isDarkMode = document.documentElement.classList.contains('dark') ||
                     document.body.style.backgroundColor === 'rgb(52, 53, 65)' ||
                     window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  modal.innerHTML = `
    <div class="modal-content ${isDarkMode ? 'dark' : ''}">
      <h3 class="modal-title">ブックマークを追加</h3>
      <p class="modal-description">タイトルとフォルダを設定できます</p>
      <input type="text" class="modal-input" value="${initialTitle}" id="bookmarkTitle" placeholder="タイトル" />
      <div class="folder-selection">
        <select class="modal-select" id="folderSelect">
          ${folders.map(folder => `
            <option value="${folder}" ${folder === 'default' ? 'selected' : ''}>
              ${folder === 'default' ? 'すべて' : folder}
            </option>
          `).join('')}
        </select>
        <button class="create-folder-btn-inline">＋ 新規フォルダ</button>
      </div>
      <div class="modal-actions">
        <button class="modal-btn modal-cancel">キャンセル</button>
        <button class="modal-btn modal-confirm">保存</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // 入力フィールドにフォーカスして全選択
  const input = modal.querySelector('#bookmarkTitle');
  const folderSelect = modal.querySelector('#folderSelect');
  const createFolderBtn = modal.querySelector('.create-folder-btn-inline');
  input.focus();
  input.select();
  
  // 新規フォルダ作成ボタンの処理
  createFolderBtn.addEventListener('click', async () => {
    const folderName = prompt('新しいフォルダ名を入力してください：');
    if (folderName && folderName.trim() && !folders.includes(folderName.trim())) {
      const newFolder = folderName.trim();
      folders.push(newFolder);
      await chrome.storage.local.set({ folders });
      
      // ドロップダウンを更新
      const newOption = document.createElement('option');
      newOption.value = newFolder;
      newOption.textContent = newFolder;
      newOption.selected = true;
      folderSelect.appendChild(newOption);
    }
  });
  
  // キャンセルボタンの処理
  const cancelBtn = modal.querySelector('.modal-cancel');
  cancelBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  // 保存ボタンの処理
  const confirmBtn = modal.querySelector('.modal-confirm');
  const handleSave = () => {
    const finalTitle = input.value.trim() || initialTitle;
    const selectedFolder = folderSelect.value;
    document.body.removeChild(modal);
    onSave(finalTitle, selectedFolder);
  };
  
  confirmBtn.addEventListener('click', handleSave);
  
  // Enterキーで保存
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  });
  
  // Escキーでキャンセル
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.body.removeChild(modal);
    }
  });
}