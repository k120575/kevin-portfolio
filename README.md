# Kevin's Portfolio - DevOS Edition 🚀

這是一個基於 **React** 與 **Vite** 建構的個人作品集網站，採用獨特的 **DevOS (Developer Operating System)** 模擬桌面介面，以此展示我的技術實力與專案經歷。

![DevOS Preview](https://img.shields.io/badge/Status-Active-success)

## ✨ 特色功能 (Features)

本專案不僅僅是一個靜態網頁，更是一個互動式的 Web 應用程式：

- **🖥️ 模擬桌面環境 (Desktop Environment)**
  - 完整的視窗管理系統：支援視窗拖曳 (Drag)、縮放 (Resize)、層級管理 (Z-Index Focus)。
  - 自定義 Dock 工具列與頂部狀態列。
  
- **⌨️ 互動式終端機 (Terminal)**
  - 內建模擬 Terminal，支援基本指令操作 (如 `help`, `ls`, `whoami`)。
  - 展現後端開發者的 CLI 操作風格。

- **📂 專案展示 (Project Showcase)**
  - **Ticket Manager**: 整合 LINE Bot 與 Google Apps Script 的票券管理系統，支援 OCR 辨識與到期推播提醒。
  - **AI Investor**: 結合 Telegram Bot 與 Gemini AI 的投資輔助工具，提供即時市場數據分析與風險評估 (含模擬股價圖表)。
  - **BattleInterview**: AI 戰鬥面試官 Web App，雙階段模擬面試系統 (HR + 技術深度拷問)，具備反作弊偵測與自動評分報告。
  - **PostContentGenerator**: AI 行銷貼文產生器 Web App，輸入產品描述即自動生成 30 天社群貼文行事曆，支援 Threads/IG/X 多平台格式與數據追蹤。
  - **AI Work Record**: AI 智慧工作日誌 Telegram Bot，直接傳訊息記錄工作，AI 自動分類（開發/Debug/會議/Review/學習），一鍵生成結構化週報月報。

- **🎨 現代化 UI/UX**
  - **Tailwind CSS v4**: 採用最新的 Tailwind 引擎進行極速樣式渲染。
  - **Framer Motion**: 實現流暢的視窗開關、拖曳與介面微動畫。
  - **Glassmorphism**: 大量運用毛玻璃效果，呈現現代科技質感。

## 🛠️ 技術對棧 (Tech Stack)

- **核心框架**: [React 19](https://react.dev/)
- **建置工具**: [Vite](https://vitejs.dev/)
- **樣式系統**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **動畫庫**: [Framer Motion](https://www.framer.com/motion/)
- **圖示庫**: [Lucide React](https://lucide.dev/)

## 🚀 快速開始 (Getting Started)

請確保您的環境中已安裝 [Node.js](https://nodejs.org/) (建議 v18 以上版本)。

### 1. 安裝依賴 (Installation)

在專案根目錄下執行以下指令以安裝所需套件：

```bash
npm install
```

### 2. 啟動開發伺服器 (Development)

啟動本地開發環境，網頁將自動開啟於 HMR (Hot Module Replacement) 模式：

```bash
npm run dev
```

### 3. 建置生產版本 (Production Build)

當準備部署時，執行此指令來打包應用程式：

```bash
npm run build
```

打包後的檔案將位於 `dist/` 目錄中。

### 4. 預覽生產版本 (Preview)

在本地預覽打包後的結果：

```bash
npm run preview
```

## 📂 專案結構 (Project Structure)

```text
kevin-portfolio/
├── src/
│   ├── assets/       # 靜態資源
│   ├── App.jsx       # 主應用程式邏輯 (視窗管理、狀態核心)
│   ├── main.jsx      # 程式進入點
│   └── index.css     # 全域樣式與 Tailwind 設定
├── public/           # 公開靜態檔案
├── index.html        # HTML 進入點
└── package.json      # 專案設定與依賴
```

## 📝 開發者筆記

- **App.jsx**: 包含了絕大部分的邏輯，包括專案資料 (`projectsData`)、視窗管理函數 (`openWindow`, `closeWindow`) 以及 UI 組件渲染。
- **Tailwind v4**: 本專案使用 Tailwind v4，配置位於 CSS 檔案中，無需傳統的 `tailwind.config.js` (除非有特殊客製化需求)。

---

> Created by Kevin | Status: Ready to build the future.
