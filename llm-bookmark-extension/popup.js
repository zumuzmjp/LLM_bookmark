// popup.js
let currentFolder = 'default';
let folders = ['default'];
let bookmarks = [];

// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  
  // フォルダ作成ボタン
  document.getElementById('createFolder').addEventListener('click', showCreateFolderModal);
});

// データの読み込み
async function loadData() {
  const result = await chrome.storage.local.get(['bookmarks', 'folders']);
  bookmarks = result.bookmarks || [];
  folders = result.folders || ['default'];
  
  renderFolders();
  renderBookmarks();
}

// フォルダ一覧の表示
function renderFolders() {
  const folderList = document.getElementById('folderList');
  folderList.innerHTML = '';
  
  // デフォルトフォルダ
  const defaultFolder = createFolderElement('default', 'すべて');
  if (currentFolder === 'default') {
    defaultFolder.classList.add('active');
  }
  folderList.appendChild(defaultFolder);
  
  // ユーザー作成フォルダ
  folders.filter(folder => folder !== 'default').forEach(folder => {
    const folderElement = createFolderElement(folder, folder);
    if (currentFolder === folder) {
      folderElement.classList.add('active');
    }
    folderList.appendChild(folderElement);
  });
}

// フォルダ要素の作成
function createFolderElement(folderId, folderName) {
  const div = document.createElement('div');
  div.className = 'folder-item';
  div.dataset.folder = folderId;
  div.innerHTML = `
    <svg class="folder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 7v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6.93a2 2 0 0 1-1.66-.9l-.74-1.1a2 2 0 0 0-1.66-.9H5a2 2 0 0 0-2 2v1z"/>
    </svg>
    ${folderName}
  `;
  
  div.addEventListener('click', () => {
    currentFolder = folderId;
    renderFolders();
    renderBookmarks();
  });
  
  return div;
}

// ブックマーク一覧の表示
function renderBookmarks() {
  const bookmarkList = document.getElementById('bookmarkList');
  bookmarkList.innerHTML = '';
  
  const filteredBookmarks = currentFolder === 'default' 
    ? bookmarks 
    : bookmarks.filter(bookmark => bookmark.folder === currentFolder);
  
  if (filteredBookmarks.length === 0) {
    bookmarkList.innerHTML = '<div class="empty-state">ブックマークがありません</div>';
    return;
  }
  
  filteredBookmarks.forEach(bookmark => {
    const bookmarkElement = createBookmarkElement(bookmark);
    bookmarkList.appendChild(bookmarkElement);
  });
}

// ブックマーク要素の作成
function createBookmarkElement(bookmark) {
  const div = document.createElement('div');
  div.className = 'bookmark-item';
  
  const date = new Date(bookmark.created_at).toLocaleDateString('ja-JP');
  
  // サービスアイコンのSVGを取得
  const serviceIcon = getServiceIcon(bookmark.service);
  
  div.innerHTML = `
    <div class="bookmark-content">
      <div class="bookmark-title-row">
        <div class="service-icon" title="${bookmark.service === 'chatgpt' ? 'ChatGPT' : bookmark.service === 'claude' ? 'Claude' : bookmark.service === 'google_ai_studio' ? 'Google AI Studio' : 'Gemini'}">
          ${serviceIcon}
        </div>
        <a href="${bookmark.url}" class="bookmark-title" target="_blank">${bookmark.title}</a>
      </div>
      <div class="bookmark-date">${date}</div>
    </div>
    <div class="bookmark-actions">
      <button class="action-btn edit-btn" data-id="${bookmark.id}">編集</button>
      <button class="action-btn move-btn" data-id="${bookmark.id}">移動</button>
      <button class="action-btn delete-btn" data-id="${bookmark.id}">削除</button>
    </div>
  `;
  
  // 編集ボタン
  div.querySelector('.edit-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    showEditTitleModal(bookmark.id);
  });
  
  // 移動ボタン
  div.querySelector('.move-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    showMoveFolderModal(bookmark.id);
  });
  
  // 削除ボタン
  div.querySelector('.delete-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    deleteBookmark(bookmark.id);
  });
  
  return div;
}

