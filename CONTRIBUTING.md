# Development & Contribution Guide / 開発・貢献ガイド

This document describes how to set up the development environment, build, debug, and package this VS Code extension.

[English](#english) | [日本語](#japanese)

---

## English {#english}

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [Visual Studio Code](https://code.visualstudio.com/)

### Setup Development Environment

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Building & Debugging

- **Run in Debug Mode:**
  1. Open this project root in VS Code.
  2. Press `F5` (or select `Run Extension` from the **Run and Debug** view).
  3. A new **Extension Development Host** window will launch where you can test the extension.

- **Compile TypeScript:**

  ```bash
  npm run compile
  ```

- **Watch Mode (Auto-compile on file save):**

  ```bash
  npm run watch
  ```

### Packaging (.vsix)

To build the executable package (`.vsix`) for distribution:

```bash
npx vsce package
```

*(On Windows, you can also run `build_package.bat`)*

---

## 日本語 {#japanese}

### 前提条件

- [Node.js](https://nodejs.org/)（v18.0.0以上推奨）
- [Visual Studio Code](https://code.visualstudio.com/)

### 開発環境のセットアップ

1. **リポジトリのクローン:**

   ```bash
   git clone <リポジトリのURL>
   cd <プロジェクトのフォルダ名>
   ```

2. **依存パッケージのインストール:**

   ```bash
   npm install
   ```

### ビルドとデバッグ

- **デバッグ実行:**
  1. VS Codeで本プロジェクトのルートフォルダーを開きます。
  2. `F5` キーを押す（または「実行とデバッグ」メニューから「Run Extension」を実行）。
  3. 新しく立ち上がった **Extension Development Host** ウィンドウ上で拡張機能の動作テストを行えます。

- **TypeScript のコンパイル:**

  ```bash
  npm run compile
  ```

- **ウォッチモード（ファイル保存時の自動コンパイル）:**

  ```bash
  npm run watch
  ```

### パッケージ化 (.vsix)

配布用パッケージ（`.vsix`）のビルド：

```bash
npx vsce package
```

*(Windows環境の場合は `build_package.bat` を実行することでも可能です)*
