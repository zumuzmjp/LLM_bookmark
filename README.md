# LLM_bookmark
chrome extension of LLM boomarks 

# LLM Bookmark Manager

[English](#english) | [日本語](#japanese)

<a name="english"></a>
# LLM Bookmark Manager

A Chrome extension that allows you to bookmark and organize conversations from various LLM services with folder management.

## Features

- ✨ One-click bookmarking for ChatGPT, Claude, Google AI Studio, and Gemini conversations
- 📁 Folder organization system
- ✏️ Editable bookmark titles
- 🌙 Dark mode support
- 🔍 Service-specific icons

## Supported Services

- ChatGPT (chatgpt.com)
- Claude (claude.ai)
- Google AI Studio (aistudio.google.com)
- Gemini (gemini.google.com)

## Installation

### From Chrome Web Store (Recommended)
1. Visit [Chrome Web Store](link)
2. Click "Add to Chrome"

### Developer Mode Installation
1. Clone this repository
   ```bash
   git clone https://github.com/your-username/llm-bookmark-manager.git
   ```
2. Open `chrome://extensions/` in Chrome
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the cloned folder

## Usage

### Adding Bookmarks
1. Open a conversation page on any supported LLM service
2. Click the star icon in the top right
3. Set title and folder (optional)
4. Click "Save"

### Managing Bookmarks
1. Click the extension icon
2. View bookmarks organized by folders
3. For each bookmark, you can:
   - Edit title
   - Move to different folder
   - Delete

### Creating Folders
1. Click "+ Create Folder" in the extension popup
2. Enter folder name
3. Click "Create"

## Features in Detail

### Automatic Title Detection
Automatically extracts conversation titles from each LLM service when bookmarking.

### Dark Mode Support
Automatically switches between light/dark modes based on your browser theme settings.

### Persistence
Bookmarks and folder information are stored locally using Chrome Storage API.

## Technical Specifications

- Manifest V3
- Chrome Storage API
- Content Scripts
- Asynchronous processing

## Privacy

- All data stored locally
- No external server communication
- Minimal permission requirements

## Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Author

[Your Name]

## Acknowledgments

- Icon design: [Resource Name]
- Inspiration: [Project Name]

---

<a name="japanese"></a>
# LLM Bookmark Manager 日本語版

複数のLLMサービスの会話をフォルダで整理・管理できるChrome拡張機能です。

## 特徴

- ✨ ChatGPT、Claude、Google AI Studio、Geminiの会話をワンクリックでブックマーク
- 📁 フォルダによる整理機能
- ✏️ ブックマークタイトルの編集
- 🌙 ダークモード対応
- 🔍 各サービスのアイコン表示

## 対応サービス

- ChatGPT (chatgpt.com)
- Claude (claude.ai)
- Google AI Studio (aistudio.google.com)
- Gemini (gemini.google.com)

## インストール方法

### Chrome Web Store から（推奨）
1. [Chrome Web Store](リンク) にアクセス
2. 「Chrome に追加」をクリック

### 開発者モードでインストール
1. このリポジトリをクローン
   ```bash
   git clone https://github.com/your-username/llm-bookmark-manager.git
   ```
2. Chrome で `chrome://extensions/` を開く
3. 右上の「デベロッパーモード」をON
4. 「パッケージ化されていない拡張機能を読み込む」をクリック
5. クローンしたフォルダを選択

## 使い方

### ブックマークの追加
1. 対応LLMサービスで会話ページを開く
2. 右上に表示される星アイコンをクリック
3. タイトルとフォルダを設定（任意）
4. 「保存」をクリック

### ブックマークの管理
1. 拡張機能アイコンをクリック
2. フォルダで整理されたブックマーク一覧が表示
3. 各ブックマークで以下の操作が可能：
   - タイトル編集
   - フォルダ移動
   - 削除

### フォルダの作成
1. 拡張機能ポップアップで「+ フォルダ作成」をクリック
2. フォルダ名を入力
3. 「作成」をクリック

## 機能詳細

### 自動タイトル取得
各LLMサービスから会話タイトルを自動取得し、ブックマーク時に表示します。

### ダークモード対応
ブラウザのテーマ設定に合わせて、自動でライト/ダークモードを切り替えます。

### 永続化
ブックマークとフォルダ情報はChrome Storage APIを使用してローカルに保存されます。

## 技術仕様

- Manifest V3
- Chrome Storage API
- Content Scripts
- 非同期処理

## プライバシー

- データはすべてローカルに保存
- 外部サーバーへの通信なし
- 最小限の権限要求

## 貢献方法

1. このリポジトリをFork
2. 新しいブランチを作成（`git checkout -b feature/amazing-feature`）
3. 変更をコミット（`git commit -m 'Add some amazing feature'`）
4. ブランチにPush（`git push origin feature/amazing-feature`）
5. Pull Requestを作成

## ライセンス

MIT License

Copyright (c) 2024 [あなたの名前]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 作者

[ハンドボール人]