// サービスアイコンを取得
function getServiceIcon(service) {
  if (service === 'chatgpt') {
    return `
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
      </svg>
    `;
  } else if (service === 'claude') {
    return `
      <img src="images/claude.png" alt="Claude" width="16" height="16" />
    `;
  } else if (service === 'google_ai_studio') {
    return `
      <img src="images/google_ai_studio.png" alt="Google AI Studio" width="16" height="16" />
    `;
  } else if (service === 'gemini') {
    return `
      <img src="images/gemini.png" alt="Gemini" width="16" height="16" />
    `;
  }
  return '';
}

// ブックマークの削除
async function deleteBookmark(bookmarkId) {
  bookmarks = bookmarks.filter(bookmark => bookmark.id !== bookmarkId);
  await chrome.storage.local.set({ bookmarks });
  renderBookmarks();
}

// フォルダ作成モーダルの表示
function showCreateFolderModal() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <h3 class="modal-title">新規フォルダ作成</h3>
      <input type="text" class="modal-input" id="folderName" placeholder="フォルダ名">
      <div class="modal-actions">
        <button class="modal-btn modal-cancel">キャンセル</button>
        <button class="modal-btn modal-confirm">作成</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  const input = modal.querySelector('#folderName');
  input.focus();
  
  // キャンセルボタン
  modal.querySelector('.modal-cancel').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  // 作成ボタン
  modal.querySelector('.modal-confirm').addEventListener('click', async () => {
    const folderName = input.value.trim();
    if (folderName && !folders.includes(folderName)) {
      folders.push(folderName);
      await chrome.storage.local.set({ folders });
      renderFolders();
    }
    document.body.removeChild(modal);
  });
  
  // エンターキーで作成
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      modal.querySelector('.modal-confirm').click();
    }
  });
}

// フォルダ移動モーダルの表示
function showMoveFolderModal(bookmarkId) {
  const bookmark = bookmarks.find(b => b.id === bookmarkId);
  if (!bookmark) return;
  
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <h3 class="modal-title">フォルダを選択</h3>
      <select class="modal-input" id="folderSelect">
        ${folders.map(folder => `
          <option value="${folder}" ${bookmark.folder === folder ? 'selected' : ''}>
            ${folder === 'default' ? 'すべて' : folder}
          </option>
        `).join('')}
      </select>
      <div class="modal-actions">
        <button class="modal-btn modal-cancel">キャンセル</button>
        <button class="modal-btn modal-confirm">移動</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // キャンセルボタン
  modal.querySelector('.modal-cancel').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  // 移動ボタン
  modal.querySelector('.modal-confirm').addEventListener('click', async () => {
    const selectedFolder = modal.querySelector('#folderSelect').value;
    bookmark.folder = selectedFolder;
    await chrome.storage.local.set({ bookmarks });
    renderBookmarks();
    document.body.removeChild(modal);
  });
}

// タイトル編集モーダルの表示
function showEditTitleModal(bookmarkId) {
  const bookmark = bookmarks.find(b => b.id === bookmarkId);
  if (!bookmark) return;
  
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <h3 class="modal-title">タイトルを編集</h3>
      <input type="text" class="modal-input" id="editTitle" value="${bookmark.title}">
      <div class="modal-actions">
        <button class="modal-btn modal-cancel">キャンセル</button>
        <button class="modal-btn modal-confirm">保存</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  const input = modal.querySelector('#editTitle');
  input.focus();
  input.select();
  
  // キャンセルボタン
  modal.querySelector('.modal-cancel').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  // 保存ボタン
  modal.querySelector('.modal-confirm').addEventListener('click', async () => {
    const newTitle = input.value.trim();
    if (newTitle && newTitle !== bookmark.title) {
      bookmark.title = newTitle;
      await chrome.storage.local.set({ bookmarks });
      renderBookmarks();
    }
    document.body.removeChild(modal);
  });
  
  // エンターキーで保存
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      modal.querySelector('.modal-confirm').click();
    }
  });
}